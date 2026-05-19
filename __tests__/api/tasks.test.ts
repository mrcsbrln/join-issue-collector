/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { POST } from "@/app/api/tasks/route";

const VALID_KEY = "test-secret-key";
const VALID_BODY = {
  title: "New feature request",
  description: "Users want dark mode",
  category: "User Story",
  priority: "medium",
  due_date: "2026-06-30",
  creator_email: "stakeholder@example.com",
};

function makeRequest(body: unknown, apiKey?: string) {
  return new NextRequest("http://localhost/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "x-api-key": apiKey } : {}),
    },
    body: JSON.stringify(body),
  });
}

const mockSingle = jest.fn();
const mockInsert = jest.fn();

jest.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    from: () => ({ insert: mockInsert }),
  }),
}));

beforeAll(() => {
  process.env.JOIN_API_KEY = VALID_KEY;
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key";
});

beforeEach(() => {
  mockSingle.mockReset();
  mockInsert.mockReset();
  mockSingle.mockResolvedValue({ data: { id: "new-uuid-123" }, error: null });
  mockInsert.mockReturnValue({ select: () => ({ single: mockSingle }) });
});

describe("POST /api/tasks — authentication", () => {
  it("returns 401 when API key is missing", async () => {
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.status).toBe(401);
  });

  it("returns 401 when API key is wrong", async () => {
    const res = await POST(makeRequest(VALID_BODY, "wrong-key"));
    expect(res.status).toBe(401);
  });

  it("returns 201 when API key is correct", async () => {
    const res = await POST(makeRequest(VALID_BODY, VALID_KEY));
    expect(res.status).toBe(201);
  });
});

describe("POST /api/tasks — validation", () => {
  it("returns 400 when title is missing", async () => {
    const { title: _, ...body } = VALID_BODY;
    const res = await POST(makeRequest(body, VALID_KEY));
    expect(res.status).toBe(400);
  });

  it("returns 400 when creator_email is missing", async () => {
    const { creator_email: _, ...body } = VALID_BODY;
    const res = await POST(makeRequest(body, VALID_KEY));
    expect(res.status).toBe(400);
  });

  it("returns 400 when category is missing", async () => {
    const { category: _, ...body } = VALID_BODY;
    const res = await POST(makeRequest(body, VALID_KEY));
    expect(res.status).toBe(400);
  });
});

describe("POST /api/tasks — response", () => {
  it("returns the created task id", async () => {
    const res = await POST(makeRequest(VALID_BODY, VALID_KEY));
    const json = await res.json();
    expect(json.id).toBe("new-uuid-123");
  });

  it("returns 500 when Supabase reports an error", async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: { message: "DB error" },
    });
    const res = await POST(makeRequest(VALID_BODY, VALID_KEY));
    expect(res.status).toBe(500);
  });
});

describe("POST /api/tasks — payload normalization", () => {
  it("normalizes 'technical task' category to 'Technical Task'", async () => {
    await POST(
      makeRequest({ ...VALID_BODY, category: "technical task" }, VALID_KEY),
    );
    expect(mockInsert.mock.calls[0][0]).toMatchObject({
      category: "Technical Task",
    });
  });

  it("falls back to 'medium' for an unknown priority", async () => {
    await POST(makeRequest({ ...VALID_BODY, priority: "unknown" }, VALID_KEY));
    expect(mockInsert.mock.calls[0][0]).toMatchObject({ priority: "medium" });
  });

  it("always sets status to 'triage' and creator_type to 'external'", async () => {
    await POST(makeRequest(VALID_BODY, VALID_KEY));
    expect(mockInsert.mock.calls[0][0]).toMatchObject({
      status: "triage",
      creator_type: "external",
    });
  });

  it("prepends the AI-generated prefix to the description", async () => {
    await POST(makeRequest(VALID_BODY, VALID_KEY));
    const { description } = mockInsert.mock.calls[0][0] as {
      description: string;
    };
    expect(description).toContain("KI-generiert");
    expect(description).toContain("Users want dark mode");
  });
});

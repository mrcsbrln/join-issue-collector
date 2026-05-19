import { COLUMN_ORDER, COLUMN_LABELS } from "@/lib/types";

describe("COLUMN_ORDER", () => {
  it("has exactly 5 columns", () => {
    expect(COLUMN_ORDER).toHaveLength(5);
  });

  it("starts with triage", () => {
    expect(COLUMN_ORDER[0]).toBe("triage");
  });

  it("ends with done", () => {
    expect(COLUMN_ORDER[COLUMN_ORDER.length - 1]).toBe("done");
  });

  it("contains all expected statuses", () => {
    expect(COLUMN_ORDER).toEqual([
      "triage",
      "todo",
      "in-progress",
      "awaiting-feedback",
      "done",
    ]);
  });
});

describe("COLUMN_LABELS", () => {
  it("has a label for every status in COLUMN_ORDER", () => {
    COLUMN_ORDER.forEach((status) => {
      expect(COLUMN_LABELS[status]).toBeTruthy();
    });
  });

  it("labels are non-empty strings", () => {
    Object.values(COLUMN_LABELS).forEach((label) => {
      expect(typeof label).toBe("string");
      expect(label.length).toBeGreaterThan(0);
    });
  });
});

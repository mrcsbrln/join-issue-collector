import {
  getInitials,
  randomAvatarColor,
  formatDate,
  isOverdue,
  clsx,
} from "@/lib/utils";

describe("getInitials", () => {
  it("returns two uppercase initials for a full name", () => {
    expect(getInitials("Marcus Hartmann")).toBe("MH");
  });

  it("returns first letter for a single name", () => {
    expect(getInitials("Marcus")).toBe("M");
  });

  it("uses first and last part for multi-word names", () => {
    expect(getInitials("Anna van Den Berg")).toBe("AB");
  });

  it("handles leading/trailing whitespace", () => {
    expect(getInitials("  John Doe  ")).toBe("JD");
  });
});

describe("randomAvatarColor", () => {
  it("returns a hex color string", () => {
    expect(randomAvatarColor("Marcus")).toMatch(/^#[0-9A-F]{6}$/i);
  });

  it("returns the same color for the same name", () => {
    expect(randomAvatarColor("Alice")).toBe(randomAvatarColor("Alice"));
  });

  it("is deterministic — 'Alice' always maps to the same color", () => {
    expect(randomAvatarColor("Alice")).toBe("#1FD7C1");
  });
});

describe("formatDate", () => {
  it("formats ISO date to dd/MM/yyyy", () => {
    expect(formatDate("2026-05-19")).toBe("19/05/2026");
  });

  it("formats a year-boundary date correctly", () => {
    expect(formatDate("2025-01-01")).toBe("01/01/2025");
  });
});

describe("isOverdue", () => {
  it("returns true for a past date", () => {
    expect(isOverdue("2000-01-01")).toBe(true);
  });

  it("returns false for a future date", () => {
    expect(isOverdue("2099-12-31")).toBe(false);
  });
});

describe("clsx", () => {
  it("joins non-falsy class strings", () => {
    expect(clsx("a", "b", "c")).toBe("a b c");
  });

  it("filters out falsy values", () => {
    expect(clsx("a", false, undefined, null, "b")).toBe("a b");
  });

  it("returns empty string when all values are falsy", () => {
    expect(clsx(false, null, undefined)).toBe("");
  });
});

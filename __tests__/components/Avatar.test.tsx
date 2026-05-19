import { render, screen } from "@testing-library/react";
import Avatar, { getInitials, getAvatarColor } from "@/components/ui/Avatar";

describe("getInitials", () => {
  it("returns two initials for a full name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("returns single letter for one-word name", () => {
    expect(getInitials("Marcus")).toBe("M");
  });

  it("returns G for an empty string", () => {
    expect(getInitials("")).toBe("G");
  });
});

describe("getAvatarColor", () => {
  it("returns a hex color", () => {
    expect(getAvatarColor("Alice")).toMatch(/^#[0-9A-F]{6}$/i);
  });

  it("is deterministic for the same name", () => {
    expect(getAvatarColor("Bob")).toBe(getAvatarColor("Bob"));
  });
});

describe("Avatar", () => {
  it("renders the correct initials", () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("uses filled background color when filled=true", () => {
    render(<Avatar name="Alice" color="#FF0000" filled />);
    const el = screen.getByTitle("Alice");
    expect(el).toHaveStyle({ backgroundColor: "#FF0000" });
  });

  it("uses border color when not filled", () => {
    render(<Avatar name="Alice" color="#FF0000" />);
    const el = screen.getByTitle("Alice");
    expect(el).toHaveStyle({ border: "2px solid #FF0000" });
  });

  it("shows the name as title attribute", () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByTitle("John Doe")).toBeInTheDocument();
  });
});

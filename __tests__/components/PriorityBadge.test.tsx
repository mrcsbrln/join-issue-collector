import { render, screen } from "@testing-library/react";
import PriorityBadge from "@/components/ui/PriorityBadge";

describe("PriorityBadge", () => {
  it("renders 'Urgent' for urgent priority", () => {
    render(<PriorityBadge priority="urgent" />);
    expect(screen.getByText(/urgent/i)).toBeInTheDocument();
  });

  it("renders 'Medium' for medium priority", () => {
    render(<PriorityBadge priority="medium" />);
    expect(screen.getByText(/medium/i)).toBeInTheDocument();
  });

  it("renders 'Low' for low priority", () => {
    render(<PriorityBadge priority="low" />);
    expect(screen.getByText(/low/i)).toBeInTheDocument();
  });

  it("applies the urgent color (#FF3D00) for urgent priority", () => {
    render(<PriorityBadge priority="urgent" />);
    const badge = screen.getByText(/urgent/i).closest("span");
    expect(badge).toHaveStyle({ color: "#FF3D00" });
  });

  it("applies the medium color (#FFA800) for medium priority", () => {
    render(<PriorityBadge priority="medium" />);
    const badge = screen.getByText(/medium/i).closest("span");
    expect(badge).toHaveStyle({ color: "#FFA800" });
  });

  it("applies the low color (#7AE229) for low priority", () => {
    render(<PriorityBadge priority="low" />);
    const badge = screen.getByText(/low/i).closest("span");
    expect(badge).toHaveStyle({ color: "#7AE229" });
  });
});

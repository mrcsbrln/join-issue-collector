import { render, screen } from "@testing-library/react";
import ProgressBar from "@/components/ui/ProgressBar";

describe("ProgressBar", () => {
  it("shows completed/total subtask count", () => {
    render(<ProgressBar completed={3} total={5} />);
    expect(screen.getByText("3/5 Subtasks")).toBeInTheDocument();
  });

  it("sets aria attributes on the progress bar", () => {
    render(<ProgressBar completed={2} total={4} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "2");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "4");
  });

  it("renders 0% width when total is 0", () => {
    render(<ProgressBar completed={0} total={0} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveStyle({ width: "0%" });
  });

  it("renders 100% width when all subtasks are done", () => {
    render(<ProgressBar completed={5} total={5} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveStyle({ width: "100%" });
  });

  it("rounds percentage correctly", () => {
    render(<ProgressBar completed={1} total={3} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveStyle({ width: "33%" });
  });
});

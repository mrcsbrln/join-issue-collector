import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "@/components/board/TaskCard";
import { mockTask, mockTaskNoExtras } from "../fixtures/task";

jest.mock("@hello-pangea/dnd", () => ({
  Draggable: ({
    children,
  }: {
    children: (provided: object, snapshot: object) => React.ReactNode;
  }) =>
    children(
      { innerRef: jest.fn(), draggableProps: {}, dragHandleProps: {} },
      { isDragging: false },
    ),
}));

const onSelect = jest.fn();
const onMove = jest.fn();

function renderCard(task = mockTask) {
  return render(
    <TaskCard task={task} index={0} onSelect={onSelect} onMove={onMove} />,
  );
}

beforeEach(() => {
  onSelect.mockClear();
  onMove.mockClear();
});

describe("TaskCard — rendering", () => {
  it("displays the task title", () => {
    renderCard();
    expect(screen.getByText("Fix login bug")).toBeInTheDocument();
  });

  it("displays the category badge", () => {
    renderCard();
    expect(screen.getByText("Technical Task")).toBeInTheDocument();
  });

  it("shows a truncated description", () => {
    renderCard();
    expect(
      screen.getByText("Users cannot log in with Google OAuth"),
    ).toBeInTheDocument();
  });

  it("hides description when task has none", () => {
    renderCard(mockTaskNoExtras);
    expect(
      screen.queryByText("Users cannot log in with Google OAuth"),
    ).not.toBeInTheDocument();
  });

  it("shows ProgressBar when task has subtasks", () => {
    renderCard();
    expect(screen.getByText("1/2 Subtasks")).toBeInTheDocument();
  });

  it("hides ProgressBar when task has no subtasks", () => {
    renderCard(mockTaskNoExtras);
    expect(screen.queryByText(/subtasks/i)).not.toBeInTheDocument();
  });
});

describe("TaskCard — move menu", () => {
  it("move button is present in the DOM", () => {
    renderCard();
    expect(screen.getByLabelText("Move task")).toBeInTheDocument();
  });

  it("move menu is hidden initially", () => {
    renderCard();
    expect(screen.queryByText("To do")).not.toBeInTheDocument();
  });

  it("opens the move menu when arrow is clicked", () => {
    renderCard();
    fireEvent.click(screen.getByLabelText("Move task"));
    expect(screen.getByText("To do")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("does not show the current status in the menu", () => {
    renderCard();
    fireEvent.click(screen.getByLabelText("Move task"));
    expect(screen.queryByText("Triage")).not.toBeInTheDocument();
  });

  it("calls onMove with correct args when a column is selected", () => {
    renderCard();
    fireEvent.click(screen.getByLabelText("Move task"));
    fireEvent.click(screen.getByText("To do"));
    expect(onMove).toHaveBeenCalledWith("test-id-1", "todo");
  });

  it("closes the menu after a move selection", () => {
    renderCard();
    fireEvent.click(screen.getByLabelText("Move task"));
    fireEvent.click(screen.getByText("To do"));
    expect(screen.queryByText("Done")).not.toBeInTheDocument();
  });
});

describe("TaskCard — interaction", () => {
  it("calls onSelect when the card is clicked", () => {
    renderCard();
    fireEvent.click(screen.getByText("Fix login bug"));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("does not call onSelect when move button is clicked", () => {
    renderCard();
    fireEvent.click(screen.getByLabelText("Move task"));
    expect(onSelect).not.toHaveBeenCalled();
  });
});

import { ITask } from "@/types/todo";
import TaskItem from "./TaskItem";
import { FrownIcon } from "lucide-react";

interface IProps {
  todos: ITask[];
  onToggle: (taskId: number) => void;
  onArchive: (taskId: number) => void;
  onEdit: (taskId: number) => void;
  isArchivingData: Record<number, boolean>;
  isTogglingData: Record<number, boolean>;
}
export default function TaskList({
  todos,
  onArchive,
  onEdit,
  onToggle,
  isArchivingData,
  isTogglingData,
}: IProps) {
  if (!todos || todos.length === 0) {
    return (
      <div className="mt-5">
        <FrownIcon className="w-12 h-12 mx-auto text-gray-500" />
        <div className="text-center text-gray-500">No tasks found!</div>
      </div>
    );
  }

  return todos?.map((todo) => {
    return (
      <TaskItem
        key={todo.id}
        taskTitle={todo.title}
        taskStatus={todo.status}
        onToggle={() => onToggle(todo.id)}
        onArchive={() => onArchive(todo.id)}
        onEdit={() => onEdit(todo.id)}
        isArchiving={isArchivingData[todo.id] || false}
        isToggling={isTogglingData[todo.id] || false}
      />
    );
  });
}

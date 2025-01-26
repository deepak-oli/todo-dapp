import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { ArchiveIcon, Edit2Icon, Loader2 } from "lucide-react";
import { TaskStatus } from "@/types/todo";

interface IProps {
  taskTitle: string;
  onToggle: () => void;
  onArchive: () => void;
  onEdit: () => void;
  taskStatus: TaskStatus;
  isArchiving?: boolean;
  isToggling?: boolean;
}

export default function TaskItem({
  taskTitle,
  taskStatus,
  onToggle,
  onArchive,
  onEdit,
  isArchiving = false,
  isToggling = false,
}: IProps) {
  const isArchived = taskStatus === 2;
  const isCompleted = taskStatus === 1;
  return (
    <div
      className={`border-b text-sm flex justify-between min-h-[36px] w-full px-2 rounded-sm my-1 ${
        isArchived ? "opacity-50 line-through" : ""
      }`}
    >
      <div className="flex items-center gap-3 w-full">
        {isToggling ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Checkbox
            checked={taskStatus === 1}
            disabled={isArchived}
            onClick={onToggle}
          />
        )}
        <label htmlFor="status">{taskTitle}</label>
      </div>
      <div className="flex gap-2">
        {!(isArchived || isCompleted) && (
          <Button
            title="Edit"
            variant="link"
            className="p-0 opacity-50 hover:opacity-100 hover:text-blue-500"
            onClick={onEdit}
            disabled={isArchived || isCompleted}
          >
            <Edit2Icon />
          </Button>
        )}
        {!isArchived && (
          <Button
            title="Archive"
            variant="link"
            className="p-0 opacity-50 hover:opacity-100 hover:text-red-500"
            onClick={onArchive}
            disabled={isArchived}
          >
            {isArchiving ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ArchiveIcon />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export const TASK_FORM_MODES = {
  ADD: "ADD",
  EDIT: "EDIT",
} as const;

type TaskFormMode = (typeof TASK_FORM_MODES)[keyof typeof TASK_FORM_MODES];

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: TaskFormMode;
  taskTitle: string;
  onChangeTaskTitle: (taskTitle: string) => void;
  onSaveClick: () => void;
  disableClose?: boolean;
  isLoading?: boolean;
}

export default function TaskFormDialog({
  open,
  onOpenChange,
  mode,
  taskTitle,
  onChangeTaskTitle,
  onSaveClick,
  isLoading,
}: IProps) {
  const modalTitle = mode === TASK_FORM_MODES.ADD ? "New Task" : "Edit Task";
  const saveButtonLabel = mode === TASK_FORM_MODES.ADD ? "Save" : "Update";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`sm:max-w-[425px] ${isLoading ? "[&>button]:hidden" : ""}`}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            autoComplete="off"
            value={taskTitle}
            className="col-span-3"
            placeholder="Enter task title..."
            onChange={(e) => onChangeTaskTitle(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="button" onClick={onSaveClick} disabled={isLoading}>
            {saveButtonLabel}
            {isLoading && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

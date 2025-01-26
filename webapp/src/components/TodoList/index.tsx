import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import TaskFormDialog, { TASK_FORM_MODES } from "../TaskFormDialog";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import TodoFilter from "./TodoFilter";
import TaskList from "./TaskList";
import useTodoContract from "@/hooks/useTodoContract";
import { TaskStatus } from "@/types/todo";

export default function TodoList() {
  const { tasks, createTask, updateTask, toggleTask, archiveTask } =
    useTodoContract();
  const { toast, dismiss } = useToast();

  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedTaskForEdit, setSelectedTaskForEdit] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState<{
    status: TaskStatus | null;
    search: string;
  }>({ status: null, search: "" });

  const [isArchiving, setIsArchiving] = useState<Record<number, boolean>>({});
  const [isToggling, setIsToggling] = useState<Record<number, boolean>>({});

  const showErrorMessage = (message: string) => {
    dismiss();
    toast({
      className: cn(
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white"
      ),
      description: message,
    });
  };

  const showError = (title: string, error: unknown) => {
    showErrorMessage(
      `${title}: ${error instanceof Error ? error.message : String(error)}`
    );
  };

  const showSuccessMessage = (message: string) => {
    toast({
      className: cn(
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-500 text-white"
      ),
      description: message,
    });
  };

  const resetForm = () => {
    setTaskTitle("");
    setOpen(false);
    setSelectedTaskForEdit(null);
  };

  const openAddTaskForm = () => {
    resetForm();
    setOpen(true);
  };

  const handleSaveClick = async () => {
    if (!taskTitle) {
      showErrorMessage("Please enter a task title");
      return;
    }
    setIsLoading(true);
    try {
      if (selectedTaskForEdit) {
        await updateTask(selectedTaskForEdit, taskTitle);
        showSuccessMessage("Task updated successfully");
      } else {
        await createTask(taskTitle);
        showSuccessMessage("Task saved successfully");
      }
      resetForm();
    } catch (error) {
      showError("Failed to save task", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (taskId: number) => {
    setSelectedTaskForEdit(taskId);
    const task = tasks.find((task) => task.id === taskId);
    setTaskTitle(task?.title || "");
    setOpen(true);
  };

  const handleToggleClick = async (taskId: number) => {
    setIsToggling((prev) => ({ ...prev, [taskId]: true }));
    try {
      await toggleTask(taskId);
      showSuccessMessage("Task status updated");
    } catch (error) {
      showError("Failed to update task status", error);
    } finally {
      setIsToggling((prev) => ({ ...prev, [taskId]: false }));
    }
  };

  const handleArchiveClick = async (taskId: number) => {
    setIsArchiving((prev) => ({ ...prev, [taskId]: true }));
    try {
      await archiveTask(taskId);
      showSuccessMessage("Task archived successfully");
    } catch (error) {
      showError("Failed to archive task", error);
    } finally {
      setIsArchiving((prev) => ({ ...prev, [taskId]: false }));
    }
  };
  const tasksFiltered = useMemo(() => {
    return tasks.filter((task) => {
      if (filters.status !== null && task.status !== filters.status) {
        return false;
      }

      if (
        filters.search &&
        !task.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [tasks, filters]);

  return (
    <>
      <TaskFormDialog
        open={open}
        onOpenChange={setOpen}
        onSaveClick={handleSaveClick}
        taskTitle={taskTitle}
        onChangeTaskTitle={setTaskTitle}
        mode={selectedTaskForEdit ? TASK_FORM_MODES.EDIT : TASK_FORM_MODES.ADD}
        isLoading={isLoading}
      />
      <Button
        className="fixed bottom-20 right-20 rounded-full h-16 w-16 shadow-lg"
        title="Add Task"
        size="icon"
        onClick={openAddTaskForm}
      >
        <PlusIcon />
      </Button>
      <div className="w-full flex justify-center items-center flex-col gap-5">
        <h1 className="font-bold text-xl">TODO LIST</h1>
        <div className="flex gap-2">
          <TodoFilter filters={filters} setFilters={setFilters} />
        </div>

        <div className="max-w-lg w-full ">
          <TaskList
            todos={tasksFiltered}
            onToggle={handleToggleClick}
            onArchive={handleArchiveClick}
            onEdit={handleEditClick}
            isArchivingData={isArchiving}
            isTogglingData={isToggling}
          />
        </div>
      </div>
    </>
  );
}

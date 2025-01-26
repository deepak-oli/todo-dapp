import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import TaskFormDialog, { TASK_FORM_MODES } from "../TaskFormDialog";
import { useState } from "react";
import { cn } from "@/lib/utils";
import TodoFilter from "./TodoFilter";
import TaskList from "./TaskList";
import useTodoContract from "@/hooks/useTodoContract";
import { TaskStatus } from "@/types/todo";

export default function TodoList() {
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedTaskForEdit, setSelectedTaskForEdit] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isArchiving, setIsArchiving] = useState<Record<number, boolean>>({});
  const [isToggling, setIsToggling] = useState<Record<number, boolean>>({});
  const [filters, setFilters] = useState<{
    status: TaskStatus | null;
    search: string;
  }>({ status: null, search: "" });

  const { toast, dismiss } = useToast();
  const { tasks, createTask, updateTask, toggleTask, archiveTask } =
    useTodoContract();

  const handleSaveClick = async () => {
    dismiss();
    if (!taskTitle) {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white"
        ),
        description: "Please enter a task title",
      });
      return;
    }
    setIsLoading(true);
    try {
      if (selectedTaskForEdit) {
        console.log("Update Clicked", taskTitle);
        await updateTask(selectedTaskForEdit, taskTitle);
      } else {
        console.log("Save Clicked", taskTitle);
        await createTask(taskTitle);
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white"
          ),
          description: "Task saved successfully",
        });
      }
      setTaskTitle("");
      setOpen(false);
    } catch (error) {
      console.error("Failed to save task", error);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white"
        ),
        description: "Failed to save task",
      });
    } finally {
      setIsLoading(false);
    }

    setTaskTitle("");
    setOpen(false);
  };

  const handleEditClick = (taskId: number) => {
    setSelectedTaskForEdit(taskId);
    // get task and set task title
    const task = tasks.find((task) => task.id === taskId);
    console.log("Task", task);

    setTaskTitle(task?.title || "");
    setOpen(true);
  };

  const handleToggleClick = async (taskId: number) => {
    setIsToggling((prev) => ({ ...prev, [taskId]: true }));
    try {
      await toggleTask(taskId);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white"
        ),
        description: "Task status updated",
      });
    } catch (error) {
      console.error("Failed to update task status", error);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white"
        ),
        description: "Failed to update task status",
      });
    } finally {
      setIsToggling((prev) => ({ ...prev, [taskId]: false }));
    }
  };

  const handleArchiveClick = async (taskId: number) => {
    try {
      setIsArchiving((prev) => ({ ...prev, [taskId]: true }));
      await archiveTask(taskId);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white"
        ),
        description: "Task archived successfully",
      });
    } catch (error) {
      console.error("Failed to archive task", error);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white"
        ),
        description: "Failed to archive task",
      });
    } finally {
      setIsArchiving((prev) => ({ ...prev, [taskId]: false }));
    }
  };

  const tasksFiltered = tasks.filter((task) => {
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
        onClick={() => {
          setTaskTitle("");
          setSelectedTaskForEdit(null);
          setOpen(true);
        }}
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

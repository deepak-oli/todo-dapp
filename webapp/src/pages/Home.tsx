import { useEffect, useState } from "react";
import { Account } from "../components/Account";
import useTodoContract from "../hooks/useTodoContract";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArchiveIcon, CheckIcon, Edit2Icon, Undo2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TAKS_STATUS = {
  0: "Pending",
  1: "Completed",
  2: "Archived",
};

export default function Home() {
  const { tasks, createTask, getTasks, archiveTask, toggleTask, updateTask } =
    useTodoContract();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEdit = editId !== null;
    setIsLoading(true);
    try {
      if (isEdit) {
        console.log("Update", editId, title);
        await updateTask(editId as number, title);
        setEditId(null);
      } else {
        console.log("Create", title);
        await createTask(title);
      }

      setTitle("");
      setEditId(null);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTaskStatus = async (id: number) => {
    console.log("Toggle", id);
    await toggleTask(id);
  };

  const archiveTaskStatus = async (id: number) => {
    console.log("Delete", id);
    await archiveTask(id);
  };

  useEffect(() => {
    if (editId) {
      const task = tasks.find((task) => task.id === editId);
      if (task) {
        setTitle(task.title);
      }
    } else {
      setTitle("");
    }
  }, [editId]);

  return (
    <div className="max-w-[800px] m-auto min-h-[95vh] flex flex-col gap-5">
      <Account />

      <div className="flex flex-row-reverse justify-between h-full flex-1 gap-5">
        <form onSubmit={onSubmit}>
          <div className="flex items-end gap-2">
            <div className="max-w-sm">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <Button type="submit">
              {editId ? "Update" : "Create"}
              {isLoading && <span className="ml-2">Loading...</span>}
            </Button>
          </div>
        </form>
        <div className="w-full min-h-full">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
              </CardHeader>
              <CardFooter className="flex justify-end gap-2">
                {task.status !== 2 && (
                  <>
                    <Button onClick={() => setEditId(task.id)}>
                      <Edit2Icon />
                    </Button>
                    <Button
                      onClick={() => toggleTaskStatus(task.id)}
                      variant="outline"
                    >
                      {task.status === 1 ? <Undo2Icon /> : <CheckIcon />}
                    </Button>
                    <Button
                      onClick={() => archiveTaskStatus(task.id)}
                      variant="destructive"
                    >
                      <ArchiveIcon />
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

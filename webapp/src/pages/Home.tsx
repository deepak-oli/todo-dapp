import { useEffect, useState } from "react";
import { Account } from "../components/Account";
import useTodoContract from "../hooks/useTodoContract";

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

  const refresh = async () => {
    const tasks = await getTasks();
    // setTasks(tasks as any);
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

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <Account />

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 m-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="p-2 m-2 bg-blue-500 text-white rounded"
        >
          {editId ? "Update" : "Create"}
          {isLoading && <span className="ml-2">Loading...</span>}
        </button>
      </form>

      <button
        className="p-2 m-2 bg-blue-500 text-white rounded"
        onClick={refresh}
      >
        Refresh
      </button>

      {tasks.map((task) => (
        <div key={task.id} className="p-2 m-2 border border-gray-300 rounded">
          <div>{task.title}</div>
          <button
            onClick={() => setEditId(task.id)}
            className="p-2 m-2 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
          <span>
            {TAKS_STATUS[task.status as keyof typeof TAKS_STATUS] || "Unknown"}
          </span>
          <button
            onClick={() => toggleTaskStatus(task.id)}
            className="p-2 m-2 bg-blue-500 text-white rounded"
          >
            Toggle
          </button>
          <button
            onClick={() => archiveTaskStatus(task.id)}
            className="p-2 m-2 bg-red-500 text-white rounded"
          >
            Archive
          </button>
        </div>
      ))}
    </>
  );
}

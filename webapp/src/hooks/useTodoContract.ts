import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Address } from "viem";

import {
  readContractInfo,
  writeAndWaitForReceipt,
  createEventWatcher,
} from "@/lib/contract";
import { ITask } from "@/types/todo";

export default function useTodoContract() {
  const { address } = useAccount();

  const [tasks, setTasks] = useState<ITask[]>([]);

  const fetchTasks = async () => {
    try {
      const tasks = await getTasks();
      setTasks(tasks as ITask[]);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const afterLog = () => {
      fetchTasks();
    };
    const unwatchCreated = createEventWatcher("TaskCreated", afterLog);
    const unwatchUpdated = createEventWatcher("TaskUpdated", afterLog);
    const unwatchArchived = createEventWatcher("TaskArchived", afterLog);

    return () => {
      unwatchCreated();
      unwatchUpdated();
      unwatchArchived();
    };
  }, []);

  const createTask = (title: string) => {
    return writeAndWaitForReceipt(address as Address, "createTask", [title]);
  };

  const getTasks = () => {
    return readContractInfo(address as Address, "getTasks", []);
  };

  const updateTask = (id: number, title: string) => {
    return writeAndWaitForReceipt(address as Address, "updateTaskTitle", [
      id,
      title,
    ]);
  };

  const toggleTask = (id: number) => {
    return writeAndWaitForReceipt(address as Address, "toggleTaskDone", [id]);
  };

  const archiveTask = (id: number) => {
    return writeAndWaitForReceipt(address as Address, "archiveTask", [id]);
  };

  return {
    tasks,
    createTask,
    getTasks,
    updateTask,
    toggleTask,
    archiveTask,
  };
}

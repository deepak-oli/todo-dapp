import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Address } from "viem";
import {
  readContractInfo,
  writeAndWaitForReceipt,
  createEventWatcher,
} from "../services/todo.service";
import { ITask } from "../types/index.types";

export default function useTodoContract() {
  const { address } = useAccount();

  const [tasks, setTasks] = useState<ITask[]>([]);

  const fetchTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks as ITask[]);
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

  const createTask = async (title: string) => {
    return writeAndWaitForReceipt(address as Address, "createTask", [title]);
  };

  const getTasks = async () => {
    return readContractInfo(address as Address, "getTasks", []);
  };

  const updateTask = async (id: number, title: string) => {
    return writeAndWaitForReceipt(address as Address, "updateTaskTitle", [
      id,
      title,
    ]);
  };

  const toggleTask = async (id: number) => {
    return writeAndWaitForReceipt(address as Address, "toggleTaskDone", [id]);
  };

  const archiveTask = async (id: number) => {
    return writeAndWaitForReceipt(address as Address, "archiveTask", [id]);
  };

  return {
    createTask,
    getTasks,
    updateTask,
    toggleTask,
    archiveTask,
    tasks,
  };
}

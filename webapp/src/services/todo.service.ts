import {
  readContract,
  waitForTransactionReceipt,
  watchContractEvent,
  writeContract,
} from "@wagmi/core";
import { wagmiConfig } from "../config/wagmi.config";
import todosABI from "../abi/todo.json";
import { CONTRACT_ADDRESS } from "../constants";
import { Address } from "viem";

export const writeAndWaitForReceipt = async (
  address: Address,
  functionName: string,
  args: any[]
) => {
  const result = await writeContract(wagmiConfig, {
    abi: todosABI,
    address: CONTRACT_ADDRESS as Address,
    functionName,
    account: address,
    args,
  });
  console.info(`${functionName} started:`, result);
  const receipt = await waitForTransactionReceipt(wagmiConfig, {
    hash: result,
  });
  console.info(`${functionName} done:`, receipt);
  return result;
};

export const readContractInfo = async (
  address: Address,
  functionName: string,
  args: any[]
) => {
  const info = await readContract(wagmiConfig, {
    abi: todosABI,
    address: CONTRACT_ADDRESS as Address,
    account: address,
    functionName,
    args,
  });
  console.info(`${functionName}:`, info);
  return info;
};

export const createEventWatcher = (
  eventName: string,
  onLog: (logs: any[]) => void
) => {
  const watcher = watchContractEvent(wagmiConfig, {
    abi: todosABI,
    address: CONTRACT_ADDRESS as Address,
    eventName,
    onLogs(logs: any[]) {
      console.info(`${eventName} event:`, logs);
      onLog(logs);
    },
  });
  return watcher;
};

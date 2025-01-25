import {
  readContract,
  waitForTransactionReceipt,
  watchContractEvent,
  writeContract,
} from "@wagmi/core";
import { Address } from "viem";

import { wagmiConfig } from "@/config/wagmi";
import todosABI from "@/assets/abi/todo.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

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
  const stopWatcher = watchContractEvent(wagmiConfig, {
    abi: todosABI,
    address: CONTRACT_ADDRESS as Address,
    eventName,
    onLogs(logs) {
      console.info(`${eventName} event:`, logs);
      onLog(logs);
    },
  });
  return stopWatcher;
};

import { useAccount, useDisconnect } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <div>
      <div>Connected with {address}</div>
      <button
        onClick={() => disconnect()}
        className="p-2 m-2 bg-red-500 text-white rounded"
      >
        Disconnect
      </button>
    </div>
  );
}

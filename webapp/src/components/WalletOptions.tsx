import { useConnect } from "wagmi";

export default function WalletOptions() {
  const { connectors, connect, isPending } = useConnect();

  return (
    <>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => {
            connect({ connector });
          }}
          className="p-2 m-2 bg-blue-500 text-white rounded"
        >
          Connect with {connector.name}
          {isPending ? " (connecting)" : ""}
        </button>
      ))}
    </>
  );
}

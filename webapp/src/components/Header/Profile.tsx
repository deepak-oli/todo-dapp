import { useAccount, useDisconnect } from "wagmi";
import { LogOutIcon, UserCheck2 } from "lucide-react";

export default function Profile() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
  };
  return (
    <span>
      {isConnected && (
        <div className="flex items-center space-x-4">
          <div title={address} className="flex">
            <UserCheck2 />
            <span title={address}>{`${address?.slice(0, 4)}...${address?.slice(
              -4
            )}`}</span>
          </div>
          <button onClick={handleDisconnect} title="Log out">
            <LogOutIcon className="text-red-500" />
          </button>
        </div>
      )}
    </span>
  );
}

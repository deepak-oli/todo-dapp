import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <div>
      <span>Connected with {address}</span>
      <Button
        onClick={() => disconnect()}
        variant="destructive"
        className="ml-2 text-xs h-5 p-2"
      >
        Disconnect
      </Button>
    </div>
  );
}

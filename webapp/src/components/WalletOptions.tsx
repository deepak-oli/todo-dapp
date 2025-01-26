import { useConnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function WalletOptions() {
  const { connectors, connect, isPending } = useConnect();

  return (
    <div>
      {connectors.map((connector) => {
        return (
          <Button
            key={connector.id}
            onClick={() => {
              connect({ connector });
            }}
            variant="outline"
            className="w-full flex items-center justify-between my-1"
          >
            <span>{connector.name}</span>
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        );
      })}
    </div>
  );
}

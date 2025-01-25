import { useConnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function WalletOptions() {
  const { connectors, connect, isPending } = useConnect();

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        {connectors.map((connector) => (
          <Button
            key={connector.id}
            onClick={() => {
              connect({ connector });
            }}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <img
                src="https://metamask.io/assets/icon.svg"
                alt=""
                className="h-5"
              />
            )}
            Connect with {connector.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

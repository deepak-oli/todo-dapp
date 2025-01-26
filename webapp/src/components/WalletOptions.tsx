import { useConnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const IMAGES = {
  MetaMask: "https://metamask.io/assets/icon.svg",
} as const;

export default function WalletOptions() {
  const { connectors, connect, isPending } = useConnect();

  return (
    <div>
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => {
            connect({ connector });
          }}
          variant="outline"
          className="w-full flex items-center justify-between"
        >
          <span>{connector.name}</span>
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <img
              src={IMAGES[connector.name as keyof typeof IMAGES]}
              alt=""
              className="h-5"
              loading="lazy"
            />
          )}
        </Button>
      ))}
    </div>
  );
}

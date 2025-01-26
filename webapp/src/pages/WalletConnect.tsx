import AnimatedLogoSvg from "@/components/AnimatedLogoSvg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WalletOptions from "@/components/WalletOptions";
import { Navigate } from "react-router";
import { useAccount } from "wagmi";

export default function WalletConnect() {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="container mx-auto flex flex-col h-screen items-center justify-center">
      <AnimatedLogoSvg />
      <Card className="min-w-[320px] max-w-[500px]">
        <CardHeader>
          <CardTitle>Connect Wallet to access Todo.</CardTitle>
          <CardDescription>
            Select your wallet from the options below to connect to the app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WalletOptions />
        </CardContent>
        <CardFooter>
          <p className="text-xs text-gray-500">
            Your passkeys are to be kept private to you and not share with
            anyone. We will never ask for your passkeys.
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}

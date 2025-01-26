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
      <svg
        className="h-20 animate-bounce"
        width="238"
        height="238"
        viewBox="0 0 238 238"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M119 238C184.722 238 238 184.722 238 119C238 53.2781 184.722 0 119 0C53.2781 0 0 53.2781 0 119C0 184.722 53.2781 238 119 238Z"
          fill="#0A0A0A"
        />
        <path
          d="M89.7 165.7C87.8 171.9 85.3 175.4 77 175.4C70 175.4 66.8 172.7 66.8 168.4C66.8 167 67.1 165.4 67.6 164L95.9 64.6C97.8 58.4 100.3 54.9 108.4 54.9C115.6 54.9 118.7 57.6 118.7 61.9C118.7 63.5 118.2 64.9 117.8 66.6L89.7 165.7Z"
          fill="white"
        />
        <path
          d="M144.1 165.7C142.2 171.9 139.7 175.4 131.4 175.4C124.4 175.4 121.2 172.7 121.2 168.4C121.2 167 121.5 165.4 122 164L150.3 64.6C152.2 58.4 154.7 54.9 162.8 54.9C170 54.9 173.1 57.6 173.1 61.9C173.1 63.5 172.6 64.9 172.2 66.6L144.1 165.7Z"
          fill="white"
        />
      </svg>

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

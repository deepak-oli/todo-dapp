import { useAccount } from "wagmi";
import { Navigate } from "react-router";

interface IProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: IProps) {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <Navigate to="/wallet-connect" />;
  }

  return <>{children}</>;
}

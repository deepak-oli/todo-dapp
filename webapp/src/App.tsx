import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";

import { Toaster } from "@/components/ui/toaster";

import { wagmiConfig } from "@/config/wagmi";
import Routing from "@/routes";

import "./App.css";
import { Suspense } from "react";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<></>}>
            <Routing />
          </Suspense>
          <Toaster />
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
}

export default App;

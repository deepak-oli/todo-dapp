import { http, createConfig } from "wagmi";
import { anvil } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

const LOCAL_RPC_URL = import.meta.env.VITE_RPC_URL;

export const wagmiConfig = createConfig({
  chains: [anvil],
  connectors: [metaMask()],
  transports: {
    [anvil.id]: http(LOCAL_RPC_URL),
  },
});

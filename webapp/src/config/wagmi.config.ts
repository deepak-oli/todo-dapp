import { http, createConfig } from "wagmi";
import { anvil } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [anvil],
  connectors: [metaMask()],
  transports: {
    [anvil.id]: http("http://127.0.0.1:8545"),
  },
});

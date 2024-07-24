import { berachainTestnet, Chain, localhost } from "viem/chains";
import { http, createConfig } from "wagmi";
import { injected, metaMask } from "wagmi/connectors";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

// export const config = createConfig({
//     chains: [localhost, berachainTestnet],
//     connectors: [injected(), metaMask()],
//     transports: {
//         [localhost.id]: http(),
//         [berachainTestnet.id]: http(),
//     },
// });
const bartioTestnet = {
    id: 80_084,
    name: "Berachain bArtio",
    nativeCurrency: { name: "BERA", symbol: "BERA", decimals: 18 },
    rpcUrls: {
        default: { http: ["https://bartio.rpc.berachain.com/"] },
    },
    blockExplorers: {
        default: { name: "bartio", url: "https://bartio.beratrail.io" },
    },
    // contracts: {
    //     multicall3: {
    //         address: "0xca11bde05977b3631167028862be2a173976ca11",
    //         blockCreated: 11_907_934,
    //     },
    //},
} as const satisfies Chain;

export const config = getDefaultConfig({
    appName: "Beranames-dev",
    projectId: "0cf57f51c0db566d439853c6c0739698",
    chains: [localhost, bartioTestnet],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

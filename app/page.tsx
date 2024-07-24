"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
    useAccount,
    useReadContract,
    useWriteContract,
    WagmiProvider,
} from "wagmi";
import { config } from "../config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { log } from "console";
const abi = [
    {
        type: "function",
        name: "get",
        inputs: [],
        outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "increment",
        inputs: [],
        outputs: [],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "number",
        inputs: [],
        outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "setNumber",
        inputs: [
            {
                name: "newNumber",
                type: "uint32",
                internalType: "uint32",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
];
const ContractNumber = () => {
    const { isConnected } = useAccount();
    const result = useReadContract({
        abi,
        address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        functionName: "get",
    });
    console.log("=======>", result);
    return (
        <>
            <div>{result.data as any}</div>
            <div>{isConnected && "YES"}</div>
        </>
    );
};

const WriteNumber = () => {
    const { data: hash, writeContract, isPending, error } = useWriteContract();
    if (error) {
        console.log("ERROR", error);
    }
    return (
        <>
            <button
                onClick={() => {
                    debugger;
                    const temp = writeContract({
                        address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
                        abi,
                        functionName: "setNumber",
                        args: [5],
                    });
                    console.log("TEMP", temp);
                }}
            >
                Click me
            </button>
            <p>{hash}</p>
            <p>{isPending}</p>
            <p>{error?.message}</p>
        </>
    );
};

export default function Home() {
    const queryClient = new QueryClient();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <main className="m-auto">
                        <div className="p-4">
                            <input type="text" />
                        </div>
                        <div className="p-4">
                            <ConnectButton />
                        </div>
                        <div className="p-4">
                            <button>Read Number</button>
                            <>
                                <ContractNumber />
                            </>
                        </div>
                        <div className="p-4">
                            <button>Increment</button>
                            <>
                                <WriteNumber />
                            </>
                        </div>
                    </main>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

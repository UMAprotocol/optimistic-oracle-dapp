import { useState, useEffect } from "react";
import useClient from "hooks/useOracleClient";
import useReader from "hooks/useOracleReader";
import { ethers } from "ethers";

const ogAbi = [
  {
    inputs: [],
    name: "rules",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export function useOptimisticGovernorRules() {
  const { state } = useClient();
  const { provider, requester } = useReader(state);
  const [rules, setRules] = useState<undefined | string>();

  useEffect(() => {
    if (requester === undefined) return;
    if (provider === undefined) return;

    async function getRules() {
      try {
        const contract = new ethers.Contract(requester!, ogAbi, provider);
        const contractRules = await contract?.rules();
        setRules(contractRules);
      } catch (error) {
        setRules(undefined);
        console.error(`Get rules failed: ${error}`);
      }
    }
    getRules();
  }, [requester, provider]);

  return { rules };
}

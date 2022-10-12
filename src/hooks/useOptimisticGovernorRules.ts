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

    const contract = new ethers.Contract(requester, ogAbi, provider);
    contract
      .rules()
      .then((rules: string) => {
        setRules(rules);
      })
      .catch((error: any) => {
        setRules(undefined);
        console.error(error);
      });
  }, [requester, provider]);

  return rules;
}

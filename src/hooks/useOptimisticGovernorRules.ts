import { useState, useEffect } from "react";
import useClient from "hooks/useOracleClient";
import useReader from "hooks/useOracleReader";
import { ethers } from "ethers";
import { toUtf8String } from "ethers/lib/utils";

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
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "enum Enum.Operation",
            name: "operation",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct OptimisticGovernor.Transaction[]",
        name: "_transactions",
        type: "tuple[]",
      },
      {
        internalType: "bytes",
        name: "_explanation",
        type: "bytes",
      },
    ],
    name: "proposeTransactions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export function useOptimisticGovernorRules() {
  const { state } = useClient();
  const { provider, requester, proposeTx } = useReader(state);
  const [rules, setRules] = useState<undefined | string>();
  const [explanation, setExplanation] = useState<undefined | string>();

  useEffect(() => {
    if (requester === undefined || provider === undefined) {
      setRules(undefined);
      return;
    }

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

  useEffect(() => {
    async function getExplanation() {
      if (
        rules === undefined ||
        provider === undefined ||
        proposeTx === undefined
      ) {
        setExplanation(undefined);
        return;
      }

      try {
        const proposeData = await provider.getTransaction(proposeTx);
        if (proposeData?.data !== undefined) {
          const iface = new ethers.utils.Interface(ogAbi);
          const decodedTransaction = iface.decodeFunctionData(
            "proposeTransactions",
            proposeData.data
          );
          setExplanation(toUtf8String(decodedTransaction[1]));
        }
      } catch (error) {
        setExplanation(undefined);
        console.error(`Get explanation failed: ${error}`);
      }
    }
    getExplanation();
  }, [proposeTx, provider, rules]);

  return { rules, explanation };
}

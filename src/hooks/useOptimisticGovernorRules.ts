import { useState, useEffect } from "react";
import useClient from "hooks/useOracleClient";
import useReader from "hooks/useOracleReader";
import { ethers } from "ethers";
import { toUtf8String } from "ethers/lib/utils";

const ogAbi = [
  "function rules() view returns (string)",
  "function proposeTransactions(tuple(address to, uint8 operation, uint256 value, bytes data)[] _transactions, bytes _explanation)",
];

export function useOptimisticGovernorRules() {
  const { state } = useClient();
  const { provider, requester, proposeTx } = useReader(state);
  const [rules, setRules] = useState<undefined | string>();
  const [explanation, setExplanation] = useState<undefined | string>();

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

  useEffect(() => {
    async function getExplanation() {
      if (rules === undefined) return;
      if (provider === undefined) return;
      if (proposeTx === undefined) return;
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

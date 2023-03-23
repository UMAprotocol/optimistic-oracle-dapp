import { useState, useEffect } from "react";
import useClient from "hooks/useOracleClient";
import useReader from "hooks/useOracleReader";
import { ethers, providers } from "ethers";
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
    if (requester === undefined || provider === undefined) {
      setRules(undefined);
      return;
    }

    async function getRules() {
      try {
        // this makes sure we dont get compile issues since there are problems between ethers sdk and local ethers
        const contract = new ethers.Contract(requester!, ogAbi, provider as providers.Provider);
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

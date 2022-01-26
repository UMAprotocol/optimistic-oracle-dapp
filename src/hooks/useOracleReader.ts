import { oracle } from "../helpers/oracleClient";
import { ethers } from "ethers";
import usdcLogo from "assets/usdc-logo.png";
import umaLogo from "assets/uma-logo.png";
import { CHAINS, ChainId } from "constants/blockchain";
const { formatUnits } = ethers.utils;

function ignoreError<X extends () => any>(call: X): ReturnType<X> | undefined {
  try {
    return call();
  } catch (err) {
    return undefined;
  }
}

// this is less of a hook and more of just a static function. Thats ok, its cheap to do this on each render.
export default function useOracleReader(state: oracle.types.state.State) {
  const read = new oracle.store.Read(state);
  const request = ignoreError(read.request);
  const defaultLiveness = ignoreError(read.defaultLiveness);
  const collateralProps = ignoreError(read.collateralProps);
  const decimals = collateralProps && collateralProps.decimals;
  const totalBond =
    request &&
    decimals &&
    formatUnits(request.bond.add(request.finalFee), collateralProps.decimals);
  const reward =
    request &&
    decimals &&
    formatUnits(request.reward, collateralProps.decimals);
  const liveness =
    request && request.customLiveness.gt(0)
      ? request.customLiveness.toNumber()
      : defaultLiveness && defaultLiveness.toNumber();
  const expirationTime = request && request.expirationTime.toNumber();
  const requestState = request && request.state;
  const proposedPrice = request && request.proposedPrice;
  const disputer = request && request.disputer;
  const proposer = request && request.proposer;
  const chainId: ChainId = state.inputs?.request?.chainId || 1;
  const explorerUrl = CHAINS[chainId].explorerUrl;

  return {
    totalBond,
    reward,
    liveness,
    collateralSymbol: collateralProps && collateralProps.symbol,
    logo: collateralProps?.symbol === "UMA" ? umaLogo : usdcLogo,
    expirationTime,
    requestState,
    proposedPrice,
    disputer,
    proposer,
    explorerUrl,
  };
}

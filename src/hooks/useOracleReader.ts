import { ethers } from "ethers";
import usdcLogo from "assets/usdc-logo.png";
import umaLogo from "assets/uma-logo.png";
import { CHAINS, ChainId } from "constants/blockchain";

import { oracle } from "../helpers/oracleClient";
import { Explorer, parseIdentifier } from "../helpers/format";

const { formatUnits } = ethers.utils;
const { ignoreExistenceError } = oracle.errors;

// this is less of a hook and more of just a static function. Thats ok, its cheap to do this on each render.
export default function useOracleReader(state: oracle.types.state.State) {
  const read = new oracle.store.Read(state);

  const request = ignoreExistenceError(read.request);
  const defaultLiveness = ignoreExistenceError(read.defaultLiveness);
  const collateralProps = ignoreExistenceError(read.collateralProps);

  const decimals = collateralProps?.decimals;

  const totalBond =
    request?.finalFee &&
    decimals &&
    request?.bond &&
    formatUnits(request.bond.add(request.finalFee), decimals);

  const reward =
    request?.reward && decimals && formatUnits(request.reward, decimals);

  const liveness = request?.customLiveness?.gt(0)
    ? request.customLiveness.toNumber()
    : defaultLiveness && defaultLiveness.toNumber();

  const expirationTime = request?.expirationTime?.toNumber();
  const requestState = request?.state;
  const proposedPrice = request?.proposedPrice;
  const disputer = request?.disputer;
  const proposer = request?.proposer;
  const chainId: ChainId = state.inputs?.request?.chainId || 1;

  const requestTx = request?.requestTx;
  const proposeTx = request?.proposeTx;
  const settleTx = request?.settleTx;
  const disputeTx = request?.disputeTx;

  // generate explorer links
  const explorerUrl = CHAINS[chainId].explorerUrl;
  const explorer = new Explorer(explorerUrl);

  // explore transactions
  const exploreRequestTx = requestTx && explorer.tx(requestTx);
  const exploreProposeTx = proposeTx && explorer.tx(proposeTx);
  const exploreDisputeTx = disputeTx && explorer.tx(disputeTx);
  const exploreSettleTx = settleTx && explorer.tx(settleTx);

  // explore addresses
  const exploreProposerAddress = proposer && explorer.address(proposer);
  const exploreDisputerAddress = disputer && explorer.address(disputer);

  let parsedIdentifier = "";
  try {
    parsedIdentifier = parseIdentifier(request?.identifier);
  } catch (err) {
    // ignore error
    console.error(err);
  }

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
    requestTx,
    proposeTx,
    settleTx,
    disputeTx,
    explorerUrl,
    exploreRequestTx,
    exploreProposeTx,
    exploreDisputeTx,
    exploreSettleTx,
    exploreProposerAddress,
    exploreDisputerAddress,
    parsedIdentifier,
  };
}

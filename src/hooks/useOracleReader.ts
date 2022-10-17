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

  // this needs to be a string because custom liveness could be bigger than what a number can handle
  const liveness = request?.customLiveness?.gt(0)
    ? request.customLiveness.toString()
    : defaultLiveness && defaultLiveness.toString();

  const expirationTime = request?.expirationTime?.toNumber();
  const requestState = request?.state;
  const proposedPrice = request?.proposedPrice;
  const disputer = request?.disputer;
  const proposer = request?.proposer;
  const chainId: ChainId = Number(state.inputs?.request?.chainId || 1);

  let provider;
  try {
    provider = read.provider(chainId);
  } catch (err) {
    provider = undefined;
    console.error(provider, err);
  }

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

  const requester = request?.requester;
  const identifier = request?.identifier;
  const ancillaryData = request?.ancillaryData;
  const timestamp = request?.timestamp;

  let parsedIdentifier = "";
  try {
    parsedIdentifier = parseIdentifier(request?.identifier);
  } catch (err) {
    // ignore error
    console.error(request?.identifier, err);
  }

  // the read function probably returns an empty array if DNE, but that causes lots of rerenders if its a dependency.
  // so lets just use the raw value and check for undefined.
  const descendingRequests: oracle.types.interfaces.Requests | undefined =
    state.descendingRequests;

  const eventBased = request?.eventBased || false;
  return {
    chainId,
    totalBond,
    reward,
    liveness,
    collateralSymbol: collateralProps && collateralProps.symbol,
    logo: collateralProps?.symbol === "UMA" ? umaLogo : usdcLogo,
    expirationTime,
    requestState,
    proposedPrice,
    disputer,
    requester,
    identifier,
    ancillaryData,
    timestamp,
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
    descendingRequests,
    eventBased,
    provider,
  };
}

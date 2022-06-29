import assert from "assert";
import { useSearchParams } from "react-router-dom";
import * as ss from "superstruct";
import {
  isSupportedOracleType,
  OracleType,
  defaultOracleType,
} from "helpers/oracleClient";
import {capitalizeFirstLetter} from 'utils/format'

// query params when a link specifies transaction hash
const RequestInputByTransactionSs = ss.object({
  chainId: ss.string(),
  oracleType: ss.optional(ss.string()),
  transactionHash: ss.string(),
  eventIndex: ss.string(),
});

// query params when link specifies request details
const RequestInputSs = ss.object({
  chainId: ss.string(),
  oracleType: ss.optional(ss.string()),
  requester: ss.string(),
  timestamp: ss.string(),
  identifier: ss.string(),
  ancillaryData: ss.string(),
});

// this is like a parent class, has required params for both types of query params
const RequestInputRequiredSs = ss.type({
  chainId: ss.string(),
  oracleType: ss.optional(ss.string()),
});

// these mirror the superstruct types, but make them more specific for data needed by client
type RequestInputRequired = {
  chainId: number;
  oracleType: OracleType;
};
type RequestInput = RequestInputRequired & {
  requester: string;
  timestamp: number;
  identifier: string;
  ancillaryData: string;
};
type RequestInputByTransaction = RequestInputRequired & {
  eventIndex: number;
  transactionHash: string;
};

// converts query params by transaction hash to parameters needed for client, or undefined
export function getRequestInputByTransaction(
  params: unknown
): RequestInputByTransaction | undefined {
  try {
    const parsed = ss.create(params, RequestInputByTransactionSs);
    parsed.oracleType = capitalizeFirstLetter(parsed.oracleType || defaultOracleType);
    assert(
      isSupportedOracleType(parsed.oracleType),
      "Invalid oracle type in search params: " + parsed.oracleType
    );
    const oracleType: OracleType = parsed.oracleType;
    return {
      ...parsed,
      oracleType,
      chainId: Number(parsed.chainId),
      eventIndex: Number(parsed.eventIndex),
    };
  } catch (err) {
    //since we cant easily handle errors in hooks, just return undefined for any reason we cant parse
  }
}

// converts query params by request details to parameters needed for client, or undefined
export function getRequestInput(params: unknown): RequestInput | undefined {
  try {
    const parsed = ss.create(params, RequestInputSs);
    parsed.oracleType = capitalizeFirstLetter(parsed.oracleType || defaultOracleType);
    assert(
      isSupportedOracleType(parsed.oracleType),
      "Invalid oracle type in search params: " + parsed.oracleType
    );
    const oracleType: OracleType = parsed.oracleType;
    return {
      ...parsed,
      oracleType,
      chainId: Number(parsed.chainId),
      timestamp: Number(parsed.timestamp),
    };
  } catch (err) {
    //since we cant easily handle errors in hooks, just return undefined for any reason we cant parse
  }
}

// this parses the required parameters, (oracleType, chainId) from any query
export function getRequestInputRequired(
  params: unknown
): RequestInputRequired | undefined {
  try {
    const parsed = ss.create(params, RequestInputRequiredSs);
    parsed.oracleType = capitalizeFirstLetter(parsed.oracleType || defaultOracleType);
    assert(
      isSupportedOracleType(parsed.oracleType),
      "Invalid oracle type in search params: " + parsed.oracleType
    );
    const oracleType: OracleType = parsed.oracleType;
    return {
      ...parsed,
      oracleType,
      chainId: Number(parsed.chainId),
    };
  } catch (err) {
    //since we cant easily handle errors in hooks, just return undefined for any reason we cant parse
  }
}

// turns this into a hook
export function useRequestInputRequired(): RequestInputRequired | undefined {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  return getRequestInputRequired(params);
}

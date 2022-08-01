import assert from "assert";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as ss from "superstruct";
import {
  isSupportedOracleType,
  OracleType,
  defaultOracleType,
} from "helpers/oracleClient";
import { capitalizeFirstLetter } from "utils/format";

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
): RequestInputByTransaction {
  const parsed = ss.create(params, RequestInputByTransactionSs);
  const required = getRequestInputRequired(params);
  return {
    ...parsed,
    eventIndex: Number(parsed.eventIndex),
    ...required,
  };
}

// converts query params by request details to parameters needed for client, or undefined
export function getRequestInput(params: unknown): RequestInput {
  const parsed = ss.create(params, RequestInputSs);
  const required = getRequestInputRequired(params);
  return {
    ...parsed,
    timestamp: Number(parsed.timestamp),
    ...required,
  };
}

// this parses the required parameters, (oracleType, chainId) from any query
export function getRequestInputRequired(params: unknown): RequestInputRequired {
  const parsed = ss.create(params, RequestInputRequiredSs);
  parsed.oracleType = capitalizeFirstLetter(
    parsed.oracleType || defaultOracleType
  );
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
}

// turns this into a hook
export function useRequestInputRequired(): RequestInputRequired | undefined {
  const [searchParams] = useSearchParams();
  const [requestQuery, setRequestQuery] = useState<
    undefined | RequestInputRequired
  >();

  // made this a use effect to prevent rerenders since parsing the search params returns new objects every time
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    try {
      setRequestQuery(getRequestInputRequired(params));
    } catch (err) {
      if (process.env.REACT_APP_DEBUG) console.warn("Error parsing query", err);
      if (requestQuery) setRequestQuery(undefined);
    }
  }, [searchParams]);

  return requestQuery;
}

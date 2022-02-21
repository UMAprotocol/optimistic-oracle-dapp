import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';


const SEARCH_PARAMS_KEYS = ["chainId", "requester", "timestamp", "identifier", "ancillaryData"] as const;
const SEARCH_PARAMS_KEYS_BY_TRANSACTION = ["chainId", "transactionHash", "eventIndex"] as const;

type ActiveRequestParams = {
	requester: string;
	identifier: string;
	ancillaryData: string;
	chainId: number;
	timestamp: number;
}
type ActiveRequestParamsByTransaction = {
	chainId: number;
	transactionHash: string;
	eventIndex: number | undefined;
}

type RequestParams<IsByTransaction extends boolean> = IsByTransaction extends false ? ActiveRequestParams : ActiveRequestParamsByTransaction;
type Keys<IsByTransaction extends boolean> = IsByTransaction extends false ? typeof SEARCH_PARAMS_KEYS : typeof SEARCH_PARAMS_KEYS_BY_TRANSACTION;
type UseRequestParamsReturn<IsByTransaction extends boolean> = { request: RequestParams<IsByTransaction>, error: undefined } | { request: undefined, error: InvalidURLParamsError };
export function useRequestParams(): UseRequestParamsReturn<true>;
export function useRequestParams<T extends boolean>(isByTransaction: T): UseRequestParamsReturn<T>;
export default function useRequestParams<T extends boolean>(isByTransaction?: T): UseRequestParamsReturn<T> {
	const [searchParams] = useSearchParams();
	const keys = (Boolean(isByTransaction) ? SEARCH_PARAMS_KEYS_BY_TRANSACTION : SEARCH_PARAMS_KEYS) as Keys<T>;

	const request = useMemo(() => {
		const params = {} as any;
		try {
			keys.forEach(key => {
				const value = searchParams.get(key);
				if (value === null && key !== "eventIndex") {
					throw new InvalidURLParamsError(`Missing required parameter: ${key}`);
				}
				if (["timestamp", "chainId", "eventIndex"].includes(key)) {
					const parsedKey = Number(value);
					params[key] = isNaN(parsedKey) ? undefined : parsedKey;
				} else {
					params[key] = value;
				}
			});
			return { request: params as RequestParams<T>, error: undefined };
		} catch (e) {
			return { request: undefined, error: e as InvalidURLParamsError };
		}

	}, [keys, searchParams]);
	return request;
}


export function isByTransactionRequest(request?: RequestParams<boolean>): request is ActiveRequestParamsByTransaction {
	if (!request) {
		return false;
	}
	const { chainId, transactionHash } = request as ActiveRequestParamsByTransaction;
	return chainId !== undefined && transactionHash !== undefined;
}

export class InvalidURLParamsError extends Error {
	constructor(message: string) {
		super("Invalid URL params");
		this.message = message;
	}
}
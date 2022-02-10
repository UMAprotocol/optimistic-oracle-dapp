import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';


const LEGACY_SEARCH_PARAMS_KEYS = ["chainId", "requester", "timestamp", "identifier", "ancillaryData"] as const;
const NEW_SEARCH_PARAMS_KEYS = ["chainId", "transactionHash", "eventIndex"] as const;

type LegacyRequestParams = {
	requester: string;
	identifier: string;
	ancillaryData: string;
	chainId: number;
	timestamp: number;
}
type NewRequestParams = {
	chainId: number;
	transactionHash: string;
	eventIndex: number | undefined;
}

type RequestParams<IsLegacy extends boolean> = IsLegacy extends true ? LegacyRequestParams : NewRequestParams;
type Keys<IsLegacy extends boolean> = IsLegacy extends true ? typeof LEGACY_SEARCH_PARAMS_KEYS : typeof NEW_SEARCH_PARAMS_KEYS;
type UseRequestParamsReturn<IsLegacy extends boolean> = { request: RequestParams<IsLegacy>, error: undefined } | { request: undefined, error: InvalidURLParamsError };
export function useRequestParams(): UseRequestParamsReturn<false>;
export function useRequestParams<T extends boolean>(isLegacy: T): UseRequestParamsReturn<T>;
export default function useRequestParams<T extends boolean>(isLegacy?: T): UseRequestParamsReturn<T> {
	const [searchParams] = useSearchParams();
	const keys = (Boolean(isLegacy) ? LEGACY_SEARCH_PARAMS_KEYS : NEW_SEARCH_PARAMS_KEYS) as Keys<T>;

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


export function isLegacyRequest(request?: RequestParams<boolean>): request is LegacyRequestParams {
	if (!request) {
		return false;
	}
	const { chainId, requester, identifier, ancillaryData, timestamp } = request as LegacyRequestParams;
	return chainId !== undefined && requester !== undefined && identifier !== undefined && ancillaryData !== undefined && timestamp !== undefined;
}

export class InvalidURLParamsError extends Error {
	constructor(message: string) {
		super("Invalid URL params");
		this.message = message;
	}
}
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';


/**
 * this function DOES NOT validate that the URL is valid, it assumes it to be valid, and then checks if it matches a legacy URL 
 * */
export default function useIsLegacyParams(): boolean {
	const [searchParams] = useSearchParams();
	return useMemo(() => { const value = searchParams.get("requester"); return value !== null }, [searchParams]);
}
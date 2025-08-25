import { useEffect, useState } from "react";
import { getQuote } from "../api/bookingApi";
import type { QuoteResponse } from "../types";
import { useAuth } from "../../auth/hooks/UseAuth.tsx";

export function useBookingQuote(params: {
    checkInDate?: string;
    checkOutDate?: string;
    roomId?: number;
    enabled?: boolean;
}) {
    const { checkInDate, checkOutDate, roomId, enabled = true } = params;
    const { token } = useAuth();
    const [data, setData] = useState<QuoteResponse | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            if (!enabled || !checkInDate || !checkOutDate || !roomId) {
                setData(null);
                return;
            }
            setLoading(true);
            try {
                const quote = await getQuote(
                    { checkInDate, checkOutDate, roomId },
                    token ?? undefined
                );
                if (!cancelled) setData(quote);
            } catch {
                if (!cancelled) setData(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [checkInDate, checkOutDate, roomId, enabled, token]);

    return { quote: data, quoteLoading: loading };
}

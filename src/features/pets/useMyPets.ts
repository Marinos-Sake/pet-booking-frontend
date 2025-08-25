import { useEffect, useState } from "react";
import type {Pet} from "./types.ts";
import {useAuth} from "../auth/hooks/UseAuth.tsx";
import {getMyPets} from "./api/petsApi.ts";


export function useMyPets(): { pets: Pet[]; loading: boolean; error: string | null } {
    const { token, isAuthenticated } = useAuth();
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated || !token) return;

        const ac = new AbortController();
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getMyPets(token);
                if (!ac.signal.aborted) setPets(data);
            } catch (e: any) {
                if (!ac.signal.aborted) setError(e?.message ?? "Σφάλμα κατά την ανάκτηση κατοικιδίων");
            } finally {
                if (!ac.signal.aborted) setLoading(false);
            }
        })();

        return () => ac.abort();
    }, [isAuthenticated, token]);

    return { pets, loading, error };
}

import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import type { Pet } from "./types";

export function useMyPets(): { pets: Pet[]; loading: boolean; error: string | null } {
    const { token, isAuthenticated } = useAuth();
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated || !token) return;

        (async () => {
            setLoading(true);
            setError(null);
            try {
                const r = await fetch("/api/pets/my", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!r.ok) throw new Error(await r.text());
                const data: Pet[] = await r.json();
                setPets(data);
            } catch (err: any) {
                setError(err?.message || "Σφάλμα κατά την ανάκτηση κατοικιδίων");
            } finally {
                setLoading(false);
            }
        })();
    }, [isAuthenticated, token]);

    return { pets, loading, error };
}

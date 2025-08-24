import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../features/auth/context/authContext.ts";
import { getToken, setToken as persistToken, clearToken } from "../../features/auth/storage.ts";
import { loginApi, meApi } from "../../features/auth/api/authApi.ts";
import type { DecodedToken, MeProfile } from "../../features/auth/types.ts";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setTokenState] = useState<string | null>(() => getToken());
    const [profile, setProfile] = useState<MeProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(!!token);

    // sync localStorage
    useEffect(() => {
        if (token) persistToken(token);
        else clearToken();
    }, [token]);

    const decoded = useMemo<DecodedToken | null>(() => {
        if (!token) return null;
        try {
            return jwtDecode<DecodedToken>(token);
        } catch {
            return null;
        }
    }, [token]);

    const isExpired = useMemo(() => {
        if (!decoded?.exp) return true;
        return Date.now() / 1000 > decoded.exp;

    }, [decoded?.exp]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (!token || isExpired) {
                if (!cancelled) {
                    setProfile(null);
                    setLoading(false);
                }
                return;
            }
            setLoading(true);
            try {
                const me = await meApi(token);
                if (!cancelled) setProfile(me);
            } catch {
                if (!cancelled) setProfile(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [token, isExpired]);

    const login = useCallback(async (username: string, password: string) => {
        const res = await loginApi({ username, password });
        setTokenState(res.token);
    }, []);

    const logout = useCallback(() => {
        setTokenState(null);
        setProfile(null);
    }, []);

    const value = useMemo(
        () => ({
            token,
            decoded,
            isExpired,
            isAuthenticated: !!token && !isExpired,
            profile,
            loading,
            login,
            logout,
            setProfile,
        }),
        [token, decoded, isExpired, profile, loading, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

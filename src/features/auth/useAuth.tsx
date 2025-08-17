import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken as getStored, setToken as store, clearToken as wipe } from "./storage";
import { loginApi, meApi } from "./api/authApi";
import type { DecodedToken, MeProfile } from "./types";

type AuthContextValue = {
    token: string | null;
    decoded: DecodedToken | null;
    isExpired: boolean;
    isAuthenticated: boolean;
    profile: MeProfile | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setTokenState] = useState<string | null>(() => getStored());
    const [profile, setProfile] = useState<MeProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(!!token);

    // sync localStorage σε κάθε αλλαγή token
    useEffect(() => {
        if (token) store(token);
        else wipe();
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
    }, [decoded]);


    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (!token || isExpired) {
                setProfile(null);
                setLoading(false);
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
        const res = await loginApi({ username, password }); // { token }
        setTokenState(res.token); // trigger re-render (Navbar κ.λπ.)
    }, []);

    const logout = useCallback(() => {
        setTokenState(null);
        setProfile(null);
    }, []);

    const value: AuthContextValue = {
        token,
        decoded,
        isExpired,
        isAuthenticated: !!token && !isExpired,
        profile,
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx;
}

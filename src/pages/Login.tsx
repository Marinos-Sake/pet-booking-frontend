import { useState, type FormEvent } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/UseAuth.tsx";
import { useEffect } from "react";

export default function Login() {
    const nav = useNavigate();
    const loc = useLocation();
    const { login, isAuthenticated, loading } = useAuth();

    const [notice, setNotice] = useState<string | undefined>((loc.state as any)?.notice);


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!notice) {
            const m = sessionStorage.getItem("flash_notice");
            if (m) {
                setNotice(m);
                sessionStorage.removeItem("flash_notice");
            }
        }
    }, [notice]);

    useEffect(() => {
        if (!loading && isAuthenticated) {
            nav("/me", { replace: true });
        }
    }, [loading, isAuthenticated, nav]);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await login(username.trim(), password);
            nav("/me", { replace: true });
        } catch (err: any) {
            setError(err?.message ?? "Αποτυχία σύνδεσης");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="mx-auto max-w-md px-6 py-12">
            <h1 className="text-2xl md:text-3xl font-bold text-text-ink mb-6">Σύνδεση</h1>

            {notice && !error && (
                <p className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
                    {notice}
                </p>
            )}

            <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-border-soft bg-white p-6 flex flex-col gap-4"
            >
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-text-muted">Όνομα χρήστη</label>
                    <input
                        className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-text-muted">Κωδικός</label>
                    <input
                        type="password"
                        className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={submitting || !username || !password}
                    className="rounded-xl bg-primary-brand px-5 py-2 text-white disabled:opacity-50"
                >
                    {submitting ? "Σύνδεση…" : "Σύνδεση"}
                </button>

                <p className="text-sm text-text-muted mt-2">
                    Δεν έχεις λογαριασμό{" "}
                    <Link to="/register" className="underline">Δημιούργησε έναν</Link>
                </p>
            </form>
        </section>
    );
}

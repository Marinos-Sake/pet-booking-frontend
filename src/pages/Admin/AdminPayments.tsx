import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/UseAuth.tsx";
import type { PageResp } from "../../lib/types/typesPagination.ts";
import type { Payment } from "../../features/admin/types.ts";
import {adminListPayments} from "../../features/admin/api/paymentsApi.ts";

export default function AdminPayments() {
    const nav = useNavigate();
    const { token, isAuthenticated } = useAuth();

    const [sp, setSp] = useSearchParams();
    const page = Math.max(0, parseInt(sp.get("page") || "0", 10));
    const size = Math.min(100, Math.max(1, parseInt(sp.get("size") || "10", 10)));
    const sortBy = sp.get("sortBy") || "id"; // ⬅️ default sort by id
    const sortDirection = (sp.get("sortDirection") || "DESC").toUpperCase() as "ASC" | "DESC";

    const [rows, setRows] = useState<Payment[]>([]);
    const [meta, setMeta] = useState<
        Pick<PageResp<Payment>, "number" | "totalPages" | "first" | "last" | "size" | "totalElements">
    >({ number: 0, totalPages: 0, first: true, last: true, size, totalElements: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Guard
    useEffect(() => {
        if (!isAuthenticated) nav("/login?next=/admin/payments");
    }, [isAuthenticated, nav]);

    const setParam = (k: string, v: string) => {
        const next = new URLSearchParams(sp);
        next.set(k, v);
        if (k !== "page") next.set("page", "0");
        setSp(next, { replace: true });
    };

    const toggleSortId = () => {
        setParam("sortBy", "id");
        setParam("sortDirection", sortDirection === "ASC" ? "DESC" : "ASC");
    };

    const money = (v: number | string) => {
        const n = typeof v === "string" ? Number(v) : v;
        return Number.isFinite(n) ? `${n.toFixed(2)} €` : String(v);
    };

    const loadPage = useCallback(async () => {
        if (!isAuthenticated || !token) return;
        try {
            setLoading(true);
            setError(null);
            const data = await adminListPayments(token, { page, size, sortBy, sortDirection });
            setRows(data.content || []);
            setMeta({
                number: data.number,
                totalPages: data.totalPages,
                first: data.first,
                last: data.last,
                size: data.size,
                totalElements: data.totalElements,
            });
        } catch (e: any) {
            setError(e?.message ?? "Κάτι πήγε στραβά");
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token, page, size, sortBy, sortDirection]);

    useEffect(() => {
        loadPage();
    }, [loadPage]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-text-ink">Πληρωμές (ADMIN)</h1>

            <div className="mt-3 flex items-center gap-2">
                <label className="text-sm">Ανά σελίδα:</label>
                <select
                    className="rounded-lg border border-border-soft px-2 py-1"
                    value={size}
                    onChange={(e) => setParam("size", e.target.value)}
                >
                    {[10, 20, 50, 100].map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-4 overflow-auto rounded-2xl border border-border-soft bg-surface-card">
                <table className="w-full text-sm">
                    <thead className="text-left text-text-muted">
                    <tr>
                        <Th onClick={toggleSortId} active={sortBy === "id"} dir={sortDirection}>
                            #
                        </Th>
                        <th className="p-3">Ποσό</th>
                        <th className="p-3">Booking ID</th>
                        <th className="p-3">Πελάτης</th>
                        <th className="p-3">Κατοικίδιο</th>
                        <th className="p-3">Δωμάτιο</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading && (
                        <tr>
                            <td className="p-4 text-center text-text-muted" colSpan={6}>
                                Φόρτωση…
                            </td>
                        </tr>
                    )}
                    {error && !loading && (
                        <tr>
                            <td className="p-4 text-center text-red-600" colSpan={6}>
                                {error}
                            </td>
                        </tr>
                    )}
                    {!loading && !error && rows.length === 0 && (
                        <tr>
                            <td className="p-4 text-center text-text-muted" colSpan={6}>
                                Καμία πληρωμή
                            </td>
                        </tr>
                    )}
                    {rows.map((p) => (
                        <tr key={p.id} className="border-t border-border-soft">
                            <td className="p-3">{p.id}</td>
                            <td className="p-3">{money(p.amount)}</td>
                            <td className="p-3">{p.bookingId}</td>
                            <td className="p-3">{p.userFullName ?? "—"}</td>
                            <td className="p-3">{p.petName ?? "—"}</td>
                            <td className="p-3">{p.roomName ?? "—"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
        <span>
          Σύνολο: <strong>{meta.totalElements}</strong>
        </span>
                <div className="flex items-center gap-2">
                    <button
                        className="rounded-xl border px-3 py-1 disabled:opacity-50"
                        onClick={() => setParam("page", String(Math.max(0, page - 1)))}
                        disabled={meta.first}
                    >
                        Προηγούμενη
                    </button>
                    <span>
            Σελίδα <strong>{(meta.number ?? 0) + 1}</strong> / {meta.totalPages || 1}
          </span>
                    <button
                        className="rounded-xl border px-3 py-1 disabled:opacity-50"
                        onClick={() => setParam("page", String(page + 1))}
                        disabled={meta.last || meta.totalPages === 0}
                    >
                        Επόμενη
                    </button>
                </div>
            </div>
        </div>
    );
}

function Th({
                children,
                onClick,
                active,
                dir,
            }: {
    children: React.ReactNode;
    onClick: () => void;
    active: boolean;
    dir: string;
}) {
    return (
        <th className="p-3 cursor-pointer select-none" onClick={onClick}>
      <span className="inline-flex items-center gap-1">
        {children}
          {active && <span>{dir === "ASC" ? "▲" : "▼"}</span>}
      </span>
        </th>
    );
}

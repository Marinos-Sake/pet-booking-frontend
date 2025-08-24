import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/UseAuth.tsx";


import type {PageResp} from "../../lib/types/typesPagination.ts";
import type {Booking} from "../../features/admin/types.ts";
import {adminDeleteBooking, adminListBookings} from "../../features/admin/api/bookingsApi.ts";

export default function AdminBookings() {
    const nav = useNavigate();
    const { token, isAuthenticated } = useAuth();

    // query params
    const [sp, setSp] = useSearchParams();
    const page = Math.max(0, parseInt(sp.get("page") || "0", 10));
    const size = Math.min(100, Math.max(1, parseInt(sp.get("size") || "10", 10)));
    const sortBy = sp.get("sortBy") || "id";
    const sortDirection = (sp.get("sortDirection") || "DESC").toUpperCase() as "ASC" | "DESC";

    const [rows, setRows] = useState<Booking[]>([]);
    const [meta, setMeta] = useState<
        Pick<PageResp<Booking>, "number" | "totalPages" | "first" | "last" | "size" | "totalElements">
    >({ number: 0, totalPages: 0, first: true, last: true, size, totalElements: 0 });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        if (!isAuthenticated) nav("/login?next=/admin/bookings");
    }, [isAuthenticated, nav]);

    const setParam = (k: string, v: string) => {
        const next = new URLSearchParams(sp);
        next.set(k, v);
        if (k !== "page") next.set("page", "0");
        setSp(next, { replace: true });
    };

    const toggleSort = (col: string) => {
        if (sortBy === col) {
            setParam("sortDirection", sortDirection === "ASC" ? "DESC" : "ASC");
        } else {
            setParam("sortBy", col);
            setParam("sortDirection", "DESC");
        }
    };

    const fmtDate = (s: string) => (s ? new Date(s).toLocaleDateString() : "");
    const fmtMoney = (v: number | string) => {
        const n = typeof v === "string" ? Number(v) : v;
        return Number.isFinite(n) ? `${n.toFixed(2)} €` : String(v);
    };


    const loadPage = useCallback(async () => {
        if (!isAuthenticated || !token) return;
        try {
            setLoading(true);
            setError(null);
            const data = await adminListBookings(token, { page, size, sortBy, sortDirection });
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

    // delete
    const handleDelete = async (id: number) => {
        if (!token) return;
        const ok = window.confirm(`Να διαγραφεί η κράτηση #${id};`);
        if (!ok) return;
        try {
            setDeletingId(id);
            await adminDeleteBooking(token, id);
            await loadPage();
        } catch (e: any) {
            alert(e?.message ?? "Αποτυχία διαγραφής");
        } finally {
            setDeletingId(null);
        }
    };

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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-text-ink">Κρατήσεις (ADMIN)</h1>

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
                        <Th onClick={() => toggleSort("id")} active={sortBy === "id"} dir={sortDirection}>
                            #
                        </Th>
                        <Th
                            onClick={() => toggleSort("checkInDate")}
                            active={sortBy === "checkInDate"}
                            dir={sortDirection}
                        >
                            Check-in
                        </Th>
                        <Th
                            onClick={() => toggleSort("checkOutDate")}
                            active={sortBy === "checkOutDate"}
                            dir={sortDirection}
                        >
                            Check-out
                        </Th>
                        <Th onClick={() => toggleSort("status")} active={sortBy === "status"} dir={sortDirection}>
                            Status
                        </Th>
                        <Th
                            onClick={() => toggleSort("totalPrice")}
                            active={sortBy === "totalPrice"}
                            dir={sortDirection}
                        >
                            Σύνολο
                        </Th>

                        <th className="p-3">User ID</th>
                        <th className="p-3">Pet ID</th>
                        <th className="p-3">Room ID</th>

                        <th className="p-3 text-right">Ενέργειες</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading && (
                        <tr>
                            <td className="p-4 text-center text-text-muted" colSpan={9}>
                                Φόρτωση…
                            </td>
                        </tr>
                    )}
                    {error && !loading && (
                        <tr>
                            <td className="p-4 text-center text-red-600" colSpan={9}>
                                {error}
                            </td>
                        </tr>
                    )}
                    {!loading && !error && rows.length === 0 && (
                        <tr>
                            <td className="p-4 text-center text-text-muted" colSpan={9}>
                                Καμία κράτηση
                            </td>
                        </tr>
                    )}
                    {rows.map((b) => (
                        <tr key={b.id} className="border-t border-border-soft">
                            <td className="p-3">{b.id}</td>
                            <td className="p-3">{fmtDate(b.checkInDate)}</td>
                            <td className="p-3">{fmtDate(b.checkOutDate)}</td>
                            <td className="p-3">{b.status}</td>
                            <td className="p-3">{fmtMoney(b.totalPrice)}</td>

                            <td className="p-3">{b.userId}</td>
                            <td className="p-3">{b.petId}</td>
                            <td className="p-3">{b.roomId}</td>

                            <td className="p-3 text-right">
                                <button
                                    className="rounded-lg border px-3 py-1 text-sm hover:bg-red-50 disabled:opacity-50"
                                    onClick={() => handleDelete(b.id)}
                                    disabled={deletingId === b.id || loading}
                                    title="Διαγραφή"
                                >
                                    {deletingId === b.id ? "Διαγραφή..." : "Διαγραφή"}
                                </button>
                            </td>
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

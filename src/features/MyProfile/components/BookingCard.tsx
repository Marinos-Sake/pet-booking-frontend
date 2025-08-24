import { useMemo, useState } from "react";
import { createPayment } from "../../payments/api/paymentsApi";
import { money } from "../helpers.ts";
import type { BookingListItem } from "../../booking/types";
import type { PaymentRead } from "../../payments/types";

export default function BookingsCard({
                                         token, bookings, payments, loading, error, onPaymentsReload
                                     }: {
    token: string; bookings: BookingListItem[]; payments: PaymentRead[];
    loading: boolean; error?: string|null; onPaymentsReload: () => Promise<void>;
}) {
    const paidByBooking = useMemo(() => payments.reduce((m,x)=>m.set(x.bookingId,(m.get(x.bookingId)||0)+Number(x.amount||0)), new Map<number,number>()), [payments]);
    const remainingFor = (b: BookingListItem) => Math.max(0, Number(b.totalPrice||0) - (paidByBooking.get(b.id)||0));

    const [payingId, setPayingId] = useState<number|null>(null);
    const [amt, setAmt] = useState(""), [submitting, setSubmitting] = useState(false), [err, setErr] = useState<string|null>(null);

    async function confirmPay() {
        if (!payingId) return;
        const n = Number(amt);
        if (!n || n <= 0) return setErr("Το ποσό πρέπει να είναι θετικό.");
        setSubmitting(true); setErr(null);
        try { await createPayment(token, { bookingId: payingId, amount: n }); await onPaymentsReload(); setPayingId(null); setAmt(""); }
        catch(e:any){ setErr(e?.message || "Αποτυχία πληρωμής"); }
        finally{ setSubmitting(false); }
    }

    if (loading) return <p className="text-text-muted">Φόρτωση…</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!bookings.length) return <p className="text-text-muted">Δεν έχεις κάνει ακόμη κράτηση.</p>;

    return (
        <ul className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
            {bookings.map(b=>{
                const remaining = remainingFor(b), paying = payingId===b.id;
                return (
                    <li key={b.id} className="rounded-xl border border-border-soft bg-surface-card p-3">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="font-medium">{b.roomName ?? "Δωμάτιο"} • {b.petName ?? "Κατοικίδιο"}</p>
                                <p className="text-sm text-text-muted">{b.checkInDate} → {b.checkOutDate}</p>
                                <p className="text-sm">
                                    Σύνολο: <span className="font-semibold">{money(b.totalPrice)}</span> •
                                    Πληρώθηκε: <span className="font-semibold">{money(paidByBooking.get(b.id) ?? 0)}</span> •
                                    Υπόλοιπο: <span className="font-semibold">{money(remaining)}</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs rounded-full px-2 py-0.5 border">{b.status}</span>
                                <div className="mt-2">
                                    {remaining > 0 ? (
                                        !paying ? (
                                            <button className="rounded-lg bg-primary-brand text-white px-3 py-1 text-sm" onClick={() => { setPayingId(b.id); setAmt(remaining.toFixed(2)); }}>
                                                Πληρωμή
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <input type="number" min="0.01" step="0.01" value={amt} onChange={e=>setAmt(e.target.value)} className="w-28 rounded-lg border border-border-soft px-2 py-1 text-sm" placeholder="Ποσό"/>
                                                <button disabled={submitting} onClick={confirmPay} className="rounded-lg bg-primary-brand text-white px-3 py-1 text-sm disabled:opacity-50">
                                                    {submitting ? "Επεξεργασία…" : "Πληρωμή τώρα"}
                                                </button>
                                                <button disabled={submitting} onClick={()=>{ setPayingId(null); setAmt(""); setErr(null); }} className="rounded-lg border px-3 py-1 text-sm">Άκυρο</button>
                                            </div>
                                        )
                                    ) : <span className="text-xs text-green-700">Εξοφλημένη</span>}
                                </div>
                                {paying && err && <p className="text-red-600 text-xs mt-1">{err}</p>}
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

import { money } from "../helpers.ts";
import type { PaymentRead } from "../../payments/types";

export default function PaymentsCard({ payments, loading, error }: { payments: PaymentRead[]; loading: boolean; error?: string|null; }) {
    if (loading) return <p className="text-text-muted">Φόρτωση…</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!payments.length) return <p className="text-text-muted">Δεν υπάρχουν πληρωμές ακόμη.</p>;

    return (
        <ul className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
            {payments.map(p=>(
                <li key={p.id} className="rounded-xl border border-border-soft bg-surface-card p-3">
                    <p className="font-medium">{p.roomName ?? "Δωμάτιο"} • {p.petName ?? "Κατοικίδιο"}</p>
                    <p className="text-sm text-text-muted">{p.paymentDate} • Booking #{p.bookingId}</p>
                    <p className="text-sm">Ποσό: <span className="font-semibold">{money(p.amount)}</span></p>
                </li>
            ))}
        </ul>
    );
}

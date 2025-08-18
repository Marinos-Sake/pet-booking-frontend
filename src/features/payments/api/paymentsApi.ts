import type { PaymentInsert, PaymentRead } from "../types";

export async function createPayment(token: string, payload: PaymentInsert): Promise<PaymentRead> {
    const r = await fetch("/api/payments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
}

export async function getMyPayments(token: string): Promise<PaymentRead[]> {
    const r = await fetch("/api/payments/my", {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
}

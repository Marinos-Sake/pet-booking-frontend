import type { PaymentInsert, PaymentRead } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export async function createPayment(token: string, payload: PaymentInsert): Promise<PaymentRead> {
    const r = await fetch(`${API_URL}/payments`, {
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
    const r = await fetch(`${API_URL}/payments/my`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
}

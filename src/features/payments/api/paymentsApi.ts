import type { PaymentInsert, PaymentRead } from "../types";
import {extractErrorMessage} from "../../../lib/http.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function createPayment(token: string, payload: PaymentInsert): Promise<PaymentRead> {
    const response = await fetch(`${API_URL}/payments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

    return response.json();
}

export async function getMyPayments(token: string): Promise<PaymentRead[]> {
    const response = await fetch(`${API_URL}/payments/my`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        const msg = await extractErrorMessage(response);
        throw new Error(msg);
    }

    return response.json();
}

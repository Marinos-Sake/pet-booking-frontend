export type PaymentInsert = {
    bookingId: number;
    amount: number;
};

export type PaymentRead = {
    id: number;
    amount: number;
    paymentDate: string;
    bookingId: number;
    userFullName?: string | null;
    petName?: string | null;
    roomName?: string | null;
};

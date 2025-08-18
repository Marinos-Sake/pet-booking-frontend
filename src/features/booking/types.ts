export type QuoteRequest = {
    checkInDate: string;
    checkOutDate: string;
    roomId: number;
};

export type QuoteResponse = {
    nights: number;
    pricePerNight: number;
    totalPrice: number;
};

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export type BookingListItem = {
    id: number;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    status: BookingStatus;
    roomName: string | null;
    petName: string | null;
};

export type Booking = {
    id: number;
    checkInDate: string;
    checkOutDate: string;
    status: string;
    totalPrice: number | string;
    userId: number;
    petId: number;
    roomId: number;
};

export type Payment = {
    id: number;
    amount: number | string;
    paymentDate: string;
    bookingId: number;
    userFullName: string | null;
    petName: string | null;
    roomName: string | null;
};

export type Role = "ADMIN" | "USER" | string;

export type User = {
    id: number;
    username: string;
    isActive: boolean;
    role: Role;
    // ignore nested class person
};


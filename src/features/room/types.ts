export type RoomType = "CAT" | "DOG";

export type Room = {
    id: number;
    name: string;
    type: RoomType;
    capacity: number;
    pricePerNight: number;
    description: string | null;
    isAvailable: boolean;
};

export const roomTypeLabel: Record<RoomType, string> = {
    CAT: "Γάτα",
    DOG: "Σκύλος",
};

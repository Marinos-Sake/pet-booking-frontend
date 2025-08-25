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
    SMALL: "Μικρό",
    MEDIUM: "Μεσαίο",
    LARGE: "Μεγάλο",
};


export type CreateRoomPayload = {
    name: string;
    type: RoomType;
    capacity: number;
    description: string;
    isAvailable: boolean;
    pricePerNight: number;
};

export type RoomType = "SMALL" | "MEDIUM" | "LARGE";

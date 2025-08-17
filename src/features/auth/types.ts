export type DecodedToken = {
    sub?: string;
    exp?: number;
    role?: string;
    [k: string]: unknown;
};

export type LoginRequest = {
    username: string;
    password: string
};



export type LoginResponse = {
    token: string
};


export type MeProfile = {
    id: number;
    username: string;
    isActive: boolean;
    role: string;
    person?: {
        id: number;
        name: string;
        surname: string;
    } | null;
};

export type RegisterPayload = {
    username: string;
    password: string;

    person: {
        name: string;
        surname: string;
        dateOfBirth: string;
        placeOfBirth: string;
        fatherName: string;
        identityNumber: string;
        gender: "MALE" | "FEMALE";
    }
}

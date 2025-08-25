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
    person?: PersonView | null;
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
export type PersonView = {
    id?: number;
    name?: string;
    surname?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    fatherName?: string;
    identityNumber?: string;
    gender?: "MALE" | "FEMALE";
};

export type AuthContextValue = {
    token: string | null;
    decoded: DecodedToken | null;
    isExpired: boolean;
    isAuthenticated: boolean;
    profile: MeProfile | null;
    loading: boolean;
    login: (u: string, p: string) => Promise<void>;
    logout: () => void;
    setProfile: (p: MeProfile | null) => void;
};

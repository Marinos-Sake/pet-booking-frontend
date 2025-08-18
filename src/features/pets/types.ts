export type Pet = {
    id: number;
    name: string;
    petType: "CAT" | "DOG";
    gender: "MALE" | "FEMALE";
    weight: number;
    birthDate: string;
};

export type CreatePetPayload = {
    name: string;
    petType: "CAT" | "DOG";
    gender: "MALE" | "FEMALE";
    weight: number;
    birthDate: string;
};

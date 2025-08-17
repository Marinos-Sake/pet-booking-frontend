import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useAuth } from "../features/auth/useAuth";
import { useMyPets } from "../features/pets/useMyPets";
import { createPetApi } from "../features/pets/api/petsApi";
import type { Pet, CreatePetPayload } from "../features/pets/types";

export default function MyProfile() {
    const { profile, token } = useAuth();
    const { pets: initialPets, loading, error } = useMyPets();


    const [pets, setPets] = useState<Pet[]>([]);
    useEffect(() => { setPets(initialPets); }, [initialPets]);


    const [name, setName] = useState("");
    const [petType, setPetType] = useState<"CAT" | "DOG">("DOG");
    const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
    const [weight, setWeight] = useState<string>("");
    const [birthDate, setBirthDate] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const fullName = useMemo(() => {
        const p = profile?.person as any;
        return p ? `${p.name ?? ""} ${p.surname ?? ""}`.trim() : profile?.username ?? "";
    }, [profile]);

    async function onCreatePet(e: FormEvent) {
        e.preventDefault();
        if (!token) return;

        // μικρο-έλεγχοι client-side ώστε να μη στέλνουμε άκυρα δεδομένα
        const w = Number(weight);
        if (!name.trim() || !birthDate || Number.isNaN(w)) {
            setFormError("Συμπλήρωσε σωστά όλα τα πεδία.");
            return;
        }

        setSubmitting(true);
        setFormError(null);
        try {
            const payload: CreatePetPayload = {
                name: name.trim(),
                petType,
                gender,
                weight: w,
                birthDate, // "YYYY-MM-DD"
            };
            const created = await createPetApi(token, payload);
            setPets((prev) => [created, ...prev]);

            // καθάρισε τη φόρμα
            setName("");
            setPetType("DOG");
            setGender("MALE");
            setWeight("");
            setBirthDate("");
        } catch (err: any) {
            // δείξε καθαρό μήνυμα (αν το backend γυρνά structured error, μπορείς να το κάνεις mapping εδώ)
            setFormError(err?.message || "Αποτυχία δημιουργίας κατοικιδίου");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="mx-auto max-w-4xl px-6 py-10">
            <h1 className="text-2xl md:text-3xl font-bold text-text-ink">Το προφίλ μου</h1>
            <p className="mt-2 text-text-muted">Προσωπικά στοιχεία και κατοικίδια.</p>

            {/* Στοιχεία χρήστη (ΧΩΡΙΣ Ρόλο) */}
            <div className="mt-6 rounded-2xl border border-border-soft bg-white p-4">
                <p><span className="font-semibold">Χρήστης:</span> {profile?.username}</p>
                <p><span className="font-semibold">Ονοματεπώνυμο:</span> {fullName || "—"}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Φόρμα νέου κατοικιδίου */}
                <form onSubmit={onCreatePet} className="rounded-2xl border border-border-soft bg-white p-4 flex flex-col gap-3">
                    <h2 className="text-lg font-semibold">Νέο κατοικίδιο</h2>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-text-muted">Όνομα</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-text-muted">Είδος</label>
                        <select
                            value={petType}
                            onChange={(e) => setPetType(e.target.value as "CAT" | "DOG")}
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        >
                            <option value="DOG">Σκύλος</option>
                            <option value="CAT">Γάτα</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-text-muted">Φύλο</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        >
                            <option value="MALE">Άρρεν</option>
                            <option value="FEMALE">Θήλυ</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-text-muted">Βάρος (kg)</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-text-muted">Ημ. Γέννησης</label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        />
                    </div>

                    {formError && <p className="text-sm text-red-600 whitespace-pre-wrap">{formError}</p>}

                    <button
                        type="submit"
                        disabled={submitting || !name.trim() || !weight || !birthDate}
                        className="rounded-xl bg-primary-brand px-5 py-2 text-white disabled:opacity-50"
                    >
                        {submitting ? "Αποθήκευση…" : "Αποθήκευση"}
                    </button>
                    <p className="text-xs text-text-muted">Το κατοικίδιο συνδέεται με τον συνδεδεμένο λογαριασμό σου.</p>
                </form>

                {/* Λίστα κατοικιδίων */}
                <div className="rounded-2xl border border-border-soft bg-white p-4">
                    <h2 className="text-lg font-semibold">Τα κατοικίδιά μου</h2>
                    {loading && <p className="text-text-muted">Φόρτωση…</p>}
                    {error && <p className="text-red-600">{error}</p>}
                    {!loading && !error && pets.length === 0 && (
                        <p className="text-text-muted mt-2">Δεν έχεις προσθέσει ακόμα κατοικίδιο.</p>
                    )}
                    <ul className="mt-3 flex flex-col gap-2">
                        {pets.map((p) => (
                            <li key={p.id} className="rounded-xl border border-border-soft bg-surface-card px-3 py-2">
                                <p className="font-medium">{p.name}</p>
                                <p className="text-sm text-text-muted">
                                    {p.petType === "CAT" ? "Γάτα" : "Σκύλος"} • {p.gender === "MALE" ? "Άρρεν" : "Θήλυ"} • {p.weight}kg • {p.birthDate}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

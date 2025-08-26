import { useState, type FormEvent } from "react";
import { createPetApi } from "../../pets/api/petsApi";
import type { CreatePetPayload, Pet } from "../../pets/types";

function todayLocalISO(): string {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
}

function isFutureDate(yyyyMmDd: string): boolean {
    if (!yyyyMmDd) return false;
    const picked = new Date(yyyyMmDd + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return picked.getTime() > today.getTime();
}

export default function PetFormCard({
                                        token,
                                        onCreated,
                                    }: { token: string; onCreated: (p: Pet) => void }) {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [petType, setPetType] = useState<"CAT" | "DOG">("DOG");
    const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
    const [weight, setWeight] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const maxBirth = todayLocalISO();

    async function onSubmit(e: FormEvent) {
        e.preventDefault();

        const w = Number(weight);
        if (!name.trim() || !birthDate || Number.isNaN(w)) {
            return setError("Συμπλήρωσε σωστά όλα τα πεδία.");
        }

        if (isFutureDate(birthDate)) {
            return setError("Η ημερομηνία γέννησης δεν μπορεί να είναι στο μέλλον.");
        }

        setSubmitting(true);
        setError(null);
        try {
            const payload: CreatePetPayload = {
                name: name.trim(),
                petType,
                gender,
                weight: w,
                birthDate, // "YYYY-MM-DD"
            };
            const created = await createPetApi(token, payload);
            onCreated(created);

            // reset
            setName("");
            setPetType("DOG");
            setGender("MALE");
            setWeight("");
            setBirthDate("");
            setOpen(false);
        } catch (e: any) {
            setError(e?.message || "Αποτυχία δημιουργίας κατοικιδίου");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="rounded-2xl border border-border-soft bg-white p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Κατοικίδιο</h2>
                <button
                    onClick={() => setOpen((s) => !s)}
                    className="rounded-xl border px-3 py-1 text-sm"
                >
                    {open ? "Ακύρωση" : "Νέο κατοικίδιο"}
                </button>
            </div>

            {open ? (
                <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-text-muted">Όνομα</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-text-muted">Είδος</label>
                            <select
                                value={petType}
                                onChange={(e) => setPetType(e.target.value as any)}
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
                                onChange={(e) => setGender(e.target.value as any)}
                                className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                            >
                                <option value="MALE">Άρρεν</option>
                                <option value="FEMALE">Θήλυ</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
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
                                onChange={(e) => {
                                    setBirthDate(e.target.value);
                                    // προαιρετικό live μήνυμα αν επιλεγεί μέλλον
                                    if (e.target.value && isFutureDate(e.target.value)) {
                                        setError("Η ημερομηνία γέννησης δεν μπορεί να είναι στο μέλλον.");
                                    } else {
                                        setError(null);
                                    }
                                }}
                                required
                                max={maxBirth}
                                className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        disabled={
                            submitting ||
                            !name.trim() ||
                            !weight ||
                            !birthDate ||
                            isFutureDate(birthDate) // ⬅️ extra ασφάλεια
                        }
                        className="rounded-xl bg-primary-brand px-5 py-2 text-white disabled:opacity-50"
                    >
                        {submitting ? "Αποθήκευση…" : "Αποθήκευση"}
                    </button>
                </form>
            ) : (
                <p className="text-xs text-text-muted mt-2">
                    Πάτα “Νέο κατοικίδιο” για να ανοίξει η φόρμα.
                </p>
            )}
        </div>
    );
}

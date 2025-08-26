import { useState, type FormEvent } from "react";
import { useNavigate} from "react-router-dom";
import {registerApi} from "../features/auth/api/authApi.ts";
import {useAuth} from "../features/auth/hooks/UseAuth.tsx";
import type {RegisterPayload} from "../features/auth/types.ts";

export default function Register() {
    const nav = useNavigate();
    const {login} = useAuth();


    // User fields
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //nested personDTO (back-end)
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(""); // input type=date -> "YYYY-MM-DD"
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [identityNumber, setIdentityNumber] = useState("");
    const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);


        try {

            const payload: RegisterPayload = {
                username: username.trim(),
                password,
                person: {
                    name: name.trim(),
                    surname: surname.trim(),
                    dateOfBirth,
                    placeOfBirth: placeOfBirth.trim(),
                    fatherName: fatherName.trim(),
                    identityNumber: identityNumber.trim(),
                    gender,
                },
            };


            await registerApi(payload);

            // Auto-login after create user
            await login(username.trim(), password);

            nav("/", { replace: true });
        } catch (err: any) {

            const msg = typeof err?.message === "string" && err.message.trim().length > 0
                ? err.message
                : "Αποτυχία εγγραφής";
            setError(msg);
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <section className="mx-auto max-w-xl px-6 py-12">
            <h1 className="text-2xl md:text-3xl font-bold text-text-ink mb-6">Δημιουργία λογαριασμού</h1>

            <form onSubmit={onSubmit} className="rounded-2xl border border-border-soft bg-white p-6 flex flex-col gap-4">
                {/* USER */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-text-muted">Όνομα χρήστη</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-text-muted">Κωδικός</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        />
                    </div>
                </div>

                {/* PERSON */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <label className="text-sm text-text-muted">Επώνυμο</label>
                        <input
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-text-muted">Ημερ. Γέννησης</label>
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-text-muted">Τόπος Γέννησης</label>
                        <input
                            value={placeOfBirth}
                            onChange={(e) => setPlaceOfBirth(e.target.value)}
                            required
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-text-muted">Όνομα Πατέρα</label>
                        <input
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                            required
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-text-muted">Αριθμός Ταυτότητας</label>
                        <input
                            value={identityNumber}
                            onChange={(e) => setIdentityNumber(e.target.value)}
                            required
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-text-muted">Φύλο</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
                            required
                            className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                        >
                            <option value="MALE">Άρρεν</option>
                            <option value="FEMALE">Θήλυ</option>
                        </select>
                    </div>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={
                        submitting ||
                        !username || !password || !name || !surname || !dateOfBirth ||
                        !placeOfBirth || !fatherName || !identityNumber || !gender
                    }
                    className="rounded-xl bg-primary-brand px-5 py-2 text-white disabled:opacity-50"
                >
                    {submitting ? "Δημιουργία…" : "Δημιουργία λογαριασμού"}
                </button>
            </form>
        </section>
    );
}


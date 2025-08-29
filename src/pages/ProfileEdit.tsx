import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateMyProfile } from "../features/auth/api/authApi";
import { useAuth } from "../features/auth/hooks/UseAuth.tsx";
import type { MeProfile } from "../features/auth/types";
import {toISO} from "../lib/date.ts";

type PersonForm = {
    name?: string;
    surname?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    fatherName?: string;
    identityNumber?: string;
    gender?: "MALE" | "FEMALE";
};

export default function ProfileEdit() {
    const nav = useNavigate();
    const { token, profile, setProfile, logout } = useAuth();

    if (!profile) return null;



    const [username, setUsername] = useState(profile.username ?? "");
    const [password, setPassword] = useState("");
    const [person, setPerson] = useState<PersonForm>({
        name: profile.person?.name ?? "",
        surname: profile.person?.surname ?? "",
        dateOfBirth: profile.person?.dateOfBirth ?? "",
        placeOfBirth: profile.person?.placeOfBirth ?? "",
        fatherName: profile.person?.fatherName ?? "",
        identityNumber: profile.person?.identityNumber ?? "",
        gender: (profile.person?.gender as any) ?? "MALE",
    });
    const [saving, setSaving] = useState(false);

    const canSubmit = useMemo(() => !!token, [token]);

    function onPersonChange<K extends keyof PersonForm>(k: K, v: PersonForm[K]) {
        setPerson((p) => ({ ...p, [k]: v ?? "" }));
    }


    const todayISO = toISO(new Date());


    if (person.dateOfBirth && person.dateOfBirth > todayISO) {
        setPerson(p => ({ ...p, dateOfBirth: todayISO }));
    }

    function normalizeDate(value?: string) {
        if (!value) return value;
        const m = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (m) {
            const [, dd, mm, yyyy] = m;
            return `${yyyy}-${mm}-${dd}`;
        }
        return value;
    }

    function buildPayload(curr: MeProfile) {
        const payload: any = {};

        if (username !== undefined) {
            if (username.trim() === "") {
                payload.username = "";
            } else if (username !== curr.username) {
                payload.username = username.trim();
            }
        }

        if (password && password.trim().length > 0) payload.password = password.trim();

        const changedPerson: any = {};
        const c = curr.person || {};
        (["name","surname","dateOfBirth","placeOfBirth","fatherName","identityNumber","gender"] as const)
            .forEach((key) => {
                let newVal = (person as any)[key];
                if (key === "dateOfBirth") newVal = normalizeDate(newVal);
                const oldVal = (c as any)[key] ?? "";
                if ((newVal ?? "") !== (oldVal ?? "")) changedPerson[key] = newVal;
            });

        if (Object.keys(changedPerson).length > 0) payload.person = changedPerson;
        return payload;
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!canSubmit) return;

        const payload = buildPayload(profile!);

        try {
            setSaving(true);

            if (Object.keys(payload).length > 0) {
                await updateMyProfile(token!, payload);
                setProfile(null);

                sessionStorage.setItem(
                    "flash_notice",
                    "Οι αλλαγές αποθηκεύτηκαν. Παρακαλώ συνδεθείτε ξανά."
                );

                logout();
                nav("/login", {
                    replace: true
                });

            } else {
                nav("/me");
            }
        } catch (err: any) {
            alert(err?.message ?? "Κάτι πήγε στραβά");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Επεξεργασία προφίλ</h1>

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-sm text-gray-700">Username</span>
                        <input
                            className="mt-1 w-full rounded-lg border px-3 py-2"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                            autoComplete="username"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-gray-700">Νέος κωδικός (προαιρετικό)</span>
                        <input
                            className="mt-1 w-full rounded-lg border px-3 py-2"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••"
                            autoComplete="new-password"
                        />
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-sm">Όνομα</span>
                        <input
                            className="mt-1 w-full rounded-lg border px-3 py-2"
                            value={person.name ?? ""}
                            onChange={(e) => onPersonChange("name", e.target.value)}
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm">Επώνυμο</span>
                        <input
                            className="mt-1 w-full rounded-lg border px-3 py-2"
                            value={person.surname ?? ""}
                            onChange={(e) => onPersonChange("surname", e.target.value)}
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm">Ημ/νία γέννησης</span>
                        <input
                            className="mt-1 w-full rounded-lg border px-3 py-2"
                            type="date"
                            value={person.dateOfBirth ?? ""}
                            onChange={(e) => onPersonChange("dateOfBirth", e.target.value)}
                            max={todayISO}
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm">Τόπος γέννησης</span>
                        <input
                            className="mt-1 w-full rounded-lg border px-3 py-2"
                            value={person.placeOfBirth ?? ""}
                            onChange={(e) => onPersonChange("placeOfBirth", e.target.value)}
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm">Όνομα πατέρα</span>
                        <input
                            className="mt-1 w-full rounded-lg border px-3 py-2"
                            value={person.fatherName ?? ""}
                            onChange={(e) => onPersonChange("fatherName", e.target.value)}
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm">Αριθμός ταυτότητας</span>
                        <input
                            className="mt-1 w-full rounded-lg border px-3 py-2 uppercase"
                            value={person.identityNumber ?? ""}
                            onChange={(e) =>
                                onPersonChange("identityNumber", e.target.value.toUpperCase())
                            }
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm">Φύλο</span>
                        <select
                            className="mt-1 w-full rounded-lg border px-3 py-2"
                            value={person.gender ?? "MALE"}
                            onChange={(e) => onPersonChange("gender", e.target.value as any)}
                        >
                            <option value="MALE">Άνδρας</option>
                            <option value="FEMALE">Γυναίκα</option>
                        </select>
                    </label>
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={!canSubmit || saving}
                        className="rounded-xl px-4 py-2 bg-primary-brand text-white disabled:opacity-60"
                    >
                        {saving ? "Αποθήκευση..." : "Αποθήκευση"}
                    </button>
                    <button type="button" onClick={() => nav("/me")} className="rounded-xl px-4 py-2 border">
                        Άκυρο
                    </button>
                </div>
            </form>
        </div>
    );
}

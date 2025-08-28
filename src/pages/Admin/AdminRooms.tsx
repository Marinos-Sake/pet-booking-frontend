import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "../../features/auth/hooks/UseAuth.tsx";
import type { Room, RoomType, CreateRoomPayload } from "../../features/room/types.ts";
import { roomTypeLabel } from "../../features/room/types.ts";
import {createRoom, deleteRoom, getRooms, updateRoomAvailability} from "../../features/admin/api/roomsApi.ts";

const ROOM_TYPES: RoomType[] = ["SMALL", "MEDIUM", "LARGE"];

export default function AdminRooms() {
    const { token } = useAuth();

    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const [form, setForm] = useState<CreateRoomPayload>({
        name: "",
        type: "SMALL",
        capacity: 1,
        description: "",
        isAvailable: true,
        pricePerNight: 1.0,
    });

    useEffect(() => {
        if (!token) return;
        (async () => {
            try {
                setRooms(await getRooms(token));
            } catch (e: any) {
                setErr(e.message || "Αποτυχία ανάκτησης δωματίων");
            } finally {
                setLoading(false);
            }
        })();
    }, [token]);

    async function onCreate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!token) return;

        try {
            const created = await createRoom(token, form);
            setRooms((r) => [created, ...r]);
            setForm({
                name: "",
                type: "SMALL",
                capacity: 1,
                description: "",
                isAvailable: true,
                pricePerNight: 1.0,
            });
            setErr("");
        } catch (e: any) {
            setErr(e.message || "Αποτυχία δημιουργίας δωματίου");
        }
    }

    async function onDelete(id: number) {
        if (!token) return;
        if (!confirm("Σίγουρα θέλεις να διαγράψεις το δωμάτιο;")) return;
        try {
            await deleteRoom(token, id);
            setRooms((prev) => prev.filter((r) => r.id !== id));
        } catch (e: any) {
            setErr(e.message || "Αποτυχία διαγραφής");
        }
    }

    async function onToggleAvailability(room: Room) {
        if (!token) return;
        const next = !room.isAvailable;
        try {
            await updateRoomAvailability(token, room.id, next);
            setRooms((prev) => prev.map((r) => (r.id === room.id ? { ...r, isAvailable: next } : r)));
        } catch (e: any) {
            setErr(e.message || "Αποτυχία ενημέρωσης διαθεσιμότητας");
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-text-ink">Δωμάτια (ADMIN)</h1>

            <form
                onSubmit={onCreate}
                className="mt-4 grid gap-3 rounded-2xl border border-border-soft bg-surface-card p-4 sm:grid-cols-6"
            >
                <div className="sm:col-span-2">
                    <label className="text-sm text-text-muted">Όνομα *</label>
                    <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-border-soft px-3 py-2"
                        placeholder="Executive Dog Room"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm text-text-muted">Τύπος *</label>
                    <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value as RoomType })}
                        className="mt-1 w-full rounded-xl border border-border-soft px-3 py-2"
                    >
                        {ROOM_TYPES.map((t) => (
                            <option key={t} value={t}>
                                {roomTypeLabel[t]}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-sm text-text-muted">Χωρητικότητα *</label>
                    <input
                        type="number"
                        min={1}
                        value={form.capacity}
                        onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                        className="mt-1 w-full rounded-xl border border-border-soft px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm text-text-muted">Τιμή/νύχτα (€) *</label>
                    <input
                        type="number"
                        min={1}
                        step="0.01"
                        value={form.pricePerNight}
                        onChange={(e) => setForm({ ...form, pricePerNight: parseFloat(e.target.value) })}
                        className="mt-1 w-full rounded-xl border border-border-soft px-3 py-2"
                        required
                    />
                </div>

                <div className="sm:col-span-6">
                    <label className="text-sm text-text-muted">Περιγραφή *</label>
                    <textarea
                        rows={3}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-border-soft px-3 py-2"
                        placeholder="Luxury room with dog bed and balcony view"
                        required
                    />
                </div>

                <label className="flex items-center gap-2 sm:col-span-3">
                    <input
                        type="checkbox"
                        checked={form.isAvailable}
                        onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                        className="h-4 w-4 rounded border-border-soft"
                    />
                    <span className="text-sm text-text-muted">Διαθέσιμο</span>
                </label>

                <div className="sm:col-span-3 flex items-end justify-end">
                    <button
                        type="submit"
                        className="rounded-xl bg-primary-brand px-5 py-2.5 text-white shadow-sm hover:opacity-95"
                    >
                        Προσθήκη
                    </button>
                </div>

                {err && (
                    <div className="sm:col-span-6 rounded-lg border border-secondary-accent/30 bg-secondary-accent/10 px-3 py-2 text-secondary-accent">
                        {err}
                    </div>
                )}
            </form>

            {/* Table */}
            <div className="mt-4 overflow-auto rounded-2xl border border-border-soft bg-surface-card">
                <table className="w-full text-sm">
                    <thead className="text-left text-text-muted">
                    <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Όνομα</th>
                        <th className="p-3">Τύπος</th>
                        <th className="p-3">Χωρ.</th>
                        <th className="p-3">Τιμή/νύχτα</th>
                        <th className="p-3">Διαθέσιμο</th>
                        <th className="p-3">Περιγραφή</th>
                        <th className="p-3">Ενέργειες</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td className="p-3" colSpan={8}>
                                Φόρτωση…
                            </td>
                        </tr>
                    ) : (
                        rooms.map((r) => (
                            <tr key={r.id} className="border-t border-border-soft">
                                <td className="p-3">{r.id}</td>
                                <td className="p-3">{r.name}</td>
                                <td className="p-3">{roomTypeLabel[r.type as RoomType] ?? r.type}</td>
                                <td className="p-3">{r.capacity}</td>
                                <td className="p-3">{Number(r.pricePerNight).toFixed(2)}€</td>
                                <td className="p-3">
                    <span
                        className={`rounded-full px-2 py-0.5 text-xs border ${
                            r.isAvailable ? "border-green-500 text-green-700" : ""
                        }`}
                    >
                      {r.isAvailable ? "Ναι" : "Όχι"}
                    </span>
                                </td>
                                <td className="p-3">{r.description ?? "—"}</td>
                                <td className="p-3">
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => onToggleAvailability(r)}
                                            className="rounded-lg border px-3 py-1 text-sm hover:bg-primary-brand/5"
                                            title="Εναλλαγή διαθεσιμότητας"
                                        >
                                            {r.isAvailable ? "Μη διαθέσιμο" : "Διαθέσιμο"}
                                        </button>
                                        <button
                                            onClick={() => onDelete(r.id)}
                                            className="rounded-lg bg-red-600 text-white px-3 py-1 text-sm hover:opacity-90"
                                            title="Διαγραφή"
                                        >
                                            Διαγραφή
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

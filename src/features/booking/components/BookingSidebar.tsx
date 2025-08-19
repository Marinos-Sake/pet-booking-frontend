import type { Room } from "../../room/types";
import type { QuoteResponse } from "../types";
import { useMyPets } from "../../pets/useMyPets";
import type { Pet } from "../../pets/types";

type Props = {
    rooms: Room[];
    selectedPetId: number | "";
    setSelectedPetId: (v: number | "") => void;
    selectedRoomId: number | "";
    setSelectedRoomId: (v: number | "") => void;
    checkInISO: string;
    checkOutISO: string;
    nights: number;
    canSubmit: boolean;
    onSubmit: () => Promise<void>;
    quote?: QuoteResponse | null;
    quoteLoading: boolean;
};

export default function BookingSidebar({
                                           rooms,
                                           selectedPetId,
                                           setSelectedPetId,
                                           selectedRoomId,
                                           setSelectedRoomId,
                                           checkInISO,
                                           checkOutISO,
                                           nights,
                                           canSubmit,
                                           onSubmit,
                                           quote,
                                           quoteLoading,
                                       }: Props) {
    const { pets, loading, error } = useMyPets();

    function money(v: unknown) {
        const n = typeof v === "number" ? v : Number(v);
        if (Number.isNaN(n)) return "—";
        return n.toFixed(2) + "€";
    }

    return (
        <div className="rounded-2xl border border-border-soft bg-white p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm text-text-muted">Κατοικίδιο</label>
                <select
                    value={selectedPetId}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setSelectedPetId(e.target.value ? Number(e.target.value) : "")
                    }
                    disabled={loading}
                    className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                >
                    <option value="">— επίλεξε κατοικίδιο —</option>
                    {pets.map((p: Pet) => (
                        <option key={p.id} value={p.id}>
                            {p.name} • {p.petType === "CAT" ? "Γάτα" : "Σκύλος"}
                        </option>
                    ))}
                </select>
                {error && <p className="text-red-500">{error}</p>}
            </div>

            {/* Δωμάτιο */}
            <div className="flex flex-col gap-1">
                <label className="text-sm text-text-muted">Δωμάτιο</label>
                <select
                    value={selectedRoomId}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setSelectedRoomId(e.target.value ? Number(e.target.value) : "")
                    }
                    className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                >
                    <option value="">— επίλεξε δωμάτιο —</option>
                    {rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.name} • {r.type} • {money(r.pricePerNight)}
                        </option>
                    ))}
                </select>
                <p className="text-xs text-text-muted">
                    Φορτώνουμε μόνο τα διαθέσιμα για τις ημερομηνίες σου.
                </p>
            </div>

            {/* Περίληψη */}
            <div className="mt-2 rounded-xl bg-surface-card border border-border-soft p-3">
                <p>
                    <span className="font-semibold">Check-in:</span> {checkInISO || "—"}
                </p>
                <p>
                    <span className="font-semibold">Check-out:</span> {checkOutISO || "—"}
                </p>
                <p>
                    <span className="font-semibold">Διανυκτερεύσεις:</span> {nights}
                </p>

                <div className="mt-2">
                    <p>
                        <span className="font-semibold">Τιμή:</span>{" "}
                        {quoteLoading ? "υπολογίζεται…" : quote ? `${quote.totalPrice.toFixed(2)}€` : "—"}
                    </p>
                    <p className="text-xs text-text-muted">
                    </p>
                </div>
            </div>

            <button
                disabled={!canSubmit}
                onClick={onSubmit}
                className="mt-2 rounded-xl bg-primary-brand px-5 py-2 text-white disabled:opacity-50"
            >
                Ολοκλήρωση κράτησης
            </button>
        </div>
    );
}

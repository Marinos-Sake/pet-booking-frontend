import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useAuth } from "../features/auth/useAuth";
import { useMyPets } from "../features/pets/useMyPets";
import { createPetApi } from "../features/pets/api/petsApi";
import type { Pet, CreatePetPayload } from "../features/pets/types";
import { getMyBookings } from "../features/booking/api/bookingApi";
import type { BookingListItem } from "../features/booking/types";
import { getMyPayments, createPayment } from "../features/payments/api/paymentsApi";
import type { PaymentRead } from "../features/payments/types";

function Tabs({
                  tabs,
                  active,
                  onChange,
              }: {
    tabs: string[];
    active: string;
    onChange: (t: string) => void;
}) {
    return (
        <div className="flex gap-2 border-b border-border-soft">
            {tabs.map((t) => (
                <button
                    key={t}
                    onClick={() => onChange(t)}
                    className={`px-3 py-2 text-sm rounded-t-lg ${
                        t === active
                            ? "bg-white border border-b-transparent border-border-soft font-medium"
                            : "text-text-muted hover:text-text-ink"
                    }`}
                >
                    {t}
                </button>
            ))}
        </div>
    );
}

export default function MyProfile() {
    const { profile, token } = useAuth();

    const { pets: initialPets, loading: petsLoading, error: petsError } = useMyPets();
    const [pets, setPets] = useState<Pet[]>([]);
    useEffect(() => { setPets(initialPets); }, [initialPets]);

    const [showNewPet, setShowNewPet] = useState(false);
    const [name, setName] = useState("");
    const [petType, setPetType] = useState<"CAT" | "DOG">("DOG");
    const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
    const [weight, setWeight] = useState<string>("");
    const [birthDate, setBirthDate] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const [bookings, setBookings] = useState<BookingListItem[]>([]);
    const [bookingsLoading, setBookingsLoading] = useState(false);
    const [bookingsError, setBookingsError] = useState<string | null>(null);

    const [payments, setPayments] = useState<PaymentRead[]>([]);
    const [paymentsLoading, setPaymentsLoading] = useState(false);
    const [paymentsError, setPaymentsError] = useState<string | null>(null);

    const [payingBookingId, setPayingBookingId] = useState<number | null>(null);
    const [payAmount, setPayAmount] = useState<string>("");
    const [paySubmitting, setPaySubmitting] = useState(false);
    const [payError, setPayError] = useState<string | null>(null);


    const [activeTab, setActiveTab] = useState<"Κρατήσεις" | "Πληρωμές">("Κρατήσεις");


    useEffect(() => {
        if (!token) return;
        (async () => {
            setBookingsLoading(true);
            setBookingsError(null);
            try {
                const data = await getMyBookings(token);
                setBookings(data);
            } catch (e: any) {
                setBookingsError(e?.message || "Αποτυχία ανάκτησης κρατήσεων");
            } finally {
                setBookingsLoading(false);
            }
        })();
    }, [token]);

    useEffect(() => {
        if (!token) return;
        (async () => {
            setPaymentsLoading(true);
            setPaymentsError(null);
            try {
                const data = await getMyPayments(token);
                setPayments(data);
            } catch (e: any) {
                setPaymentsError(e?.message || "Αποτυχία ανάκτησης πληρωμών");
            } finally {
                setPaymentsLoading(false);
            }
        })();
    }, [token]);

    const fullName = useMemo(() => {
        const p = profile?.person as any;
        return p ? `${p.name ?? ""} ${p.surname ?? ""}`.trim() : profile?.username ?? "";
    }, [profile]);

    const paidByBooking = useMemo(() => {
        const map = new Map<number, number>();
        for (const p of payments) {
            const key = p.bookingId;
            const prev = map.get(key) ?? 0;
            map.set(key, prev + Number(p.amount || 0));
        }
        return map;
    }, [payments]);

    const remainingFor = (b: BookingListItem) => {
        const paid = paidByBooking.get(b.id) ?? 0;
        const total = Number(b.totalPrice || 0);
        return Math.max(0, total - paid);
    };

    async function onCreatePet(e: FormEvent) {
        e.preventDefault();
        if (!token) return;

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
                birthDate,
            };
            const created = await createPetApi(token, payload);
            setPets((prev) => [created, ...prev]);

            setName("");
            setPetType("DOG");
            setGender("MALE");
            setWeight("");
            setBirthDate("");
            setShowNewPet(false);
        } catch (err: any) {
            setFormError(err?.message || "Αποτυχία δημιουργίας κατοικιδίου");
        } finally {
            setSubmitting(false);
        }
    }

    function startPay(bookingId: number, suggestedAmount: number) {
        setPayingBookingId(bookingId);
        setPayAmount(suggestedAmount > 0 ? suggestedAmount.toFixed(2) : "");
        setPayError(null);
    }
    function cancelPay() {
        setPayingBookingId(null);
        setPayAmount("");
        setPayError(null);
    }
    async function confirmPay() {
        if (!token || !payingBookingId) return;
        const amt = Number(payAmount);
        if (!amt || amt <= 0) {
            setPayError("Το ποσό πρέπει να είναι θετικό.");
            return;
        }
        setPaySubmitting(true);
        setPayError(null);
        try {
            await createPayment(token, { bookingId: payingBookingId, amount: amt });
            // refresh payments
            const data = await getMyPayments(token);
            setPayments(data);
            cancelPay();
        } catch (e: any) {
            setPayError(e?.message || "Αποτυχία πληρωμής");
        } finally {
            setPaySubmitting(false);
        }
    }

    const money = (v: unknown) => {
        const n = typeof v === "number" ? v : Number(v);
        if (Number.isNaN(n)) return "—";
        return n.toFixed(2) + "€";
    };

    return (
        <section className="mx-auto max-w-7xl px-4 md:px-6 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-text-ink">Το προφίλ μου</h1>
            <p className="mt-1 text-text-muted">Προσωπικά στοιχεία, κατοικίδια & πληρωμές—όλα σε μία μαζεμένη προβολή.</p>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-border-soft bg-white p-4">
                    <p><span className="font-semibold">Χρήστης:</span> {profile?.username}</p>
                    <p><span className="font-semibold">Ονοματεπώνυμο:</span> {fullName || "—"}</p>
                </div>

                <div className="rounded-2xl border border-border-soft bg-white p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Κατοικίδιο</h2>
                        <button
                            onClick={() => setShowNewPet((s) => !s)}
                            className="rounded-xl border px-3 py-1 text-sm"
                        >
                            {showNewPet ? "Ακύρωση" : "Νέο κατοικίδιο"}
                        </button>
                    </div>

                    {showNewPet && (
                        <form onSubmit={onCreatePet} className="mt-3 flex flex-col gap-3">
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
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        required
                                        className="rounded-xl border border-border-soft bg-surface-card px-3 py-2"
                                    />
                                </div>
                            </div>

                            {formError && <p className="text-sm text-red-600 whitespace-pre-wrap">{formError}</p>}

                            <button
                                type="submit"
                                disabled={submitting || !name.trim() || !weight || !birthDate}
                                className="rounded-xl bg-primary-brand px-5 py-2 text-white disabled:opacity-50"
                            >
                                {submitting ? "Αποθήκευση…" : "Αποθήκευση"}
                            </button>
                            <p className="text-xs text-text-muted">Το κατοικίδιο συνδέεται με τον λογαριασμό σου.</p>
                        </form>
                    )}

                    {!showNewPet && (
                        <p className="text-xs text-text-muted mt-2">
                            Πάτα “Νέο κατοικίδιο” για να ανοίξει η φόρμα χωρίς να φύγεις από τη σελίδα.
                        </p>
                    )}
                </div>

                <div className="rounded-2xl border border-border-soft bg-white p-4 lg:sticky lg:top-6 h-fit">
                    <h2 className="text-lg font-semibold">Τα κατοικίδιά μου</h2>
                    {petsLoading && <p className="text-text-muted">Φόρτωση…</p>}
                    {petsError && <p className="text-red-600">{petsError}</p>}
                    {!petsLoading && !petsError && pets.length === 0 && (
                        <p className="text-text-muted mt-2">Δεν έχεις προσθέσει ακόμα κατοικίδιο.</p>
                    )}
                    <ul className="mt-3 flex flex-col gap-2 max-h-72 overflow-auto pr-1">
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

            <div className="mt-6 rounded-2xl border border-border-soft bg-white">
                <Tabs tabs={["Κρατήσεις", "Πληρωμές"]} active={activeTab} onChange={(t) => setActiveTab(t as any)} />

                <div className="p-4">
                    {activeTab === "Κρατήσεις" && (
                        <>
                            {bookingsLoading && <p className="text-text-muted">Φόρτωση…</p>}
                            {bookingsError && <p className="text-red-600">{bookingsError}</p>}
                            {!bookingsLoading && !bookingsError && bookings.length === 0 && (
                                <p className="text-text-muted">Δεν έχεις κάνει ακόμη κράτηση.</p>
                            )}
                            <ul className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {bookings.map((b) => {
                                    const remaining = remainingFor(b);
                                    const isPaying = payingBookingId === b.id;
                                    return (
                                        <li key={b.id} className="rounded-xl border border-border-soft bg-surface-card p-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p className="font-medium">{b.roomName ?? "Δωμάτιο"} • {b.petName ?? "Κατοικίδιο"}</p>
                                                    <p className="text-sm text-text-muted">{b.checkInDate} → {b.checkOutDate}</p>
                                                    <p className="text-sm">
                                                        Σύνολο: <span className="font-semibold">{money(b.totalPrice)}</span>
                                                        {"  "}• Πληρώθηκε:{" "}
                                                        <span className="font-semibold">{money((paidByBooking.get(b.id) ?? 0))}</span>
                                                        {"  "}• Υπόλοιπο:{" "}
                                                        <span className="font-semibold">{money(remaining)}</span>
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs rounded-full px-2 py-0.5 border">{b.status}</span>
                                                    <div className="mt-2">
                                                        {remaining > 0 ? (
                                                            !isPaying ? (
                                                                <button
                                                                    className="rounded-lg bg-primary-brand text-white px-3 py-1 text-sm"
                                                                    onClick={() => startPay(b.id, remaining)}
                                                                >
                                                                    Πληρωμή
                                                                </button>
                                                            ) : (
                                                                <div className="flex items-center gap-2">
                                                                    <input
                                                                        type="number"
                                                                        min="0.01"
                                                                        step="0.01"
                                                                        value={payAmount}
                                                                        onChange={(e) => setPayAmount(e.target.value)}
                                                                        className="w-28 rounded-lg border border-border-soft px-2 py-1 text-sm"
                                                                        placeholder="Ποσό"
                                                                    />
                                                                    <button
                                                                        disabled={paySubmitting}
                                                                        onClick={confirmPay}
                                                                        className="rounded-lg bg-primary-brand text-white px-3 py-1 text-sm disabled:opacity-50"
                                                                    >
                                                                        {paySubmitting ? "Επεξεργασία…" : "Πληρωμή τώρα"}
                                                                    </button>
                                                                    <button
                                                                        disabled={paySubmitting}
                                                                        onClick={cancelPay}
                                                                        className="rounded-lg border px-3 py-1 text-sm"
                                                                    >
                                                                        Άκυρο
                                                                    </button>
                                                                </div>
                                                            )
                                                        ) : (
                                                            <span className="text-xs text-green-700">Εξοφλημένη</span>
                                                        )}
                                                    </div>
                                                    {isPaying && payError && (
                                                        <p className="text-red-600 text-xs mt-1">{payError}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}

                    {activeTab === "Πληρωμές" && (
                        <>
                            {paymentsLoading && <p className="text-text-muted">Φόρτωση…</p>}
                            {paymentsError && <p className="text-red-600">{paymentsError}</p>}
                            {!paymentsLoading && !paymentsError && payments.length === 0 && (
                                <p className="text-text-muted">Δεν υπάρχουν πληρωμές ακόμη.</p>
                            )}
                            <ul className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {payments.map((p) => (
                                    <li key={p.id} className="rounded-xl border border-border-soft bg-surface-card p-3">
                                        <p className="font-medium">{p.roomName ?? "Δωμάτιο"} • {p.petName ?? "Κατοικίδιο"}</p>
                                        <p className="text-sm text-text-muted">{p.paymentDate} • Booking #{p.bookingId}</p>
                                        <p className="text-sm">Ποσό: <span className="font-semibold">{money(p.amount)}</span></p>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

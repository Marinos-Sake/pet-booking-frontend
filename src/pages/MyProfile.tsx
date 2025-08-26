import { useEffect, useMemo, useState, useCallback } from "react";
import { useAuth } from "../features/auth/hooks/UseAuth.tsx";
import { useMyPets } from "../features/pets/useMyPets.ts";
import { getMyBookings } from "../features/booking/api/bookingApi";
import { getMyPayments } from "../features/payments/api/paymentsApi";
import type { Pet } from "../features/pets/types";
import type { BookingListItem } from "../features/booking/types";
import type { PaymentRead } from "../features/payments/types";

import ProfileHeader from "../features/MyProfile/components/ProfileHeader";
import PetFormCard from "../features/MyProfile/components/PetFormCard";
import PetsCard from "../features/MyProfile/components/PetsCard";
import Tabs from "../features/MyProfile/components/Tabs";
import BookingsCard from "../features/MyProfile/components/BookingCard";
import PaymentsCard from "../features/MyProfile/components/PaymentsCard";
import {Link} from "react-router-dom";

export default function MyProfilePage() {
    const { profile, token } = useAuth();

    const fullName = useMemo(() => {
        const n = (profile?.person?.name || "") + " " + (profile?.person?.surname || "");
        return n.trim() || profile?.username || "";
    }, [profile]);

    const { pets: initialPets, loading: petsLoading, error: petsError } = useMyPets();
    const [pets, setPets] = useState<Pet[]>([]);
    useEffect(() => setPets(initialPets), [initialPets]);

    const [bookings, setBookings] = useState<BookingListItem[]>([]);
    const [payments, setPayments] = useState<PaymentRead[]>([]);
    const [bookingsLoading, setBookingsLoading] = useState(false);
    const [bookingsError, setBookingsError] = useState<string | null>(null);
    const [paymentsLoading, setPaymentsLoading] = useState(false);
    const [paymentsError, setPaymentsError] = useState<string | null>(null);

    const reloadPayments = useCallback(async () => {
        if (!token) return;
        try {
            setPaymentsLoading(true);
            setPaymentsError(null);
            setPayments(await getMyPayments(token));
        } catch (e: any) {
            setPaymentsError(e?.message || "Αποτυχία ανάκτησης πληρωμών");
        } finally {
            setPaymentsLoading(false);
        }
    }, [token]);

    const reloadBookingsPayments = useCallback(async () => {
        if (!token) return;
        setBookingsLoading(true);
        setPaymentsLoading(true);
        setBookingsError(null);
        setPaymentsError(null);
        try {
            const [b, p] = await Promise.all([getMyBookings(token), getMyPayments(token)]);
            setBookings(b);
            setPayments(p);
        } catch {
            setBookingsError("Αποτυχία ανάκτησης κρατήσεων");
            setPaymentsError("Αποτυχία ανάκτησης πληρωμών");
        } finally {
            setBookingsLoading(false);
            setPaymentsLoading(false);
        }
    }, [token]);

    useEffect(() => { reloadBookingsPayments(); }, [reloadBookingsPayments]);

    const [activeTab, setActiveTab] = useState<"Κρατήσεις" | "Πληρωμές">("Κρατήσεις");

    return (
        <section className="mx-auto max-w-7xl px-4 md:px-6 py-8">
            <ProfileHeader isAdmin={profile?.role === "ADMIN"} />

            {token && (
                <div className="mt-1">
                    <Link
                        to="/edit"
                        className="text-sm underline underline-offset-4 text-gray-600 hover:text-primary-brand"
                    >
                        Αλλαγή Προσωπικών Στοιχείων
                    </Link>
                </div>
            )}

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-border-soft bg-white p-4">
                    <p><span className="font-semibold">Χρήστης:</span> {profile?.username}</p>
                    <p><span className="font-semibold">Ονοματεπώνυμο:</span> {fullName || "-"}</p>
                </div>

                {token && <PetFormCard token={token} onCreated={(p) => setPets((prev) => [p, ...prev])} />}

                <PetsCard pets={pets} loading={petsLoading} error={petsError} />
            </div>



            <div className="mt-6 rounded-2xl border border-border-soft bg-white">
                <Tabs tabs={["Κρατήσεις", "Πληρωμές"]} active={activeTab} onChange={(t) => setActiveTab(t as any)} />
                <div className="p-4">
                    {activeTab === "Κρατήσεις" ? (
                        <BookingsCard
                            token={token!}
                            bookings={bookings}
                            payments={payments}
                            loading={bookingsLoading}
                            error={bookingsError}
                            onPaymentsReload={reloadPayments}
                        />
                    ) : (
                        <PaymentsCard payments={payments} loading={paymentsLoading} error={paymentsError} />
                    )}
                </div>
            </div>
        </section>


    );
}

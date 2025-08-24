import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";

import BookingCalendar from "../features/booking/components/BookingCalendar";
import BookingSidebar from "../features/booking/components/BookingSidebar";
import { createBooking } from "../features/booking/api/bookingApi";
import { getAllRooms } from "../features/room/api/roomApi";
import { useBookingQuote } from "../features/booking/hooks/useBookingQuote";
import type { Room } from "../features/room/types";
import { calcNights, toISO } from "../lib/date.ts";
import { useAuth } from "../features/auth/hooks/UseAuth.tsx";

export default function Booking() {
    const { token } = useAuth(); // ProtectedRoute εγγυάται ότι υπάρχει

    const [range, setRange] = useState<DateRange | undefined>();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedPetId, setSelectedPetId] = useState<number | "">("");
    const [selectedRoomId, setSelectedRoomId] = useState<number | "">("");

    const checkInISO = toISO(range?.from);
    const checkOutISO = toISO(range?.to);
    const nights = useMemo(() => calcNights(range?.from, range?.to), [range]);

    const canSubmit =
        !!checkInISO && !!checkOutISO && nights > 0 && !!selectedPetId && !!selectedRoomId;

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const rs = await getAllRooms();
                if (!cancelled) {
                    setRooms(rs);
                    if (selectedRoomId && !rs.some((r) => r.id === selectedRoomId)) {
                        setSelectedRoomId("");
                    }
                }
            } catch {
                if (!cancelled) setRooms([]);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const selectedRoomIdNum = typeof selectedRoomId === "number" ? selectedRoomId : undefined;

    const { quote, quoteLoading } = useBookingQuote({
        checkInDate: checkInISO,
        checkOutDate: checkOutISO,
        roomId: selectedRoomIdNum,
        enabled: nights > 0 && !!selectedRoomIdNum,
    });

    async function onSubmit() {
        if (!canSubmit || !token) return;
        try {
            await createBooking(token, {
                checkInDate: checkInISO!,
                checkOutDate: checkOutISO!,
                petId: Number(selectedPetId),
                roomId: Number(selectedRoomId),
            });
            alert("Η κράτηση δημιουργήθηκε επιτυχώς!");
            setRange(undefined);
            setSelectedPetId("");
            setSelectedRoomId("");
        } catch (e: any) {
            alert(e.message);
        }
    }

    return (
        <section className="mx-auto max-w-4xl px-6 py-10">
            <h1 className="text-2xl md:text-3xl font-bold text-text-ink">Κάνε Κράτηση</h1>
            <p className="mt-2 text-text-muted">Διάλεξε ημερομηνίες και συμπλήρωσε τα στοιχεία σου.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <BookingCalendar range={range} setRange={setRange} />
                <BookingSidebar
                    rooms={rooms}
                    selectedPetId={selectedPetId}
                    setSelectedPetId={setSelectedPetId}
                    selectedRoomId={selectedRoomId}
                    setSelectedRoomId={setSelectedRoomId}
                    checkInISO={checkInISO}
                    checkOutISO={checkOutISO}
                    nights={nights}
                    canSubmit={canSubmit}
                    onSubmit={onSubmit}
                    quote={quote}
                    quoteLoading={quoteLoading}
                />
            </div>
        </section>
    );
}

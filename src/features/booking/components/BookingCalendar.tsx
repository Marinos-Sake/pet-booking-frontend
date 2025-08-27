import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { startOfMonth, endOfMonth } from "date-fns";
import { addDays, startOfToday } from "../../../lib/date";
import { getRoomCalendar } from "../../room/api/roomApi";

type Props = {
    range: DateRange | undefined;
    setRange: (r: DateRange | undefined) => void;
    selectedRoomId?: number | "";
    token?: string | null; //
};

export default function BookingCalendar({ range, setRange, selectedRoomId, token }: Props) {
    const [month, setMonth] = useState<Date>(new Date());
    const [disabledRanges, setDisabledRanges] = useState<{ from: Date; to: Date }[]>([]);
    const [loading, setLoading] = useState(false);

    const from = useMemo(() => startOfMonth(month), [month]);
    const to = useMemo(() => endOfMonth(month), [month]);

    useEffect(() => {
        setRange(undefined);
        setDisabledRanges([]);
    }, [selectedRoomId]);

    useEffect(() => {
        if (!selectedRoomId || typeof selectedRoomId !== "number") return;

        const load = async () => {
            setLoading(true);
            try {
                const data = await getRoomCalendar(
                    selectedRoomId,
                    from.toISOString().slice(0, 10),
                    to.toISOString().slice(0, 10),
                    token ?? undefined
                );
                setDisabledRanges(data.map(r => ({ from: new Date(r.from), to: new Date(r.to) })));
            } catch (e) {
                console.error("Error: Failed to load room availability", e);
                setDisabledRanges([]);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [selectedRoomId, from.getTime(), to.getTime(), token]);

    return (
        <div className="rounded-2xl border border-border-soft bg-white p-4">
            {loading && <p className="text-sm opacity-70">Φόρτωση διαθεσιμότητας…</p>}
            <DayPicker
                mode="range"
                month={month}
                onMonthChange={setMonth}
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
                pagedNavigation
                disabled={[
                    { before: addDays(startOfToday(), 1) },
                    ...disabledRanges
                ]}
            />
        </div>
    );
}

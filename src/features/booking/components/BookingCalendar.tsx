import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { startOfToday } from "../../../utils/date.ts";

export default function BookingCalendar({
                                            range,
                                            setRange,
                                        }: {
    range: DateRange | undefined;
    setRange: (r: DateRange | undefined) => void;
}) {
    return (
        <div className="rounded-2xl border border-border-soft bg-white p-4">
            <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
                pagedNavigation
                disabled={{ before: startOfToday() }}
            />
        </div>
    );
}

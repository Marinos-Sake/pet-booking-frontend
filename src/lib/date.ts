export function startOfToday(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}

export function toISO(d?: Date) {
    if (!d) return "";
    const tzOff = d.getTimezoneOffset();
    const local = new Date(d.getTime() - tzOff * 60_000);
    return local.toISOString().slice(0, 10);
}

export function calcNights(from?: Date, to?: Date) {
    if (!from || !to) return 0;
    const ms = to.getTime() - from.getTime();
    const diff = Math.ceil(ms / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
}

export function addDays(date: Date, days: number): Date {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

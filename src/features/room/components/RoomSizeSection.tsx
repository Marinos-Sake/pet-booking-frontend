import RoomCard from "./RoomCard";

type Item = { image: string; title: string; subtitle?: string; desc?: string };

export default function RoomSizeSection({
                                            label,
                                            items,
                                        }: {
    label: string;
    items: Item[];
}) {
    return (
        <section className="mt-10">
            <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-bold text-text-ink">{label}</h2>
                <span className="text-sm text-text-muted">επιλέξτε δωμάτιο</span>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((it, i) => (
                    <RoomCard key={i} {...it} />
                ))}
            </div>
        </section>
    );
}

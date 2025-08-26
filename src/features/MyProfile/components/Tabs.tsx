type Props = { tabs: string[]; active: string; onChange: (t: string) => void };
export default function Tabs({ tabs, active, onChange }: Props) {
    return (
        <div className="flex gap-2 border-b border-border-soft">
            {tabs.map(t => (
                <button
                    key={t}
                    onClick={() => onChange(t)}
                    className={`px-3 py-2 text-sm rounded-t-lg ${t === active ? "bg-white border border-b-transparent border-border-soft font-medium" : "text-text-muted hover:text-text-ink"}`}
                >
                    {t}
                </button>
            ))}
        </div>
    );
}

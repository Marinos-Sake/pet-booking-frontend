import type { Pet } from "../../pets/types";
export default function PetsCard({ pets, loading, error }: { pets: Pet[]; loading: boolean; error?: string|null; }) {
    return (
        <div className="rounded-2xl border border-border-soft bg-white p-4 lg:sticky lg:top-6 h-fit">
            <h2 className="text-lg font-semibold">Τα κατοικίδιά μου</h2>
            {loading && <p className="text-text-muted">Φόρτωση…</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && pets.length === 0 && <p className="text-text-muted mt-2">Δεν έχεις προσθέσει ακόμα κατοικίδιο.</p>}
            <ul className="mt-3 flex flex-col gap-2 max-h-72 overflow-auto pr-1">
                {pets.map(p => (
                    <li key={p.id} className="rounded-xl border border-border-soft bg-surface-card px-3 py-2">
                        <p className="font-medium">{p.name}</p>
                        <p className="text-sm text-text-muted">{p.petType==="CAT"?"Γάτα":"Σκύλος"} • {p.gender==="MALE"?"Άρρεν":"Θήλυ"} • {p.weight}kg • {p.birthDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

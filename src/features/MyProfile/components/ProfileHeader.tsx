import { Link } from "react-router-dom";

type Props = { isAdmin?: boolean };

export default function ProfileHeader({ isAdmin }: Props) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-text-ink">Το προφίλ μου</h1>
                <p className="mt-1 text-text-muted">Προσωπικά στοιχεία, κατοικίδια & πληρωμές.</p>
            </div>
            {isAdmin && (
                <Link
                    to="/admin"
                    className="rounded-xl bg-secondary-accent px-4 py-2 text-white shadow-sm hover:opacity-90"
                >
                    Πάνελ Διαχείρισης
                </Link>
            )}
        </div>
    );
}

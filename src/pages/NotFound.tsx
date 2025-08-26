import { Link, useNavigate, useLocation } from "react-router-dom";

export default function NotFound() {
    const nav = useNavigate();
    const { pathname } = useLocation();

    return (
        <main className="min-h-[60vh] grid place-items-center px-6 py-16">
            <div className="text-center">
                <p className="text-sm font-semibold text-gray-500">404</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                    Η σελίδα δεν βρέθηκε
                </h1>
                <p className="mt-3 text-gray-600">
                    Δεν βρέθηκε κάποιο περιεχόμενο για <span className="font-mono">{pathname}</span>.
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">
                    <button
                        onClick={() => nav(-1)}
                        className="rounded-xl px-4 py-2 border border-gray-300 hover:bg-gray-50"
                    >
                        Πίσω
                    </button>

                    <Link
                        to="/"
                        className="rounded-xl px-4 py-2 bg-primary-brand text-white hover:opacity-90"
                    >
                        Πήγαινε στην αρχική
                    </Link>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    Αν πιστεύεις ότι είναι λάθος, ενημέρωσέ μας από τη σελίδα{" "}
                    <Link to="/contact" className="underline">επικοινωνίας</Link>.
                </p>
            </div>
        </main>
    );
}

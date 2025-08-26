import { useNavigate } from "react-router-dom";
import {useAuth} from "../../auth/hooks/UseAuth.tsx";


type Props = {
    image: string;
    title: string;
    subtitle?: string;
    desc?: string;
};

export default function RoomCard({ image, title, subtitle, desc }: Props) {
    const { isAuthenticated } = useAuth();
    const nav = useNavigate();

    function handleBook() {
        if (!isAuthenticated) {
            nav("/login", {
                replace: true,
                state: {
                    from: "/booking",
                    notice: "Πρέπει να συνδεθείς για να κάνεις κράτηση.",
                },
            });
            return;
        }
        nav("/booking");
    }

    return (
        <div className="rounded-2xl overflow-hidden border border-border-soft bg-white shadow-sm hover:shadow-md transition">
            <img src={image} alt={title} className="w-full h-56 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-text-ink">{title}</h3>
                {subtitle && <p className="text-sm text-text-muted mt-0.5">{subtitle}</p>}
                {desc && <p className="text-text-ink/70 mt-2">{desc}</p>}
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={handleBook}
                        className="inline-flex items-center rounded-xl bg-primary-brand px-4 py-2 text-white hover:opacity-95"
                    >
                        Κλείσε τώρα
                    </button>
                </div>
            </div>
        </div>
    );
}

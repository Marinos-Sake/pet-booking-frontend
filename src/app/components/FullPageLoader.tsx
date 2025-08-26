import type { ReactNode } from "react";

type Props = { message?: ReactNode };

export default function FullPageLoader({ message = "Φόρτωση..." }: Props) {
    return (
        <div
            className="fixed inset-0 z-[9999] grid place-items-center bg-white/80 backdrop-blur-sm"
            role="status"
            aria-live="polite"
        >
            <div className="flex flex-col items-center gap-4">
                <div
                    className="h-12 w-12 rounded-full border-4 border-gray-300 animate-spin"
                    style={{ borderTopColor: "var(--color-primary-brand, #4F46E5)" }}
                />
                <p className="text-sm" style={{ color: "var(--color-text-ink, #334155)" }}>
                    {message}
                </p>
            </div>
        </div>
    );
}

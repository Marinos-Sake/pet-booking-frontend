import { NavLink, Outlet } from "react-router-dom";
export default function AdminLayout() {
    const item = (to:string, label:string) => (
        <NavLink to={to} className="block rounded-lg px-3 py-2 hover:bg-primary-brand/5">
            {label}
        </NavLink>
    );
    return (
        <div className="min-h-screen grid grid-cols-12 bg-surface-canvas">
            <aside className="col-span-3 lg:col-span-2 border-r border-border-soft bg-surface-card p-4">
                <div className="mb-3 font-semibold text-text-ink">Admin</div>
                <nav className="space-y-1">
                    {item("rooms","Δωμάτια")}
                    {item("bookings","Κρατήσεις")}
                    {item("payments","Πληρωμές")}
                    {item("users","Χρήστες")}
                </nav>
            </aside>
            <main className="col-span-9 lg:col-span-10 p-6">
                <Outlet/>
            </main>
        </div>
    );
}

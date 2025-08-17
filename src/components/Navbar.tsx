import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../features/auth/useAuth.tsx";

const navItems = [
    { to: "/dogs-hotel", label: "ΞΕΝΟΔΟΧΕΙΟ ΣΚΥΛΩΝ" },
    { to: "/cats-lodge", label: "ΞΕΝΩΝΑΣ ΓΑΤΑΣ" },
    { to: "/gallery", label: "ΦΩΤΟΓΡΑΦΙΕΣ" },
    { to: "/about", label: "ΠΟΙΟΙ ΕΙΜΑΣΤΕ" },
    { to: "/contact", label: "ΕΠΙΚΟΙΝΩΝΙΑ" },
];

function Navbar() {
    const { pathname } = useLocation();
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const showLogo = pathname !== "/" && pathname !== "/home";

    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <nav className="bg-surface-card border-b border-border-soft sticky top-0 z-50">
            <div className="mx-auto max-w-6xl px-6 flex items-center justify-between py-4">
                {showLogo && (
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="App logo" className="w-10 h-10 rounded-full overflow-hidden" />
                        <span className="font-bold text-text-ink">Φιλοξενία κατοικιδίων</span>
                    </Link>
                )}

                <ul className="flex items-center gap-6">
                    {isAuthenticated && (
                        <li>
                            <NavLink
                                to="/me"
                                className={({ isActive }) =>
                                    [
                                        "text-text-ink hover:text-primary-brand uppercase tracking-wide font-semibold",
                                        "px-2 py-1 transition-colors",
                                        isActive
                                            ? "border-b-2 border-primary-brand"
                                            : "border-b-2 border-transparent hover:border-primary-brand/70",
                                    ].join(" ")
                                }
                            >
                                ΤΟ ΠΡΟΦΙΛ ΜΟΥ
                            </NavLink>
                        </li>
                    )}

                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    [
                                        "text-text-ink hover:text-primary-brand uppercase tracking-wide font-semibold",
                                        "px-2 py-1 transition-colors",
                                        isActive
                                            ? "border-b-2 border-primary-brand"
                                            : "border-b-2 border-transparent hover:border-primary-brand/70",
                                    ].join(" ")
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}

                    <li>
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="text-text-ink hover:text-primary-brand uppercase tracking-wide font-semibold px-2 py-1 border-b-2 border-transparent hover:border-primary-brand/70 transition-colors"
                            >
                                ΑΠΟΣΥΝΔΕΣΗ
                            </button>
                        ) : (
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    [
                                        "text-text-ink hover:text-primary-brand uppercase tracking-wide font-semibold",
                                        "px-2 py-1 transition-colors",
                                        isActive
                                            ? "border-b-2 border-primary-brand"
                                            : "border-b-2 border-transparent hover:border-primary-brand/70",
                                    ].join(" ")
                                }
                            >
                                ΣΥΝΔΕΣΗ
                            </NavLink>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

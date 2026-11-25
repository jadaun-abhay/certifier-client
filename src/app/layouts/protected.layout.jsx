import {
    Outlet,
    useLoaderData,
    useNavigate,
    Link,
    useLocation,
} from "react-router";
import { authMiddleware } from "../../features/auth/middleware/auth.middleware";
import { userAuthContext } from "../../shared/contexts/user.context";
import { logout } from "../../features/auth/api/auth.api";
import {
    FolderIcon,
    TrashIcon,
    LogoutIcon,
    ImageIcon,
    ZapIcon,
    TypeIcon,
} from "../../shared/components/icons";

// Only routes nested under this layout require login - keeping this off
// root.jsx avoids gating /login and /signup themselves, which would
// otherwise redirect-loop (redirect to /login -> middleware runs on
// /login too -> not authenticated -> redirect to /login -> ...).
// eslint-disable-next-line react-refresh/only-export-components
export const clientMiddleware = [authMiddleware];

// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = ({ context }) => context.get(userAuthContext);

const navItems = [
    { to: "/", label: "My Drive", icon: FolderIcon, exact: true },
    { to: "/trash", label: "Trash", icon: TrashIcon },
    { to: "/templates", label: "Templates", icon: ImageIcon },
    { to: "/jobs", label: "Jobs", icon: ZapIcon },
    { to: "/fonts", label: "Fonts", icon: TypeIcon },
];

const ProtectedLayout = () => {
    const user = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex h-full bg-[#1f1b29] text-white">
            <aside className="flex w-56 shrink-0 flex-col justify-between bg-[#2c2638] p-4">
                <div>
                    <p className="mb-6 px-2 text-xl font-semibold">
                        React Drive
                    </p>
                    <nav className="flex flex-col gap-1">
                        {navItems.map(({ to, label, icon: Icon, exact }) => {
                            const active = exact
                                ? location.pathname === to ||
                                  location.pathname.startsWith("/folder/")
                                : location.pathname.startsWith(to);
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                                        active
                                            ? "bg-[#6d54b5] text-white"
                                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    <Icon width={18} height={18} />
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="border-t border-white/10 pt-4">
                    <p className="truncate px-2 text-sm font-medium">
                        {user?.first_name || user?.email}
                    </p>
                    <p className="truncate px-2 text-xs text-gray-400">
                        {user?.email}
                    </p>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                    >
                        <LogoutIcon width={18} height={18} />
                        Log out
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default ProtectedLayout;

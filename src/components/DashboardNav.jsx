import { Bell, Menu, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardNav({ onMenuClick }) {
    const storedUser = sessionStorage.getItem("user");

    let user = {};

    try {
        user = storedUser ? JSON.parse(storedUser) : {};
    } catch (error) {
        user = {};
    }

    const patientName = user.fullName || "Patient";

    return (
        <header className="fixed top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-[#080b16] px-4 sm:px-6">
            <div className="flex items-center gap-3">
                <button type="button" onClick={onMenuClick} className="rounded-lg p-2 text-white hover:bg-slate-700 md:hidden" aria-label="Toggle navigation" >
                    <Menu size={22} />
                </button>

                <Link to="/dashboard" className="flex items-center gap-2">
                    <img src="/assets/logo.png" alt="IntelliPhoenix" className="h-10 w-10 object-contain" />

                    <span className="text-xl font-bold tracking-tight text-white">
                        IntelliPhoenix
                    </span>
                </Link>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
                <Link to="/notifications" className="relative rounded-full p-2 text-white hover:bg-slate-700" aria-label="Notifications" >
                    <Bell size={21} />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />
                </Link>

                <div className="flex items-center gap-2">
                    <Link to="/profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-400 text-white" >
                        <UserRound size={20} />
                    </Link>

                    <div className="hidden sm:block">
                        <p className="max-w-40 truncate text-sm font-semibold text-white">
                            {patientName}
                        </p>

                        <p className="text-xs text-white">
                            Patient
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}
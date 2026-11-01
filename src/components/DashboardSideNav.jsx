import { LayoutDashboard, CalendarDays, Stethoscope, FileText, Pill, UserRound, Bell, LogOut, } from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Book Appointment", icon: CalendarDays, path: "/appointment/book" },
    { label: "Symptom Checker", icon: Stethoscope, path: "/symptom-checker" },
    { label: "My Appointments", icon: CalendarDays, path: "/appointments" },
    { label: "Medical Records", icon: FileText, path: "/medical-records" },
    { label: "Prescriptions", icon: Pill, path: "/prescriptions" },
    { label: "My Profile", icon: UserRound, path: "/profile" },
    { label: "Notifications", icon: Bell, path: "/notifications" },
];

export default function DashboardSideNav({ sidebarOpen, onClose }) {

    function handleLogout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.href = "/login";
    }

    return (
        <aside className={`fixed bottom-0 left-0 top-16 z-30 w-64 border-r border-slate-200 bg-white p-4 transition-transform duration-300 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 ${ sidebarOpen ? "translate-x-0" : "-translate-x-full" }`} >
            <nav className="flex h-full flex-col gap-1">
                {navigation.map(({ label, icon: Icon, path }) => (
                    <NavLink key={label} to={path} end onClick={onClose} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${ isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-blue-700" }` } >
                        <Icon size={19} />
                        {label}
                    </NavLink>
                ))}

                <button type="button" onClick={handleLogout} className="mt-auto flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-rose-600 hover:bg-rose-50" >
                    <LogOut size={19} />
                    Logout
                </button>
            </nav>
        </aside>
    );
}
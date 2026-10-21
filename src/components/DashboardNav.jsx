import { useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardNav(){
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const storedUser = sessionStorage.getItem("user");
    let user = {};
    try{
        user = storedUser ? JSON.parse(storedUser) : {};
    } catch(error) {
        user = {};
    }

    const patientName = user.fullName || "Patient";
    const initial = patientName.charAt(0).toUpperCase();

    return (
        <div>
            <header className="fixed top-0 z-40 flex w-full h-18 border-b border-slate-200 bg-[#080b16] px-4 sm:px-6">
                <div className="flex w-full items-center justify-between gap-3 px-4 sm:px-6 h-16">
                    <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-lg p-2 hover:bg-slate-100 md:hidden" aria-label="Toogle navigation">
                        {sidebarOpen ? <X size={22}/> : <Menu size={22}/>}
                    </button>

                    <Link to="/dashboard" className="flex items-center gap-2">
                        <img src="/assets/logo.png" alt="IntelliPhoenix" className="h-10 w-10 object-contain"/>
                        <span className="text-xl font-bold tracking-tight text-white">
                            IntelliPhoenix
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-3 px-6">
                    <button type="button" className="relative text-white rounded-full p-2 hover:bg-slate-100 hover:text-black" aria-label="Notifications">
                        <Bell size={21} />
                        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500"/>
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-400 font-semibold text-white">
                            {initial}
                        </div>
                        <div className="hidden sm:block">
                            <p className="max-w-40 truncate text-sm text-white font-semibold">
                                {patientName}
                            </p>
                            <p className="text-xs text-white">
                                Patient
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {sidebarOpen && (
                <button type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-20 bg-slate-950/30 md:hidden" />
            )}
        </div>
    )
}
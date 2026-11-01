import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import DashboardSideNav from "./DashboardSideNav";

export default function PatientLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <DashboardNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

            {sidebarOpen && (
                <button type="button" aria-label="Close navigation" onClick={closeSidebar} className="fixed inset-0 top-16 z-20 bg-slate-950/30 md:hidden" />
            )}

            <div className="mx-auto flex w-full max-w-[1600px] pt-16">
                <DashboardSideNav sidebarOpen={sidebarOpen} onClose={closeSidebar} />

                <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
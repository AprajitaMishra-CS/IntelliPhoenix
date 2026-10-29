import { useState } from "react";
import { LayoutDashboard, CalendarDays, Users, FileText, Stethoscope, Bell, Menu, X, LogOut, Clock, CheckCircle2, XCircle, ArrowUpRight, ClipboardList, Activity, } from "lucide-react";

const navigation = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Appointments", icon: CalendarDays },
    { label: "Patients", icon: Users },
    { label: "Prescriptions", icon: FileText },
];

const stats = [
    {
        label: "Total Patients",
        value: "—",
        description: "Registered patients",
        icon: Users,
        color: "bg-blue-50 text-blue-600",
    },
    {
        label: "Today's Appointments",
        value: "—",
        description: "Scheduled for today",
        icon: CalendarDays,
        color: "bg-violet-50 text-violet-600",
    },
    {
        label: "Pending Requests",
        value: "—",
        description: "Awaiting your response",
        icon: Clock,
        color: "bg-amber-50 text-amber-600",
    },
    {
        label: "Prescriptions Issued",
        value: "—",
        description: "Prescriptions created",
        icon: FileText,
        color: "bg-emerald-50 text-emerald-600",
    },
];

function EmptyState({ icon: Icon, title, description }) {
    return (
        <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
            <div className="rounded-2xl bg-sky-50 p-4 text-sky-700">
                <Icon size={28} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-800">{title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                {description}
            </p>
        </div>
    );
}

export default function DoctorDashboard() {
    const [activeTab, setActiveTab] = useState("Overview");
    const [menuOpen, setMenuOpen] = useState(false);

    const selectTab = (tab) => {
        setActiveTab(tab);
        setMenuOpen(false);
    };

    function handleLogout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.href = "/login";
    }

    const renderContent = () => {
        switch (activeTab) {
            case "Appointments":
                return (
                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 p-5 sm:p-6">
                            <h2 className="text-lg font-bold text-slate-900">
                                Appointment Management
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Review and manage patient booking requests.
                            </p>
                        </div>
                        
                        <EmptyState icon={CalendarDays} title="Appointments will appear here" description="Your appointment requests and scheduled consultations will be loaded from the backend." />
                    </section>
                );

            case "Patients":
                return (
                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 p-5 sm:p-6">
                            <h2 className="text-lg font-bold text-slate-900">
                                Patient Directory
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Access patient information relevant to your practice.
                            </p>
                        </div>

                        <EmptyState icon={Users} title="Patient records" description="Patient information will be displayed here once the doctor-specific API is connected." />
                    </section>
                );

            case "Prescriptions":
                return (
                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 p-5 sm:p-6">
                            <h2 className="text-lg font-bold text-slate-900">
                                Prescription Management
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Review prescriptions you have issued.
                            </p>
                        </div>

                        <EmptyState icon={FileText} title="Your prescriptions" description="Your issued prescriptions will be loaded from the existing prescriptions API." />
                    </section>
                );

            default:
                return (
                    <>
                        {/* Welcome */}
                        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-sm font-semibold text-sky-700">
                                    Doctor Workspace
                                </p>

                                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                    Dashboard Overview
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                    Manage your appointments, patients, and prescriptions fromone place.
                                </p>
                            </div>

                            <button onClick={() => selectTab("Appointments")} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2" >
                                <CalendarDays size={18} />
                                View appointments
                                <ArrowUpRight size={16} />
                            </button>
                        </section>

                        {/* Statistics */}
                        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {stats.map(({ label, value, description, icon: Icon, color }) => (
                                <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" >
                                    <div className="flex items-center justify-between">
                                        <div className={`rounded-xl p-3 ${color}`}>
                                            <Icon size={22} />
                                        </div>
                                        <Activity size={17} className="text-slate-300" />
                                    </div>

                                    <p className="mt-5 text-sm font-medium text-slate-500">
                                        {label}
                                    </p>

                                    <p className="mt-1 text-3xl font-bold text-slate-900">
                                        {value}
                                    </p>

                                    <p className="mt-2 text-xs text-slate-500">{description}</p>
                                </div>
                            ))}
                        </section>

                        {/* Appointment section */}
                        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">
                                        Recent Appointments
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Keep track of your consultation schedule.
                                    </p>
                                </div>

                                <button onClick={() => selectTab("Appointments")} className="self-start text-sm font-semibold text-sky-700 hover:text-sky-800 sm:self-auto" >
                                    View all <span aria-hidden="true">→</span>
                                </button>
                            </div>

                            <EmptyState icon={ClipboardList} title="No appointment data loaded" description="Connect the existing appointments API to display real patient bookings here." />

                            <div className="border-t border-slate-100 px-5 py-3 sm:px-6">
                                <p className="text-xs text-slate-400">
                                    Live appointment data will appear after backend integration.
                                </p>
                            </div>
                        </section>

                        {/* Quick actions */}
                        <section>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    Quick Actions
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Jump directly to a workspace.
                                </p>
                            </div>

                            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {[
                                    {
                                        title: "Manage Appointments",
                                        description: "Review booking requests",
                                        icon: CalendarDays,
                                        tab: "Appointments",
                                        color: "bg-blue-50 text-blue-600",
                                    },
                                    {
                                        title: "Patient Directory",
                                        description: "View patient information",
                                        icon: Users,
                                        tab: "Patients",
                                        color: "bg-violet-50 text-violet-600",
                                    },
                                    {
                                        title: "Prescriptions",
                                        description: "Manage issued prescriptions",
                                        icon: FileText,
                                        tab: "Prescriptions",
                                        color: "bg-emerald-50 text-emerald-600",
                                    },
                                ].map(({ title, description, icon: Icon, tab, color }) => (
                                    <button key={tab} onClick={() => selectTab(tab)} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-sky-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500">
                                        <div className={`rounded-xl p-3 ${color}`}>
                                            <Icon size={23} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-slate-900">{title}</p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                {description}
                                            </p>
                                        </div>

                                        <ArrowUpRight size={18} className="shrink-0 text-slate-400 transition group-hover:text-sky-600" />
                                    </button>
                                ))}
                            </div>
                        </section>
                    </>
            );
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* Mobile backdrop */}
            {menuOpen && (
                <button aria-label="Close navigation" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${ menuOpen ? "translate-x-0" : "-translate-x-full" } lg:translate-x-0`} >
                <div className="flex h-20 items-center bg-[#080b16] justify-between border-b border-slate-100 px-5">
                    <div className="flex items-center gap-3">
                        <img src="/assets/logo.png" alt="IntelliPhoenix" className="h-10 w-10 object-contain"/>

                        <div>
                            <h2 className="text-base font-bold text-white">
                                IntelliPhoenix
                            </h2>
                            
                            <p className="text-xs text-slate-300">Doctor Portal</p>
                        </div>
                    </div>

                    <button aria-label="Close sidebar" onClick={() => setMenuOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden">
                        <X size={19} className="text-white hover:text-black"/>
                    </button>
                </div>

                <div className="px-4 pt-7">
                    <p className="px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                        Workspace
                    </p>

                    <nav className="mt-3 space-y-1">
                        {navigation.map(({ label, icon: Icon }) => (
                            <button key={label} onClick={() => selectTab(label)} aria-current={activeTab === label ? "page" : undefined}className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${ activeTab === label ? "bg-sky-50 text-sky-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900" }`} >
                                <Icon size={19} />
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto border-t border-slate-100 p-4">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                            DR
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-800">
                                Doctor Account
                            </p>

                            <p className="text-xs text-slate-500">IntelliPhoenix</p>
                        </div>
                    </div>

                    <button type="button" onClick={handleLogout} className="mt-auto flex text-center w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium bg-rose-50 text-rose-600 hover:bg-rose-50">
                        <LogOut size={19} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main panel */}
            <main className="min-w-0 lg:pl-64">
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-[#080b16] px-4 backdrop-blur sm:px-8">
                    <div className="flex items-center gap-3">
                        <button aria-label="Open navigation" onClick={() => setMenuOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden">
                            <Menu size={22} className="text-white hover:text-black"/>
                        </button>

                        <div>
                            <p className="text-xs text-slate-300">Doctor workspace</p>
                            <h2 className="text-lg font-bold text-slate-100">{activeTab}</h2>
                        </div>
                    </div>

                    <button aria-label="Notifications" className="relative rounded-xl border border-slate-200 p-2.5 text-slate-100 hover:bg-slate-50 hover:text-black">
                        <Bell size={19} />
                    </button>
                </header>

                <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-8">
                    {renderContent()}

                    <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
                        &copy; {new Date().getFullYear()} IntelliPhoenix. All rights reserved.
                    </footer>
                </div>
            </main>
        </div>
    );
}
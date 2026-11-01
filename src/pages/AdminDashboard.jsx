import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, UserRound, CalendarDays, Bell, LogOut, Menu, X, CheckCircle2, Clock, Stethoscope, RefreshCw, MessageCircle } from "lucide-react";
import PatientsManagement from "../components/admin/PatientsManagement";
import DoctorsManagement from "../components/admin/DoctorsManagement";
import AppointmentsManagement from "../components/admin/AppointmentsManagement";
import UsersManagement from "../components/admin/UsersManagement";
import Notifications from "./Notifications";
import MessagesManagement from "../components/admin/MessagesManagement";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const navigation = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Patients", icon: Users },
    { label: "Doctors", icon: Stethoscope },
    { label: "Appointments", icon: CalendarDays },
    { label: "Users", icon: UserRound },
    { label: "Messages", icon: MessageCircle },
    { label: "Notifications", icon: Bell },
];

export default function AdminDashboard({ initialTab = "Overview" }) {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(initialTab);
    const [menuOpen, setMenuOpen] = useState(false);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0,
        pendingAppointments: 0,
        confirmedAppointments: 0,
        completedAppointments: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAdminStats = async () => {
        try {
            setLoading(true);
            setError("");

            const token = sessionStorage.getItem("token");

            const response = await fetch(`${API_URL}/admin/stats`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to fetch dashboard statistics.");
            }

            setStats(data.stats);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminStats();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.href = "/login";
    };

    const statCards = [
        {
            label: "Total Users",
            value: stats.totalUsers,
            icon: Users,
            color: "bg-blue-50 text-blue-600",
        },
        {
            label: "Total Patients",
            value: stats.totalPatients,
            icon: UserRound,
            color: "bg-violet-50 text-violet-600",
        },
        {
            label: "Total Doctors",
            value: stats.totalDoctors,
            icon: Stethoscope,
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            label: "Total Appointments",
            value: stats.totalAppointments,
            icon: CalendarDays,
            color: "bg-amber-50 text-amber-600",
        },
        {
            label: "Pending Appointments",
            value: stats.pendingAppointments,
            icon: Clock,
            color: "bg-orange-50 text-orange-600",
        },
        {
            label: "Confirmed Appointments",
            value: stats.confirmedAppointments,
            icon: CheckCircle2,
            color: "bg-sky-50 text-sky-600",
        },
        {
            label: "Completed Appointments",
            value: stats.completedAppointments,
            icon: CheckCircle2,
            color: "bg-green-50 text-green-600",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">

            {/* Mobile Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-[#080b16] px-5 py-4 lg:hidden">
                
                <h1 className="text-xl font-bold text-white">
                    IntelliPhoenix
                </h1>

                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X className="text-white hover:text-black hover:bg-slate-300"/> : <Menu className="text-white hover:text-black hover:bg-slate-300"/>}
                </button>
            </header>

            <div className="flex min-h-screen">

                {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#080b16] text-white transition-transform lg:translate-x-0 ${ menuOpen ? "translate-x-0" : "-translate-x-full" }`}>
                    <div className="flex flex-row border-b border-slate-700 px-6 py-7">
                        <img src="/assets/logo.png" alt="IntelliPhoenix" className="h-12 w-12 mr-2 object-contain"/>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-sky-400">
                                IntelliPhoenix
                            </h1>
                            
                            <p className="mt-1 text-sm text-slate-400">
                                Admin Workspace
                            </p>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2 px-4 py-6">
                        {navigation.map(({ label, icon: Icon }) => (
                            <button key={label} onClick={() => { 
                                setActiveTab(label); 
                                setMenuOpen(false);
                                }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${ activeTab === label ? "bg-sky-600 text-white" : "text-slate-300 hover:bg-slate-800" }`}
                            >
                                <Icon size={19} />
                                {label}
                            </button>
                        ))}
                    </nav>

                    <button onClick={handleLogout} className="m-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-red-500/20 hover:text-red-400" >
                        <LogOut size={19} />
                        Logout
                    </button>
                </aside>

                {/* Main Content */}
                <main className="min-w-0 flex-1 lg:ml-64">
                    <header className="sticky top-0 z-30 hidden items-center justify-between border-b bg-[#080b16] px-8 py-5 lg:flex">
                        <div>
                            <p className="text-sm text-slate-100">
                                Admin Workspace
                            </p>
                            <h2 className="text-2xl text-white font-bold">
                                {activeTab}
                            </h2>
                        </div>

                        <button type="button" onClick={() => {
                            setActiveTab("Notifications");
                            navigate("/notifications");
                        }} className="flex flex-row rounded-xl border border-slate-200 px-4 py-2 text-sm text-white font-medium hover:bg-slate-500" >
                            <Bell size={24} />
                        </button>
                    </header>

                    <div className="p-5 sm:p-8">

                        <div className="mb-7">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Welcome, Administrator
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Manage your healthcare platform from one place.
                            </p>
                        </div>

                        {activeTab === "Overview" && (
                            <>
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-lg font-bold">
                                        Platform Overview
                                    </h3>

                                    <button onClick={fetchAdminStats} className="flex flex-row rounded-lg bg-[#080b16] px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700" >
                                        <RefreshCw size={18} className="mr-2 my-1" />
                                        Refresh
                                    </button>
                                </div>

                                {loading ? (
                                    <p className="py-12 text-center text-slate-500">
                                        Loading dashboard statistics...
                                    </p>
                                ) : error ? (
                                    <p className="py-12 text-center text-red-600">
                                        {error}
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                        {statCards.map((card) => {
                                            const Icon = card.icon;

                                            return (
                                                <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm" >
                                                    <div className="flex items-center justify-between">
                                                        <div className={`rounded-xl p-2 ${card.color}`}>
                                                            <Icon size={20} />
                                                        </div>
                                                    </div>

                                                    <p className="mt-5 text-sm font-medium text-slate-500">
                                                        {card.label}
                                                    </p>

                                                    <h3 className="mt-1 text-2xl font-bold text-slate-900">
                                                        {card.value}
                                                    </h3>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === "Patients" && <PatientsManagement/>}

                        {activeTab === "Doctors" && <DoctorsManagement/>}

                        {activeTab === "Appointments" && <AppointmentsManagement/>}

                        {activeTab === "Users" && <UsersManagement/>}

                        {activeTab === "Messages" && <MessagesManagement/>}

                        {activeTab === "Notifications" && <Notifications/>}

                    </div>

                    <footer className="border-t border-slate-200 px-6 py-5 text-center text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} IntelliPhoenix. All rights reserved.
                    </footer>
                </main>
            </div>
        </div>
    );
}
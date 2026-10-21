import { icons, HeartPulse, CalendarDays, ArrowRight } from "lucide-react";
import DashboardCard from "../components/DashboardCard";
import DashboardNav from "../components/DashboardNav";
import DashboardSideNav from "../components/DashboardSideNav";
import QuickActionTab from "../components/QuickActionTab";
import { Link } from "react-router-dom";
import HealthTipsCard from "../components/HealthTipsCard";

export default function PatientDashboard() {
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
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <DashboardNav/>

            <div className="mx-auto flex w-full max-w-[1600px]">
                <DashboardSideNav/>

                <main className="min-w-0 flex-1 space-y-6 p-6 mt-14 sm:p-6 lg:p-8">
                    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-100 via-sky-100 to-indigo-100 p-6 sm:p-8">
                        <div className="relative z-10 max-w-2xl">
                            <p className="text-sm font-medium text-blue-800">
                                Welcome to your health dashboard
                            </p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
                                Hello, {patientName} !!
                            </h1>
                            <p className="mt-3 max-w-xl leading-7 text-slate-600">
                                Take charge of your health with IntelliPhoenix. 
                                Book appointments, check your symptoms, and access your health information in one place.
                            </p>
                        </div>
                        <HeartPulse className="absolute -bottom-5 right-6 hidden text-blue-300/70 sm:block" size={150} strokeWidth={1} />
                    </section>

                    <section>
                        <QuickActionTab />
                    </section>

                    <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
                        <DashboardCard>
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="text-lg font-bold text-slate-900">
                                    Upcoming Appointments
                                </h2>

                                <Link to="/appointments" className="text-sm font-medium text-blue-600 hover:underline">
                                    View all
                                </Link>
                            </div>
                            <div className="mt-5 rounded-xl border borer-dashed border-slate-300 p-6 text-center">
                                <CalendarDays className="mx-auto text-blue-500" size={32} />
                                <p className="mt-3 font-semibold text-slate-800">
                                    No appointments to display yet
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    Your upcoming appointments will appear here after booking.
                                </p>

                                <Link to="/appointments/book" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#080b16] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                                    Book an appointment <ArrowRight size={16} />
                                </Link>
                            </div>
                        </DashboardCard>

                        <DashboardCard>
                            <h2 className="text-lg font-bold text-slate-900">
                                My Profile
                            </h2>
                            <div className="mt-5 flex items-center gap-3">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700"> 
                                    {initial}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate font-semibold">
                                        {patientName}
                                    </p>
                                    <p className="truncate text-sm text-slate-500">
                                        {user.email || "No email available"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm text-slate-600">
                                <p>
                                    <span className="font-medium text-slate-800">
                                        Role:
                                    </span> {" "}
                                    Patient
                                </p>

                                <p className="break-words">
                                    <span className="font-medium text-slate-800">
                                        Account:
                                    </span> {" "}
                                    Signed in
                                </p>
                            </div>

                            <Link to="/profile" className="mt-5 block rounded-xl border border-blue-200 px-4 py-2.5 text-center text-sm font-semibold text-blue-700 hover:bg-blue-50">
                                View profile
                            </Link>
                        </DashboardCard>
                    </div> 

                    <HealthTipsCard/>
                </main>
            </div>
        </div>
    )
}



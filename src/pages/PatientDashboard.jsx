import { useEffect, useState } from "react";
import { HeartPulse, CalendarDays, ArrowRight } from "lucide-react";
import DashboardCard from "../components/DashboardCard";
import DashboardNav from "../components/DashboardNav";
import DashboardSideNav from "../components/DashboardSideNav";
import QuickActionTab from "../components/QuickActionTab";
import { Link } from "react-router-dom";
import HealthTipsCard from "../components/HealthTipsCard";

export default function PatientDashboard() {
    const API_URL = "http://localhost:8080/api/appointments";

    const [upcomingAppointment, setUpcomingAppointment] = useState([]);
    const [appointmentsLoading, setAppointmentsLoading] = useState(true);
    const [appointmentsError, setAppointmentsError] = useState("");

    useEffect(() => {
        const fetchUpcomingAppointments = async () => {
            try {
                const token = sessionStorage.getItem("token");

                const response = await fetch(`${API_URL}/my`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if(!response.ok){
                    throw new Error(data.message || "Failed to load appointments.");
                }

                const appointments = Array.isArray(data.appointments) ? data.appointments : [];

                const now = new Date();

                const upcoming = appointments.filter((appointment) => {
                    const appointmentDate = new Date(appointment.appointmentDate);

                    return (
                        !Number.isNaN(appointmentDate.getTime()) && appointmentDate >= now && !["cancelled", "rejected"].includes(
                            String(appointment.status || "").toLowerCase()
                        )
                    );
                })
                .sort((a,b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)).slice(0,3);

                setUpcomingAppointment(upcoming);
            } catch(error) {
                setAppointmentsError(error.message);
            } finally {
                setAppointmentsLoading(false);
            }
        };

        fetchUpcomingAppointments();
    }, []);

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
                            <div className="mt-5 space-y-3">
                                {appointmentsLoading ? (
                                    <div className="rounded-xl border border-slate-200 p-6 text-center text-slate-500">
                                        Loading appointments...
                                    </div>
                                ) : appointmentsError ? (
                                    <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                                        {appointmentsError}
                                    </div>
                                ) : upcomingAppointment.length === 0 ? (
                                    <div className="mt-5 rounded-xl border borer-dashed border-slate-300 p-6 text-center">
                                        <CalendarDays className="mx-auto text-blue-500" size={32} />
                                        <p className="mt-3 font-semibold text-slate-800">
                                            No appointments to display yet
                                        </p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Your upcoming appointments will appear here after booking.
                                        </p>

                                        <Link to="/appointment/book" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#080b16] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                                            Book an appointment <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                ) : (
                                    upcomingAppointment.map((appointment) => (
                                        <div key={appointment._id} className="rounded-xl border border-slate-200 bg-white p-4">
                                            <div className="flex flex-wrap items-start justify-between gap-3">
                                                <div>
                                                    <h3 className="font-semibold text-slate-900">
                                                        Dr. {appointment.doctor?.fullName || "Doctor"}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-slate-600">
                                                        {new Date(appointment.appointmentDate).toLocaleString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                </div>

                                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-700">
                                                    {appointment.status || "pending"}
                                                </span>
                                            </div>

                                            <p className="mt-3 text-sm text-slate-600">
                                                <span className="font-medium">Reason: </span>{""}
                                                {appointment.reason || "Not Specified"}
                                            </p>
                                        </div>
                                    ))
                                )}
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



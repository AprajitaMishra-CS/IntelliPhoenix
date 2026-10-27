import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, UserRound, RefreshCw, XCircle } from "lucide-react";

const API_URL = "http://localhost:8080/api/appointments";

export default function MyAppointments() {
    const [appointments, setAppointments] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const fetchAppointments = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const token = sessionStorage.getItem("token");

            if(!token) {
                throw new Error("Please log in to view you appointments.");
            }

            const response = await fetch(`${API_URL}/my`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Unable to load appointments.");
            }

            setAppointments(
                Array.isArray(data.appointments) ? data.appointments : []
            );
        } catch(err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    async function handleCancel(appointmentId) {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this appointment ?"
        );

        if(!confirmed) {
            return;
        }

        setCancellingId(appointmentId);
        setError("");
        setMessage("");

        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch(`${API_URL}/${appointmentId}/cancel`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Unable to cancel appointment.");
            }

            setMessage("Appointment cancelled successfully.");
            await fetchAppointments();

        } catch(err) {
            setError(err.message || "Unable to cancel appointment.");
        } finally {
            setCancellingId("");
        }
    }

    function formatDate(date) {
        if(!date) {
            return "Date unavailable";
        }
        const parsed = new Date(date);

        if(Number.isNaN(parsed.getTime())){
            return "Invalid Date";
        }

        return parsed.toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    }

    function statusStyle(status){
        const styles = {
            pending: "bg-sky-100 text-sky-800",
            confirmed: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
            completed: "bg-blue-100 text-blue-800",
        };

        return styles[status] || "bg-slate-100 text-slate-700";
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <Link to="/dashboard" className="mb-6 inline-block text-sm font-medium text-blue-700 hover:text-blue-900">
                    &larr; Back to Dashboard
                </Link>

                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex flex-row">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                            <CalendarDays size={25} />
                        </div>
                        &nbsp;&nbsp;
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-bold text-slate-900">
                                My Appointments
                            </h1>
                        
                            <p className="mt-2 text-slate-600">
                                View and manage your healthcare appointments.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button onClick={fetchAppointments} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50">
                            <RefreshCw size={17} />
                            Refresh
                        </button>

                        <Link to="/appointment/book" className="rounded-lg bg-blue-700 px-4 py-2.5 text-center font-medium text-white hover:bg-blue-800">
                            Book Appointment
                        </Link>
                    </div>
                </div>

                {message && (
                    <p role="status" className="mb-5 rounded-lg bg-green-50 p-4 text-sm text-green-800">
                        {message}
                    </p>
                )}

                {error && (
                    <p role="alert" className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </p>
                )}

                {loading ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">
                        Loading your appointments...
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                        <CalendarDays size={42} className="mx-auto mb-4 text-slate-400" />
                        <h2 className="text-xl font-semibold text-slate-900">
                            No appointment yet
                        </h2>
                        <p className="mx-auto mt-2 max-w-md text-slate-600">
                            Your booked appointments will appear here.
                        </p>
                        <Link to="/appointment/book" className="mt-6 inline-block rounded-lg bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800">
                            Book Your First Appointment
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {appointments.map((appointment) => {
                            const doctor = appointment.doctorId && typeof appointment.doctorId === "object" ? appointment.doctorId : appointment.doctor && typeof appointment.doctor === "object" ? appointment.doctor : null;
                            const status = String(appointment.status || "pending").toLowerCase();
                            const canCancel = ["pending", "confirmed"].includes(status);

                            return (
                                <article key={appointment._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                        <div>
                                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle(status)}`}>
                                                {status}
                                            </span>

                                            <h2 className="mt-3 text-lg font-semibold text-slate-900">
                                                Appointment with {doctor?.fullName || "Doctor"}
                                            </h2>

                                            <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                                <CalendarDays size={16} />
                                                {formatDate(appointment.appointmentDate)}
                                            </p>

                                            {doctor?.email && (
                                                <p className="mt-2 flex items-center gap-2 break-all text-sm text-slate-600">
                                                    <UserRound size={16} />
                                                    {doctor.email}
                                                </p>
                                            )}
                                        </div>

                                        {canCancel && (
                                            <button onClick={() => handleCancel(appointment._id)} disabled={cancellingId === appointment._id} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50">
                                                <XCircle size={17} />
                                                {cancellingId === appointment._id ? "Cancelling..." : "Cancel Appointment"}
                                            </button>
                                        )}
                                    </div>

                                    <div className="mt-5 border-t border-slate-100 pt-4">
                                        <h3 className="text-sm font-semibold text-slate-800">
                                            Reason for appointment
                                        </h3>

                                        <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                                            {appointment.reason || "No reason provided"}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
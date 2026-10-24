import { useEffect, useState } from "react";
import { CalendarDays, Clock, Stethoscope, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080/api/appointments";

export default function AppointmentBooking(){
    const [doctors, setDoctors] = useState([]);
    const [loadingDoctors, setLoadingDoctors] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        doctorId: "",
        appointmentDate: "",
        reason: "",
    });

    useEffect(() => {
        async function fetchDoctors() {
            try {
                const token = sessionStorage.getItem("token");

                const response = await fetch(`${API_URL}/doctors`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const  data = await response.json();

                if(!response.ok){
                    throw new Error(data.message || "Unable to load doctors");
                }

                setDoctors(Array.isArray(data.doctors) ? data.doctors : []);
            } catch(error) {
                setError(error.message || "Unable to load doctors.");
            } finally {
                setLoadingDoctors(false);
            }
        }

        fetchDoctors();
    }, []);

    function handleChange(event) {
        const {name, value} = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");
        setError("");

        const token = sessionStorage.getItem("token");

        if(!token){
            setError("Please log in before booking an appointment.");
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Appointment booking failed.");
            }

            setMessage("Appointment booked successfully !!");
            setFormData({
                doctorId: "",
                appointmentDate: "",
                reason: "",
            });
        } catch(err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    }

    const minimumDate = new Date(Date.now() + 60*1000)
    .toISOString()
    .slice(0, 16);

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <Link to="/dashboard" className="mb-6 inline-block text-sm font-medium text-blue-700 hover:text-blue-900">
                    &larr; Back to Dashboard
                </Link>

                <div className="mb-8 flex flex-cols">
                    <div className="mb-3 mr-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                        <CalendarDays size={25} />
                    </div>
                    
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Book an Appointment
                        </h1>

                        <p className="mt-2 text-slate-600">
                            Chhose a doctor, select a suitable date and time, and tell us briefly why you need an appointment.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {message && (
                        <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
                            {message}
                        </p>
                    )}

                    {error && (
                        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    <div>
                        <label htmlFor="doctorId" className="mb-2 block text-sm font-semibold text-slate-700">
                            <Stethoscope size={17} className="mr-2 inline" />
                            Select Doctor
                        </label>

                        <select id="doctorId" name="doctorId" value={formData.doctorId} onChange={handleChange} required disabled={loadingDoctors || doctors.length === 0} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100">
                            <option value="">
                                {loadingDoctors ? "Loading doctors..." : doctors.length === 0 ? "No Doctors Available" : "Choose a doctor"}
                            </option>

                            {doctors.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.fullName}
                                    {doctor.email ? `${doctor.email}` : ""}
                                </option>
                            ))}
                        </select>

                        {doctors.length === 0 && !loadingDoctors && (
                            <p className="mt-2 text-sm text-amber-700">
                                No doctor accounts were found. A doctor account must exist before you can book an appointment.
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="appointmentDate" className="mb-2 block text-sm font-semibold text-slate-700">
                            <Clock size={17} className="mr-2 inline" />
                            Appointment Date and Time
                        </label>

                        <input id="appointmentDate" name="appointmentDate" type="datetime-local" min={minimumDate} value={formData.appointmentDate} onChange={handleChange} required className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </div>

                    <div>
                        <label htmlFor="reason" className="mb-2 block text-sm font-semibold text-slate-700">
                            <FileText size={17} className="mr-2 inline" />
                            Reason for Appointment
                        </label>

                        <textarea id="reason" name="reason" rows={4} maxLength={500} value={formData.reason} onChange={handleChange} required placeholder="Briefly describe the reason for your visit..." className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />

                        <p className="mt-1 text-right text-xs text-slate-500">
                            {formData.reason.length}/500
                        </p>
                    </div>

                    <button type="submit" disabled={submitting || loadingDoctors || doctors.length === 0} className="w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled: cursor-not-allowed disabled:opacity-60">
                        {submitting ? "booking..." : "Book Appointment"}
                    </button>
                </form>
            </div>
        </main>
    );
}
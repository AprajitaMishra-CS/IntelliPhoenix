import { useEffect, useState } from "react";

const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700",
    cancelled: "bg-gray-100 text-gray-700",
    completed: "bg-green-100 text-green-700",
};

const AppointmentsManagement = () => {
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/appointments`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch appointments");
            }

            setAppointments(data.appointments || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const filteredAppointments = appointments.filter((appointment) => {
        const patientName = appointment.patient?.fullName || "";
        const doctorName = appointment.doctor?.fullName || "";
        const reason = appointment.reason || "";

        const matchesSearch = `${patientName} ${doctorName} ${reason}`
        .toLowerCase()
        .includes(search.toLowerCase());

        const matchesStatus = statusFilter === "all" || appointment.status?.toLowerCase() === statusFilter;

        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return <p className="p-6 text-gray-500">Loading appointments...</p>;
    }

    if (error) {
        return (
            <div className="p-6 text-red-500">
                <p>{error}</p>
                <button onClick={fetchAppointments} className="mt-3 text-blue-600" >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Appointments Management
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Monitor all appointments across IntelliPhoenix.
                    </p>
                </div>

                <div className="rounded-xl bg-sky-50 px-5 py-3">
                    <p className="text-sm text-sky-600">Total Appointments</p>

                    <p className="text-2xl font-bold text-sky-700">
                        {appointments.length}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input type="text" placeholder="Search patient, doctor or reason..." value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500" />

                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500" >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="rejected">Rejected</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left">
                        <thead className="bg-gray-50 text-sm text-gray-600">
                            <tr>
                                <th className="px-5 py-4">Patient</th>
                                <th className="px-5 py-4">Doctor</th>
                                <th className="px-5 py-4">Date</th>
                                <th className="px-5 py-4">Time</th>
                                <th className="px-5 py-4">Reason</th>
                                <th className="px-5 py-4">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map((appointment) => (
                                    <tr key={appointment._id} className="hover:bg-gray-50">
                                        <td className="px-5 py-4 text-sm font-medium text-gray-800">
                                            {appointment.patient?.fullName || "Patient unavailable"}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {appointment.doctor?.fullName || "Doctor unavailable"}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString("en-IN") : "N/A"}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {appointment.appointmentTime ? new Date(`1970-01-01T${appointment.appointmentTime}`).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, }) : "N/A"}
                                        </td>

                                        <td className="max-w-[200px] px-5 py-4 text-sm text-gray-600">
                                            {appointment.reason || "N/A"}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${ statusStyles[appointment.status?.toLowerCase()] || "bg-gray-100 text-gray-600" }`} >
                                                {appointment.status || "Unknown"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-5 py-10 text-center text-gray-500">
                                        No matching appointments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="text-sm text-gray-500">
                Showing {filteredAppointments.length} of {appointments.length} appointments
            </p>
        </div>
    );
};

export default AppointmentsManagement;
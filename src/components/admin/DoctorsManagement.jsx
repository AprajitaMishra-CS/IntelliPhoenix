import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api";

const DoctorsManagement = () => {
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        password: "",
        address: {
            country: "India",
            state: "",
            city: "",
        },
    });
    const [formError, setFormError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchDoctors = async () => {
        try{
            const response = await fetch(`${API_URL}/admin/doctors`,
                {
                     headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Failed to fetch doctors");
            }

            setDoctors(data.doctors || []);

        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleAddDoctor = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            setFormError("");

            const response = await fetch(`${API_URL}/admin/doctors`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Unable to create doctor");
            }

            setFormData({
                fullName: "",
                email: "",
                phone: "",
                gender: "",
                dob: "",
                password: "",
                address: {
                    country: "India",
                    state: "",
                    city: "",
                },
            });

            setShowForm(false);
            await fetchDoctors();

            alert("Doctor added successfully !!");

        } catch(error) {
            setFormError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleStatusChange = async (doctor) => {
        const newStatus = doctor.isActive === false;

        const confirmed = window.confirm(newStatus ? `Restore ${doctor.fullName}'s account?` : `Deactivate ${doctor.fullName}'s account? They will no longer be able to log in.`);

        if(!confirmed){
            return;
        }

        try {
            setUpdatingId(doctor._id);

            const response = await fetch(`${API_URL}/admin/users/${doctor._id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                body: JSON.stringify({ isActive: newStatus }),
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Unable to update account.");
            }

            setDoctors((prev) => prev.map((item) => item._id === doctor._id ? {...item, isActive: newStatus} : item ));

        } catch(error) {
            alert(error.message);
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredDoctors = doctors.filter((doctor) => 
        `${doctor.fullName} ${doctor.email} ${doctor.phone || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if(loading) {
        return <p className="p-6 text-gray-500">Loading doctors...</p>;
    }

    if(error) {
        return (
            <div className="p-6 text-red-500">
                <p>{error}</p>
                <button onClick={fetchDoctors} className="mt-3 text-blue-600">
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
                        Doctors Management
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        View and manage registered doctors.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-50 px-5 py-3">
                        <p className="text-sm text-blue-600">
                            Total Doctors
                        </p>

                        <p className="text-2xl font-bold text-blue-700">
                            {doctors.length}
                        </p>
                    </div>

                    <button onClick={() => setShowForm(!showForm)} className="rounded-lg bg-[#080b16] px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
                        {showForm ? "Close Form" : "+ Add Doctor"}
                    </button>
                </div>
            </div>

            {showForm && (
                <form onSubmit={handleAddDoctor} className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800">
                        Register New Doctor
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <input type="text" placeholder="Full Name" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-sky-500" />

                        <input type="email" placeholder="Email Address" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-sky-500" />
                    
                        <input type="tel" placeholder="Phone Number" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-sky-500" />
                    
                        <select required value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-sky-500" >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>

                        <input type="date" required value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-sky-500" />
                    
                        <input type="text" placeholder="City" required value={formData.address?.city || ""} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value }, })} className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-sky-500" />

                        <input type="text" placeholder="State" required value={formData.address?.state || ""} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value }, })} className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-sky-500" />

                        <input type="text" placeholder="Country" required value={formData.address?.country || ""} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, country: e.target.value }, })} className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-sky-500" />

                        <input type="password" placeholder="Temporary Password" required minLength={8} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-sky-500" />
                    </div>

                    {formError && (
                        <p className="text-sm text-red-500">{formError}</p>
                    )}

                    <button type="submit" disabled={submitting} className="rounded-lg bg-[#080b16] px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-50">
                        {submitting ? "Creating Doctor..." : "Create Doctor"}
                    </button>
                </form>
            )}

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <input type="text" placeholder="Search by name, email or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left">
                        <thead className="bg-gray-50 text-sm text-gray-600">
                            <tr>
                                <th className="px-5 py-4">Doctor</th>
                                <th className="px-5 py-4">Email</th>
                                <th className="px-5 py-4">Phone</th>
                                <th className="px-5 py-4">Gender</th>
                                <th className="px-5 py-4">Date of Birth</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map((doctor) => {
                                    const isActive = doctor.isActive !== false;

                                    return (
                                        <tr key={doctor._id} className="hover:bg-gray-50">
                                            <td className="px-5 py-4 font-medium text-gray-800">
                                                {doctor.fullName}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {doctor.email}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {doctor.phone || "N/A"}
                                            </td>

                                            <td className="px-5 py-4 text-sm capitalize text-gray-600">
                                                {doctor.gender || "N/A"}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {doctor.dob ? new Date(doctor.dob).toLocaleDateString("en-IN") : "N/A"}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                    {isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <button disabled={updatingId === doctor._id} onClick={() => handleStatusChange(doctor)} className={`rounded-lg px-3 py-2 text-xs font-semibold text-white disabled:opacity-50 ${isActive ? "bg-red-600 hover:bg-red-700": "bg-green-600 hover:bg-green-700"}`}>
                                                    {updatingId === doctor._id ? "Updating..." : isActive ? "Deactivate" : "Restore"}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-5 py-10 text-center text-gray-500">
                                        {search ? "No matching doctors found." : "No doctors registered yet."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="text-sm text-gray-500">
                Showing {filteredDoctors.length} of {doctors.length} doctors
            </p>
        </div>
    );
}

export default DoctorsManagement;
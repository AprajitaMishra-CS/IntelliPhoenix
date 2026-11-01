import { useEffect, useState } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const PatientsManagement = () => {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const fetchPatients = async () => {
        try{
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/admin/patients`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Failed to fetch patients");
            }

            setPatients(data.patients || []);

        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleStatusChange = async (patient) => {
        const newStatus = patient.isActive === false;

        const confirmed = window.confirm(newStatus ? `Restore ${patient.fullName}'s account?` : `Deactivate ${patient.fullName}'s account? They will no longer be able to log in.`);

        if(!confirmed){
            return;
        }

        try {
            setUpdatingId(patient._id);

            const response = await fetch(`${API_URL}/admin/users/${patient._id}/status`, {
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

            setPatients((prev) => prev.map((item) => item._id === patient._id ? {...item, isActive: newStatus} : item ));

        } catch(error) {
            alert(error.message);
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredPatients = patients.filter((patient) => 
        `${patient.fullName} ${patient.email} ${patient.phone || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if(loading) {
        return <p className="p-6 text-gray-500">Loading Patients...</p>;
    }

    if(error) {
        return <p className="p-6 text-red-500">{error}</p>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Patients Management
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        View and manage registered patients.
                    </p>
                </div>

                <div className="rounded-xl bg-blue-50 px-5 py-3">
                    <p className="text-sm text-blue-600">
                        Total Patients
                    </p>

                    <p className="text-2xl font-bold text-blue-700">
                        {patients.length}
                    </p>
                </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <input type="text" placeholder="Search by name, email or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left">
                        <thead className="bg-gray-50 text-sm text-gray-600">
                            <tr>
                                <th className="px-5 py-4">Patient</th>
                                <th className="px-5 py-4">Email</th>
                                <th className="px-5 py-4">Phone</th>
                                <th className="px-5 py-4">Gender</th>
                                <th className="px-5 py-4">Date of Birth</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((patient) => {
                                    const isActive = patient.isActive !== false;

                                    return (
                                        <tr key={patient._id} className="hover:bg-gray-50">
                                            <td className="px-5 py-4 font-medium text-gray-800">
                                                {patient.fullName}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {patient.email}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {patient.phone || "N/A"}
                                            </td>

                                            <td className="px-5 py-4 text-sm capitalize text-gray-600">
                                                {patient.gender || "N/A"}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {patient.dob ? new Date(patient.dob).toLocaleDateString("en-IN") : "N/A"}
                                            </td>
                                        
                                            <td className="px-5 py-4">
                                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                    {isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <button disabled={updatingId === patient._id} onClick={() => handleStatusChange(patient)} className={`rounded-lg px-3 py-2 text-xs font-semibold text-white disabled:opacity-50 ${isActive ? "bg-red-600 hover:bg-red-700": "bg-green-600 hover:bg-green-700"}`}>
                                                    {updatingId === patient._id ? "Updating..." : isActive ? "Deactivate" : "Restore"}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-5 py-10 text-center text-gray-500">
                                        {search ? "No matching patients found." : "No patients registered yet."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="text-sm text-gray-500">
                Showing {filteredPatients.length} of {patients.length} patients
            </p>
        </div>
    );
}

export default PatientsManagement;
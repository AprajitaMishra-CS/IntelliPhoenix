import { useEffect, useMemo, useState } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export default function UsersManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const token = sessionStorage.getItem("token");

            const response = await fetch(`${API_URL}/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to fetch users.");
            }

            setUsers(data.users || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch = user.fullName?.toLowerCase().includes(search.toLowerCase()) || user.email?.toLowerCase().includes(search.toLowerCase());

            const matchesRole = roleFilter === "all" || user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [users, search, roleFilter]);

    const roleStyle = (role) => {
        const styles = {
            admin: "bg-purple-100 text-purple-700",
            doctor: "bg-blue-100 text-blue-700",
            patient: "bg-green-100 text-green-700",
        };

        return styles[role] || "bg-slate-100 text-slate-700";
    };

    return (
        <section>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        Users Management
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        View and manage all registered platform users.
                    </p>
                </div>

                <button onClick={fetchUsers} className="rounded-lg bg-[#080b16] px-4 py-2 text-sm font-medium text-white hover:bg-sky-700" >
                    Refresh Users
                </button>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-sky-500" />

                <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-sky-500" >
                    <option value="all">All Roles</option>
                    <option value="patient">Patients</option>
                    <option value="doctor">Doctors</option>
                    <option value="admin">Admins</option>
                </select>
            </div>

            {loading ? (
                <p className="py-10 text-center text-slate-500">
                    Loading users...
                </p>
            ) : error ? (
                <p className="rounded-lg bg-red-50 p-4 text-center text-red-600">
                    {error}
                </p>
            ) : (
                <>
                    <div className="mb-3 text-sm text-slate-500">
                        Showing {filteredUsers.length} of {users.length} users
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                        <table className="w-full min-w-[650px] text-left text-sm">
                            <thead className="bg-slate-100 text-slate-600">
                                <tr>
                                    <th className="px-5 py-4">Name</th>
                                    <th className="px-5 py-4">Email</th>
                                    <th className="px-5 py-4">Phone</th>
                                    <th className="px-5 py-4">Role</th>
                                    <th className="px-5 py-4">Registered</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-slate-50">
                                        <td className="px-5 py-4 font-medium text-slate-800">
                                            {user.fullName}
                                        </td>

                                        <td className="px-5 py-4 text-slate-600">
                                            {user.email}
                                        </td>

                                        <td className="px-5 py-4 text-slate-600">
                                            {user.phone || "N/A"}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${roleStyle(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-slate-600">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN") : "N/A"}
                                        </td>
                                    </tr>
                                ))}

                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-5 py-10 text-center text-slate-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </section>
    );
}
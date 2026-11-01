import { useEffect, useState } from "react";
import { Mail, RefreshCw, CheckCircle, Clock } from "lucide-react";

export default function MessagesManagement() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            setError("");

            const token = sessionStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/contact",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch messages.");
            }

            setMessages(data.data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            setUpdatingId(id);

            const token = sessionStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/contact/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Status update failed.");
            }

            setMessages((previous) =>
                previous.map((item) => item._id === id ? data.data : item )
            );

            if (selectedMessage?._id === id) {
                setSelectedMessage(data.data);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setUpdatingId(null);
        }
    };

    const pendingCount = messages.filter((item) => item.status === "Pending").length;

    const resolvedCount = messages.filter((item) => item.status === "Resolved").length;

    if (loading) {
        return <div className="p-8 text-center">Loading messages...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Contact Messages
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage messages and feedback submitted by users.
                    </p>
                </div>

                <button onClick={fetchMessages} className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-slate-50" >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            {error && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {error}
                </p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border bg-white p-5">
                    <p className="text-sm text-slate-500">Total Messages</p>

                    <h3 className="mt-2 text-3xl font-bold">{messages.length}</h3>
                </div>

                <div className="rounded-xl border bg-white p-5">
                    <p className="text-sm text-slate-500">Pending</p>

                    <h3 className="mt-2 text-3xl font-bold text-amber-600">
                        {pendingCount}
                    </h3>
                </div>

                <div className="rounded-xl border bg-white p-5">
                    <p className="text-sm text-slate-500">Resolved</p>

                    <h3 className="mt-2 text-3xl font-bold text-green-600">
                        {resolvedCount}
                    </h3>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border bg-white">
                <table className="w-full min-w-[750px] text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="p-4">Sender</th>
                            <th className="p-4">Subject</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {messages.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-500">
                                    No messages received yet.
                                </td>
                            </tr>
                        ) : (
                            messages.map((item) => (
                                <tr key={item._id} className="border-t">
                                    <td className="p-4">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-slate-500">{item.email}</p>
                                    </td>

                                    <td className="p-4">{item.subject}</td>

                                    <td className="p-4">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="p-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ item.status === "Resolved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700" }`}>
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        <button onClick={() => setSelectedMessage(item)} className="font-medium text-blue-600 hover:underline" >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {selectedMessage && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xl font-bold text-slate-800">
                            Message Details
                        </h3>

                        <button onClick={() => setSelectedMessage(null)} className="text-sm text-slate-500 hover:text-red-600" >
                            Close
                        </button>
                    </div>

                    <div className="mt-5 space-y-3 text-sm">
                        <p><strong>Name:</strong> {selectedMessage.name}</p>
                        <p><strong>Email:</strong> {selectedMessage.email}</p>
                        <p><strong>Phone:</strong> {selectedMessage.phone}</p>
                        <p><strong>Subject:</strong> {selectedMessage.subject}</p>
                        <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>

                        <div>
                            <strong>Message:</strong>

                            <p className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-slate-700">
                                {selectedMessage.message}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {selectedMessage.status === "Pending" ? (
                            <button disabled={updatingId === selectedMessage._id} onClick={() => updateStatus(selectedMessage._id, "Resolved")} className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50" >
                                <CheckCircle size={16} />
                                {updatingId === selectedMessage._id ? "Updating..." : "Mark as Resolved"}
                            </button>
                        ) : (
                            <button disabled={updatingId === selectedMessage._id} onClick={() => updateStatus(selectedMessage._id, "Pending")} className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 disabled:opacity-50" >
                                <Clock size={16} />
                                {updatingId === selectedMessage._id ? "Updating..." : "Mark as Pending"}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
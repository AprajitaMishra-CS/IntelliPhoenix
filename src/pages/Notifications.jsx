import { AlarmClock, Bell, Calendar1, Megaphone, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { BsCapsulePill } from "react-icons/bs";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080/api/notifications";

function formatDate(date) {
    if(!date){
        return "";
    }

    const parsedDate = new Date(date);

    if(Number.isNaN(parsedDate.getTime())){
        return "";
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function getNotificationIcon(type) {
    const icons = {
        Appointment: Calendar1,
        Prescription: BsCapsulePill,
        Reminder: AlarmClock,
        System: Bell,
        Other: Megaphone,
    };
    
    const Icon = icons[type] || Bell;
    
    return (
        <span className="flex items-center justify-center">
            <Icon size={24} />
        </span>
    );
}

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState("");
    const [filter, setFilter] = useState("all");
    const [updatingId, setUpdatingId] = useState(null);

    const fetchNotifications = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const token = sessionStorage.getItem("token");

            if(!token) {
                throw new Error("Please log in to view your notifications.");
            }

            const response = await fetch(`${API_URL}/my`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Unable to load notifications.");
            }

            setNotifications(Array.isArray(data.notifications) ? data.notifications : []);

        } catch(error) {
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const markAsRead = async (notificationId) => {
        try {
            setUpdatingId(notificationId);

            const token = sessionStorage.getItem("token");

            const response = await fetch(`${API_URL}/${notificationId}/read`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Unable to update notification.");
            }

            setNotifications((current) => 
                current.map((notification) => 
                    notification._id === notificationId
                    ? { ...notification, isRead: true }
                    : notification
                )
            );

        } catch(error) {
            setError(error.message || "Could not mark notification as read.");
        } finally {
            setUpdatingId(null);
        }
    };

    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    const filteredNotifications = notifications.filter((notification) => {
        if(filter === "unread"){
            return !notification.isRead;
        } 

        if(filter === "read") {
            return notification.isRead;
        }

        return true;
    })

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl">
            
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-700">
                            Dashboard
                        </p>
            
                        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                            Notifications
                        </h1>
            
                        <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                            Stay updated with your healthcare activity.
                        </p>
                    </div>

                    <button type="button" onClick={fetchNotifications} disabled={loading} className="self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-60 sm:self-auto">
                        {loading ? (
                            "Loading..." 
                        ) : (
                            <p className="flex flex-row">
                                <RefreshCw size={18}/>
                                &nbsp;
                                Refresh
                            </p>
                        )} 
                    </button>
                </div>

                {/* Summary  */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Total Notifications
                        </p>

                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {notifications.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
                        <p className="text-sm font-medium text-sky-800">
                            Unread Notifications
                        </p>

                        <p className="mt-2 text-3xl font-bold text-sky-900">
                            {unreadCount}
                        </p>
                    </div>
                </div>

                {/* Filters  */}
                <div className="mb-5 flex flex-wrap gap-2">
                    {[
                        {label: "All", value: "all"},
                        {label: "Unread", value: "unread"},
                        {label: "Read", value: "read"},
                    ].map((item) => (
                        <button key={item.value} type="button" onClick={() => setFilter(item.value)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === item.value ? "bg-sky-700 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Error  */}
                {error && (
                    <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Loading  */}
                {loading && (
                    <div role="status" className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                        <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-sky-100 border-t-sky-600" />

                        <p className="font-semibold text-slate-800">
                            Loading Notifications...
                        </p>
                    </div>
                )}

                {/* Empty  */}
                {!loading && !error && filteredNotifications.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                        <div className="mb-4 text-5xl flex justify-center">
                            <Bell size={24} aria-hidden="true" />
                        </div>

                        <h2 className="text-xl font-bold text-slate-900">
                            {notifications.length === 0 ? "You're all cought up !!" : "No notifications in this filter"}
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                            {notifications.length === 0 ? "Appointment updates and other notifications will appear here when generated." : "Try another filter to see your notifications."}
                        </p>
                    </div>
                )}

                {/* Notification */}
                {!loading && filteredNotifications.length > 0 && (
                    <div className="space-y-3">
                        {filteredNotifications.map((notification) => (
                            <article key={notification._id} className={`rounded-2xl border bg-white p-5 shadow-sm transition sm:p-6 ${notification.isRead ? "border-slate-200" : "border-sky-200 bg-sky-50/40"}`}>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                                        {getNotificationIcon(notification.type)}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="break-words font-bold text-slate-900">
                                                {notification.title}
                                            </h2>

                                            {!notification.isRead && (
                                                <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-800">
                                                    New
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                                            {notification.message}
                                        </p>

                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                            <div>
                                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                    {notification.type || "System"}
                                                </span>

                                                <p className="mt-2 text-xs text-slate-400">
                                                    {formatDate(notification.createdAt)}
                                                </p>
                                            </div>

                                            {!notification.isRead && (
                                                <button type="button" onClick={() => markAsRead(notification._id)} disabled={updatingId === notification._id} className="rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm font-semibold text-sky-800 hover:bg-sky-50 disabled:opacity-60">
                                                    {updatingId === notification._id ? "Updating..." : "Mark as read"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <p className="mt-8 text-xs leading-5 text-slate-500">
                    Notifications are loaded from your authenticated account.
                </p>
            </div>
        </div>
    );
}
import { File, Hospital, RefreshCw, Stethoscope, TestTube, FolderOpen } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { BsCapsulePill } from "react-icons/bs";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080/api/medical-records/my";

function formatDate(date) {
    if(!date){ 
        return "Date Unavailable";
    }

    const parsedDate = new Date(date);

    if(Number.isNaN(parsedDate.getTime())) {
        return "Date Unavailable";
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function RecordIcon({type}) {
    const icons = {
        "Lab Report": TestTube,
        "Prescription": BsCapsulePill,
        "Diagnosis": Stethoscope,
        "Discharge Summary": Hospital,
        "Other": File,
    };

    const Icon = icons[type] || File;

    return (
        <span className="flex items-center justify-center">
            <Icon size={24} />
        </span>
    );
}

export default function MedicalRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchRecords =  useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const token = sessionStorage.getItem("token");

            if(!token){
                throw new Error("Please log in to view your medical records");
            }

            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Unable to load medical records.");
            }

            setRecords(Array.isArray(data.records) ? data.records : []);

        } catch(error) {
            setError(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl">
                <Link to="/dashboard" className="mb-6 inline-block text-sm font-medium text-blue-700 hover:text-blue-900">
                    &larr; Back to Dashboard
                </Link>

                {/* Page Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-700">
                            Patient Dashboard
                        </p>

                        <p className="text-3xl font-bold text-slate-900 sm:text-4xl">
                            Medical Records
                        </p>

                        <p className="mt-2 text-sm max-w-2xl leading-6 text-slate-600">
                            View your saved medical record details in one place.
                        </p>
                    </div>

                    <button type="button" onClick={fetchRecords} disabled={loading} className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-s font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto">
                        <span aria-label="true">
                            <RefreshCw size={18} />
                        </span>
                        {loading ? "Loading..." : "Refresh records"}
                    </button>
                </div>

                {/* Summary card */}
                <div className="mb-8 rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 to-cyan-50 p-5 sm:p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                            <FolderOpen size={24} className="text-yellow-500" />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-600">
                                Saved Records
                            </p>

                            <p className="text-3xl font-bold text-slate-900">
                                {records.length}
                            </p>
                        </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">
                        Your records are retrieved from your authenticated account.
                    </p>
                </div>

                {loading && (
                    <div role="status" className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                        <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-sky-100 border-t-sky-600" />
                        
                        <p className="font-semibold text-slate-800">
                            Loading your records...
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Please wait a moment.
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6">
                        <h2 className="font-semibold text-red-800">
                            Unable to load medical records
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-red-700">
                            {error}
                        </p>

                        <button type="button" onClick={fetchRecords} className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800">
                            Try again
                        </button>
                    </div>
                )}

                {!loading && !error && records.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                        <div className="mb-4 text-5xl flex justify-center">
                            <FolderOpen size={24} className="text-yellow-500" aria-label="true" />
                        </div>

                        <h2 className="text-xl font-bold text-slate-900">
                            No medical records yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                            Your saved medical record details will appear here when records have been added to your account.
                        </p>
                    </div>
                )}

                {!loading && !error && records.length > 0 && (
                    <div>
                        <div className="mb-4 flex items-center justify-btween gap-3">
                            <h2 className="text-xl font-bold text-slate-900">
                                Your records
                            </h2>

                            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
                                {records.length}{""}
                                {records.length === 1 ? " record" : " records"}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {records.map((record) => (
                                <article key={record._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ms:p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50">
                                            <RecordIcon type={record.recordType} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="break-words text-lg font-bold text-slate-900">
                                                {record.title}
                                            </h3>

                                            <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                                {record.recordType || "Other"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-5 spcae-y-3 border-t border-slate-100 pt-4 text-sm">
                                        <div className="flex items-start justify-between gap-4">
                                            <span className="text-slate-500">Record date</span>
                                            <span className="text-right font-medium text-slate-800">
                                                {formatDate(record.recordDate)}
                                            </span>
                                        </div>

                                        {record.doctorName && (
                                            <div className="flex items-start justify-between gap-4">
                                                <span className="text-slate-500">Doctor</span>
                                                <span className="text-right font-medium text-slate-800">
                                                    {record.doctorName}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {record.description && (
                                        <div className="mt-4 rounded-xl bg-slate-50 p-4">
                                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Description
                                            </p>

                                            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                                                {record.description}
                                            </p>
                                        </div>
                                    )}

                                    <p>
                                        Saved on {formatDate(record.createdAt)}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                )}

                <p className="mt-8 text-xs leading-5 text-slate-500">
                    This page displays saved record details only. Medical document uploads and downloads are not implemented yet.
                </p>
            </div>
        </div>
    )
}
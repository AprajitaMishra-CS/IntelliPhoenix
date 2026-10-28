import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { BiCapsule, BiInjection } from "react-icons/bi";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080/api/prescriptions/my";

function formatDate(date) {
    if(!date){
        return "Date Unavailable";
    }

    const parsedDate = new Date(date);

    if(Number.isNaN(parsedDate.getTime())){
        return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export default function Prescriptions() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchPrescriptions = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const token = sessionStorage.getItem("token");

            if(!token){
                throw new Error("Plaese log in to view your prescriptions.");
            }

            const response = await fetch(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Unable to load prescriptions.");
            }

            setPrescriptions(Array.isArray(data.prescriptions) ? data.prescriptions : []);
        } catch(error) {
            setError(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPrescriptions();
    }, [fetchPrescriptions]);

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl">
                <Link to="/dashboard" className="mb-6 inline-block text-sm font-medium text-blue-700 hover:text-blue-900">
                    &larr; Back to Dashboard
                </Link>

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-700">
                            Patient Dashboard
                        </p>

                        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                            My Prescriptions
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                            View your doctor-issued prescriptions and medication instructions in one place.
                        </p>
                    </div>

                    <button type="button" onClick={fetchPrescriptions} disabled={loading} className="self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-60 sm:self-auto">
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
                <div className="mb-8 rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 to-cyan-50 p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                            <BiCapsule size={24} className="text-blue-800" />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-600">
                                TotalPrescriptions
                            </p>

                            <p className="text-3xl font-bold text-slate-900">
                                {prescriptions.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Loading  */}
                {loading && (
                    <div role="status" className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                        <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-sky-100 border-t-sky-600" />
                        <p className="font-semibold text-slate-800">
                            Loading prescriptions...
                        </p>
                    </div>
                )}

                {/* Error  */}
                {!loading && error && (
                    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6">
                        <h2 className="font-semibold text-red-800">
                            Unable to load prescriptions
                        </h2>

                        <p className="mt-2 text-sm text-red-700">
                            {error}
                        </p>

                        <button type="button" onClick={fetchPrescriptions} className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800">
                            Try again
                        </button>
                    </div>
                )}

                {/* Empty  */}
                {!loading && !error && prescriptions.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                        <div className="mb-4 flex justify-center">
                            <BiCapsule size={24} className="text-blue-800" aria-hidden="true" />
                        </div>
                        
                        <h2 className="text-xl font-bold text-slate-900">
                            No prescriptions yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                            Prescriptions issued by your authorized doctor will appear here when they are added to your account.
                        </p>
                    </div>
                )}

                {/* Prescription cards */}
                {!loading && !error && prescriptions.length > 0 && (
                    <div className="space-y-6">
                        {prescriptions.map((prescription) => (
                            <article key={prescription._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-2xl">
                                                <BiCapsule size={24} className="text-blue-800" />
                                            </span>

                                            <div>
                                                <h2 className="text-lg font-bold text-slate-900">
                                                    Prescription
                                                </h2>

                                                <p className="text-sm text-slate-500">
                                                    Issued on {formatDate(prescription.issuedAt)}
                                                </p>
                                            </div>
                                        </div>

                                        {prescription.doctor?.fullName && (
                                            <p className="mt-4 text-sm text-slate-600">
                                                Prescribed by{" "}
                                                <span className="font-semibold text-slate-800">
                                                    Dr. {prescription.doctor.fullName}
                                                </span>
                                            </p>
                                        )}
                                    </div>

                                    <span className="self-start rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-800">
                                        Doctor-issued
                                    </span>
                                </div>

                                <div className="p-5 sm:p-6">
                                    {prescription.diagnosis && (
                                        <div className="mb-5">
                                            <h3 className="mb-1 text-sm font-semibold text-slate-800">
                                                Diagnosis
                                            </h3>

                                            <p className="text-sm leading-6 text-slate-600">
                                                {prescription.diagnosis}
                                            </p>
                                        </div>
                                    )}

                                    <h3 className="mb-3 font-semibold text-slate-900">
                                        Prescribed medicines
                                    </h3>

                                    <div className="space-y-3">
                                        {(prescription.medicines || []).map(
                                            (medicine, index) => (
                                                <div key={`${prescription._id}-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                                    <div className="flex items-start gap-3">
                                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-lg">
                                                            <BiInjection size={24} />
                                                        </span>

                                                        <div className="min-w-0 flex-1">
                                                            <h4 className="break-words font-semibold text-slate-900">
                                                                {medicine.medicineName}
                                                            </h4>

                                                            <div className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                                                                <div>
                                                                    <p className="text-xs text-slate-500">
                                                                        Dosage
                                                                    </p>

                                                                    <p className="mt-1 text-slate-800">
                                                                        {medicine.dosage}
                                                                    </p>
                                                                </div>

                                                                <div>
                                                                    <p className="text-xs text-slate-500">
                                                                        Frequency
                                                                    </p>

                                                                    <p className="mt-1 text-slate-800">
                                                                        {medicine.frequency}
                                                                    </p>
                                                                </div>

                                                                <div>
                                                                    <p className="text-xs text-slate-500">
                                                                        Duration
                                                                    </p>

                                                                    <p className="mt-1 text-slate-800">
                                                                        {medicine.duration}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {medicine.instructions && (
                                                                <div className="mt-3 border-t border-slate-200 pt-3">
                                                                    <p className="text-xs font-semibold text-slate-500">
                                                                        Instructions
                                                                    </p>

                                                                    <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                                                                        {medicine.instructions}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    {prescription.notes && (
                                        <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 p-4">
                                            <h3 className="text-sm font-semibold text-amber-900">
                                                Doctor's notes
                                            </h3>

                                            <p className="mmt-1 whitespace-pre-wrap text-sm leading-6 text-amber-900">
                                                {prescription.notes}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <p className="mt-8 text-xs leading-5 text-slate-500">
                    This page displays prescriptions recorded by authorized doctors.
                    Follow your prescribing clinician's instructions for medication use.
                </p>
            </div>
        </div>
    )
}
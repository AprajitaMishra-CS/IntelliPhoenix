import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080/api/symptoms/check";

export default function SymptomChecker() {
    const [form, setForm] = useState({
        symptoms: "",
        duration: "",
        severity: "Moderate",
        age: "",
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({...form, 
            [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);

        try{
            const token = sessionStorage.getItem("token");

            if(!token) {
                throw new Error("Please log in to use the Symptom Checker.");
            }

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    symptoms: form.symptoms.trim(),
                    duration: form.duration,
                    severity: form.severity,
                    age: form.age ? Number(form.age) : undefined,
                }),
            });

            const data = await response.json();

            if(!response.ok || !data.success) {
                throw new Error(
                    data.message || "Unable to analyze symptoms. Please try again."
                );
            }

            setResult(data);
        } catch(error) {
            setError(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setResult(null);
        setError("");
        setForm({
            symptoms: "",
            duration: "",
            severity: "Moderate",
            age: "",
        });
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-800 sm:px-6">
            <div className="mx-auto max-w-5xl">
                <Link to="/dashboard" className="mb-6 inline-block text-sm font-medium text-blue-700 hover:text-blue-900">
                    &larr; Back to Dashboard
                </Link>
                <header className="mb-10 text-center">
                    <span className="inline-flex rounded-full bg-[#C4DBF7] px-4 py-2 text-sm font-semibold text-navy-900 mb-4 w-fit flex flex-cols">
                        <img src="/assets/diamond.png" className="h-5 w-5"/>
                        &nbsp;
                        IntelliPhoenix AI Healthcare
                    </span>

                    <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
                        AI Symptom Checker
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                        Describe how you feel to receive general health information and guidance about which healthcare professional may help.
                    </p>
                </header>

                <div className="grid gap-8 lg:grid-cols-5">
                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
                        <h2 className="text-xl font-bold">
                            Tell us how you feel
                        </h2>
                        <p>
                            Share only the information needed for this assessment.
                        </p>        

                        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                            <div>
                                <label htmlFor="symptoms" className="mb-2 block text-sm font-semibold">
                                    Describe your symptoms *
                                </label>
                                <textarea id="symptoms" name="symptoms" value={form.symptoms} onChange={handleChange} required maxLength={2000} rows={5} placeholder="For example: I have a mild headache since this morning..." className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100" />
                                <p className="mt-1 text-right text-xs text-slate-400">
                                    {form.symptoms.length}/2000
                                </p>
                            </div>

                            <div>
                                <label htmlFor="duration" className="mb-2 block text-sm font-semibold">
                                    How long have you had these symptoms ?
                                </label>
                                <input id="duration" name="duration" value={form.duration} onChange={handleChange} maxLength={100} placeholder="e.g. Since yesterday" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100" />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="severity" className="mb-2 block text-sm font-semibold">
                                        Symptom Severity
                                    </label>
                                    <select id="severity" name="severity" value={form.severity} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-sky-500">
                                        <option value="Mild">Mild</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="Severe">Severe</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="age" className="mb-2 block text-sm font-semibold">
                                        Age (optional)
                                    </label>
                                    <input id="age" name="age" type="number" min="0" max="120" value={form.age} onChange={handleChange} placeholder="Enter age" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500" />
                                </div>
                            </div>

                            {error && (
                                <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                    {error}
                                </div>
                            )}

                            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#080b16] px-5 py-4 font-semibold text-white transition hover:bg-sky-300 hover:text-black disabled:cursor-not-allowed disabled:opacity-60">
                                {loading? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Analyzing symptoms...
                                    </>
                                ) : (
                                    "Analyze Symptoms"
                                )}
                            </button>
                        </form>
                    </section>

                    <aside className="space-y-5 lg:col-span-2">
                        <div className="rounded-3xl border border-sky-100 bg-sky-50 p-6">
                            <h2 className="font-bold text-sky-900">
                                How it works
                            </h2>

                            <ol className="mt-4 space-y-4 text-sm text-sky-900">
                                <li>01 - Describe your symptoms and their duration.</li>
                                <li>02 - AI generated general health information.</li>
                                <li>03 - Review guidance and consider professional care.</li>
                            </ol>
                        </div>

                        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
                            <h2 className="font-bold text-amber-900">
                                Important medical notice
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-amber-900">
                                This tool does not provide a diagnosis and cannot rule out serious conditions.
                                It is not a substitute for a qualified healthcare professional.
                            </p>
                            <p className="mt-3 text-sm leading-6 text-amber-900">
                                If you have severe or potentially life-threatening symptoms, seek emergency medical care immediately.
                            </p>
                        </div>
                    </aside>
                </div>

                {result && (
                    <section aria-live="polite" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-sky-700">
                                    Analysis complete
                                </p>
                                <h2 className="mt-2 text-2xl font-bold">
                                    Your symptom guidance
                                </h2>
                            </div>

                            <span className={`rounded-full px-4 py-2 text-sm font-semibold ${result.urgent ? "bg-red-100 text-red-800" : "bg-sky-100 text-sky-800"}`}>
                                {result.urgent ? "Urgent attention" : result.result?.urgency || "General Guidance"}
                            </span>
                        </div>

                        {result.urgent && (
                            <div role="alert" className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-red-900">
                                <strong>Seek emergency medical assessment.</strong>
                                <p className="mt-2">
                                    Do not delay urgent care to use this tool.
                                </p>
                            </div>
                        )}

                        {result.result?.summary && (
                            <div className="mt-6">
                                <h3 className="font-bold">
                                    Summary
                                </h3>
                                <p className="mt-2 leading-7 text-slate-600">
                                    {result.result.summary}
                                </p>
                            </div>
                        )}

                        {result.result?.possibleExplanations?.length>0 && (
                            <div className="mt-6">
                                <h3 className="font-bold">
                                    Possible Explanations
                                </h3>

                                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                                    {result.result.possibleExplanations.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {result.result?.suggestedSpecialist && (
                            <div className="mt-6 rounded-xl bg-slate-50 p-4">
                                <h3 className="font-bold">
                                    Suggested healthcare professional
                                </h3>
                                <p className="mt-2 text-slate-600">
                                    {result.result.suggestedSpecialist}
                                </p>
                            </div>
                        )}

                        {result.result?.guidance && (
                            <div className="mt-6">
                                <h3 className="font-bold">
                                    Suggested next steps
                                </h3>

                                {Array.isArray(result.result.guidance)? (
                                    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                                        {result.result.guidance.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="mt-2 leading-7 text-slate-600">
                                        {result.result.guidance}
                                    </p>
                                )}
                            </div>
                        )}

                        <p className="mt-6 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-500">
                            {result.disclaimer || "This AI-generated information is not a diagnosis or a substitute for professional medical advice."}
                        </p>

                        <button type="button" onClick={resetForm} className="mt-6 rounded-xl border border-sky-700 px-5 py-3 font-semibold text-sky-800 transition hover:bg-sky-50">
                            Check again
                        </button>
                    </section>
                )}
            </div>
        </main>
    );
}
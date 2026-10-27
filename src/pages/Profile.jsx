import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, Pencil, Save, X, Mail, Phone, CalendarDays, MapPin, Venus, LoaderCircle, ShieldCheck } from "lucide-react";

const API_URL = "http://localhost:8080/api/profile";

const emptyProfile = {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    city: "",
    state: "",
    country: "",
};

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100";

function Detail({ icon: Icon, label, value}){
    return (
        <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4">
            <div className="rounded-lg bg-sky-50 p-2 text-sky-700">
                <Icon size={19} />
            </div>

            <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">
                    {label}
                </p>
                <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                    {value || "Not provided"}
                </p>
            </div>
        </div>
    );
}

export default function Profile() {
    const [profile, setProfile] = useState(emptyProfile);
    const [form, setForm] = useState(emptyProfile);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    useEffect(() => {
        let active = true;

        async function loadProfile() {
            const token = sessionStorage.getItem("token");

            if(!token) {
                setError("Your session has expired. Please log in again.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if(!response.ok){
                    throw new Error(data.message || "Could not load profile.");
                }

                if(active) {
                    setProfile({ ...emptyProfile, ...data.user });
                    setForm({ ...emptyProfile, ...data.user });
                }

            } catch(error) {
                if(active) {
                    setError(error.message || "Could not load profile.");
                }
            } finally {
                if(active) {
                    setLoading(false);
                }
            }
        }

        loadProfile();

        return () => {
            active = false;
        };
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setForm((prev) => ({ 
            ...prev,
            [name]: value,
        }));
    }

    function startEditing() {
        setForm({ 
            fullName: profile.fullName || "",
            email: profile.email || "",
            phone: profile.phone || "",
            dob: profile.dob ? new Date(profile.dob).toISOString().slice(0, 10) : "",
            gender: profile.gender || "",
            city: profile.address?.city || "",
            state: profile.address?.state || "",
            country: profile.address?.country || "",
        });
        setError("");
        setSuccess("");
        setEditing(true);
    }

    function cancelEditing() {
        setForm({ ...profile });
        setError("");
        setEditing(false);
    }

    async function handleSave(event) {
        event.preventDefault();
        setError("");
        setSuccess("");

        const token = sessionStorage.getItem("token");

        if(!token) {
            setError("Your session has expired. Please log in again.");
            return;
        }

        setSaving(true);

        try {
            const response = await fetch(API_URL, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    fullName: form.fullName || "",
                    phone: form.phone || "",
                    dob: form.dob ? new Date(form.dob).toISOString().slice(0, 10) : "",
                    gender: form.gender || "",
                    address: {
                        city: form.city || "",
                        state: form.state || "",
                        country: form.country || "",
                    },
                }),
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Could not update profile.");
            }

            const updatedUser = data.user;

            if(!updatedUser) {
                throw new Error("Profile updated, but the server returned no user data.")
            }

            setProfile(updatedUser);

            setForm({
                fullName: updatedUser.fullName || "",
                phone: updatedUser.phone || "",
                dob: updatedUser.dob ? new Date(updatedUser.dob).toISOString().slice(0, 10) : "",
                gender: updatedUser.gender || "",
                city: updatedUser.address?.city || "",
                state: updatedUser.address?.state || "",
                country: updatedUser.address?.country || "",
            });
            
            setEditing(false);
            setSuccess("Your profile has been updated successfully.");
        } catch(error) {
            setError(error.message || "Could not update profile.");
        } finally {
            setSaving(false);
        }
    }

    if(loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center gap-3 text-slate-600">
                <LoaderCircle className="animate-spin" size={22} />
                Loading your profile...
            </div>
        );
    }

    const fields = [
        { name: "fullName", label: "Full name", type: "text", required: true },
        { name: "phone", label: "Phone number", type: "tel", required: true },
        { name: "dob", label: "Date of birth", type: "date" },
        { name: "city", label: "City", type: "text" },
        { name: "state", label: "State", type: "text" },
        { name: "country", label: "Country", type: "text" },
    ];

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <Link to="/dashboard" className="mb-6 inline-block text-sm font-medium text-blue-700 hover:text-blue-900">
                    &larr; Back to Dashboard
                </Link>

                <div className="mb-7 text-center">
                    <p className="text-sm font-semibold text-sky-700">
                        IntelliPhoenix / Patient Dashboard
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                        My Profile
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        View and manage your personal information.
                    </p>
                </div>

                {error && (
                    <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {success && (
                    <div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emarald-50 p-4 text-sm text-emerald-700">
                        {success}
                    </div>
                )}

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-5 bg-gradient-to-r from-sky-400 to-sky-700 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30">
                                <UserRound size={34} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">
                                    {profile.fullName || "Patient"}
                                </h2>

                                <p className="mt-1 text-sm text-white">
                                    {profile.email}
                                </p>

                                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                                    <ShieldCheck size={14} />
                                    Patient account
                                </span>
                            </div>
                        </div>

                        {!editing && (
                            <button type="button" onClick={startEditing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-sky-800 transition hover:bg-sky-50">
                                <Pencil size={17} />
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {editing ? (
                        <form onSubmit={handleSave} className="p-6 sm:p-8">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-900">
                                    Edit personal information
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Update your details and save your changes.
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                {fields.map((field) =>(
                                    <label key={field.name} className="block">
                                        <span className="mb-2 block text-sm font-medium text-slate-700">
                                            {field.label}
                                            {field.required && (
                                                <span className="text-red-500">*</span>
                                            )}
                                        </span>

                                        <input className={inputClass} type={field.type} name={field.name} value={form[field.name] || ""} onChange={handleChange} required={field.required || false} maxLength={field.name === "phone" ? 20 : 100} autoComplete={field.name === "fullName" ? "name" : field.name === "phone" ? "tel" : "off"} />
                                    </label>
                                ))}

                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-slate-700">
                                        Gender
                                    </span>

                                    <select className={inputClass} name="gender" value={form.gender || ""} onChange={handleChange}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                    </select>
                                </label>
                            </div>

                            <div className="mt-7 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
                                <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60">
                                    {saving ? (
                                        <LoaderCircle className="animate-spin" size={17} />
                                    ) : (
                                        <Save size={17} />
                                    )}
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>

                                <button type="button" onClick={cancelEditing} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60">
                                    <X size={17} />
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="p-6 sm:p-8">
                            <h3 className="mb-5 text-lg font-bold text-slate-900">
                                Personal information
                            </h3>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Detail icon={UserRound} label="Full Name" value={profile.fullName} />
                                <Detail icon={Mail} label="Email address" value={profile.email} />
                                <Detail icon={Phone} label="Phone number" value={profile.phone} />
                                <Detail icon={CalendarDays} label="Date of Birth" value={profile.dob} />
                                <Detail icon={Venus} label="Gender" value={profile.gender} />
                                <Detail icon={MapPin} label="City" value={profile.address?.city} />
                                <Detail icon={MapPin} label="State" value={profile.address?.state} />
                                <Detail icon={MapPin} label="Country" value={profile.address?.country} />
                            </div>

                            <p className="mt-6 text-xs leading-5 text-slate-500">
                                Your email address is dispalyed as registered and cannot be changed from this page.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
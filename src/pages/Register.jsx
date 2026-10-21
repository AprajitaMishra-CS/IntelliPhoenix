import { useState } from "react";
import { Link } from "react-router-dom";
import { User2, Mail, Phone, CalendarDays, UserRound, MapPin, Flag, UserCog, Lock, ArrowBigRightDashIcon, Building2 } from "lucide-react";

import AuthCard from "../components/AuthCard";
import FormField from "../components/FormField";
import SocialLogin from "../components/SocialLogin";
import Button from "../components/Button";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        city: "",
        state: "",
        country: "",
        role: "patient",
        password: "",
        confirmPassword: "",
        agree: false,
    });

    function handleChange(event) {
        const {name, value, type, checked} = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch (
                "http://localhost:8080/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fullName: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        dateOfBirth: formData.dob,
                        gender: formData.gender === "female" ? "Female" : formData.gender === "male" ? "Male" : formData.gender === "other" ? "Other" : "Prefer not to say",
                        city: formData.city,
                        state: formData.state,
                        country: formData.country,
                        password: formData.password,
                        confirmPassword: formData.confirmPassword,
                        acceptedTerms: formData.agree,
                    }),
                }
            );

            const data = await response.json();

            if(!response.ok){
                alert(data.message || "Registration failed.");
                return;
            }

            alert("Registration successful !! Please log in.");
            window.location.href = "/login";
        } catch(error) {
            console.error("Registration error: ", error);
            alert("Unable to connect to the server. Please try again.");
        }
    }

    return (
        <AuthCard className="max-w-xl">
            <div className="text-center">
                <img src="/assets/logo.png" alt="IntelliPhoenix logo" className="mx-auto mb-5 h-28 w-28 object-contain" />
                <h1 className="text-3xl font-bold tracking-wide text-[#080B20]">
                    Create Your Account
                </h1>
                <p className="mt-3 text-base text-slate-600 sm:text-lg">
                    Start your smart healthcare journey today
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Name */}
                <FormField label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" icon={User2} autoComplete="name" required />
                
                {/* Email */}
                <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" icon={Mail} autoComplete="email" required />

                {/* Phone */}
                <FormField label="Phone No" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" icon={Phone} autoComplete="tel" required />

                {/* Date of Birth */}
                <div>
                    <label htmlFor="dob" className="flex flex-cols mb-2 block text-sm font-medium text-[#17213D]">
                        <CalendarDays size={19} className="text-slate-400"/>&nbsp; Date of Birth
                    </label>
                    <input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} autoComplete="bday" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>

                {/* Gender */}
                <div>
                    <label htmlFor="gender" className="mb-2 block text-sm font-medium text-[#17213D]">
                        <UserRound size={18} className="mr-2 inline text-slate-400" />
                        Gender
                    </label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                        <option value="">Select your gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                </div>

                {/* City, State and Country */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <FormField label="City" name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" icon={Building2} autoComplete="address-level2" required />
                    <FormField label="State" name="state" value={formData.state} onChange={handleChange} placeholder="Enter state" icon={MapPin} autoComplete="address-level1" required />
                    <FormField label="Country" name="country" value={formData.country} onChange={handleChange} placeholder="Enter country" icon={Flag} autoComplete="country-name" required />
                </div>

                {/* Role */}
                <div>
                    <label htmlFor="role" className="flex flex-cols mb-2 block text-sm font-medium text-[#17213D]">
                        <UserCog size={18} className="mr-2 iniline text-slate-400"/> &nbsp;
                        Role
                    </label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange} required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                        <option value="patient">Patient</option>
                        <option value="doctor" disabled>Doctor</option>
                        <option value="admin" disabled>Admin</option>
                    </select>
                </div>

                {/* Password */}
                <FormField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter password" icon={Lock} autoComplete="new-password" required />
                <FormField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" icon={Lock} autoComplete="new-password" required />

                <label className="flex items-start gap-3 text-md text-slate-700">
                    <input name="agree" type="checkbox" checked={formData.agree} onChange={handleChange} className="mt-1 accent-blue-600" required />
                    <span>I agree to the Terms &amp; Conditions and Privacy Policy.</span>
                </label>

                <Button type="submit" className="w-full">
                    Create Account <ArrowBigRightDashIcon size={18} />
                </Button>
            </form>

            {/* Social login */}
            <SocialLogin 
                onGoogleLogin={() => {
                    console.log("Google login will be integrated later");
                }}
            />

            <p className="mt-6 text-center text-sm text-slate-600 sm:text-base">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-cyan-700 hover:text-cyan-900">
                    Login
                </Link>
            </p>
        </AuthCard>
    )
}
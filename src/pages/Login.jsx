import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowBigRightDashIcon } from "lucide-react";

import AuthCard from "../components/AuthCard";
import FormField from "../components/FormField";
import SocialLogin from "../components/SocialLogin";
import Button from "../components/Button";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [rememberMe, setRememberMe] = useState(true);

    function handleChange(event) {
        const {name, value} = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: formData.email.trim().toLowerCase(),
                        password: formData.password,
                    }),
                }
            );

            const data = await response.json();

            if(!response.ok){
                alert(data.message || "Login failed. Please try again.");
                return;
            }

            if(!data.token){
                alert("Login response did not contain an authentication token.");
                return;
            }

            // Storing token
            sessionStorage.setItem("token", data.token);

            // keeping only non-sensitive user details
            if(data.user){
                sessionStorage.setItem("user", JSON.stringify(data.user));
            }

            alert("Login successfully");
            navigate("/dashboard");
        } catch(error) {
            console.error("Login error: ", error);
            alert("Unable to connect to the server. Please try again.");
        }
    }

    return (
        <AuthCard className="max-w-xl">
            <div className="text-center">
                <img src="/assets/logo.png" alt="IntelliPhoenix logo" className="mx-auto mb-5 h-28 w-28 object-contain" />
                <h1 className="text-3xl font-bold tracking-wide text-[#080B20]">
                    WELCOME BACK !!
                </h1>
                <p className="mt-3 text-base text-slate-600 sm:text-lg">
                    Login to continue your healthcare journey
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" autoComplete="email" icon={Mail} required />
                <FormField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter password" autoComplete="current-password" icon={Lock} required />

                <div className="flex flex-wrap items-center justify-between gap-3 text-sm sm:text-base">
                    <label className="flex cursor-pointer items-center gap-2 text-[#17213D]">
                        <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-4 w-4 accent-blue-600" />
                        Remember Me
                    </label>

                    <Link to="/forgot-password" className="font-medium text-[#315D9B] transition hover:text-blue-800">
                        Forgot Password ?
                    </Link>
                </div>

                <Button type="submit" className="w-full">
                    Login <ArrowBigRightDashIcon size={18} />
                </Button>
            </form>

            {/* Social login */}
            <SocialLogin 
                onGoogleLogin={() => {
                    console.log("Google login will be integrated later");
                }}
            />

            <p className="mt-6 text-center text-sm text-slate-600 sm:text-base">
                Don't have an account ?{" "}
                <Link to="/register" className="font-semibold text-cyan-700 hover:text-cyan-900">
                    Register
                </Link>
            </p>
        </AuthCard>
    )
}
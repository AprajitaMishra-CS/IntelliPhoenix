import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function FormField({ label, name, type="text", value, onChange, placeholder, required=false, disabled=false, autoComplete, icon:Icon, error, className="", }){
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
        <div className={`w-full ${className}`}>
            <label htmlFor={name} className="mb-2 block text-sm font-medium text-[#17213D]">
                {label}
                {required && (
                    <span className="ml-1 text-red-500">&ast;</span>
                )}
            </label>

            <div className={`flex items-center gap-3 rounded-xl border bg-slate-50 px-4 transition focus-within:bg-white focus-within:ring-2 ${error ? "border-red-400 focus-within:border-red-400 focus-within:ring-red-100" : "border-slate-200 focus-within:border-blue-400 focus-within:ring-blue-100"}`}>
                {Icon && (
                    <Icon size={19} strokeWidth={1.8} className="shrink-0 text-slate-400"/>
                )}

                <input id={name} name={name} type={inputType} value={value} onChange={onChange} placeholder={placeholder} required={required} disabled={disabled} autoComplete={autoComplete} aria-invalid={Boolean(error)} className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#080B20] outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60" />
            
                {isPassword && (
                    <button type="button" onClick={() => setShowPassword((prev) => !prev)} aria-label={ showPassword ? "Hide Password" : "Show Password"} className="shrink-0 text-slate-400 transition hover:text-[#315D9B]">
                        {showPassword ? (<EyeOff size={19} />) : (<Eye size={19}/>)}
                    </button>
                )}
            </div>

            {error && (
                <p className="mt-1.5 text-xs text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}
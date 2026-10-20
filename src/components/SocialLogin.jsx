import { FaGoogle } from "react-icons/fa";

export default function SocialLogin({onGoogleLogin, disabled=false}) {
    return (
        <div className="mt-6 w-full">
            {/* OR divider */}
            <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-300" />
                    <span className="text-sm font-medium text-slate-500">
                        OR
                    </span>
                <div className="h-px flex-1 bg-slate-300" />
            </div>

            {/* Button */}
            <button type="button" onClick={onGoogleLogin} disabled={disabled} className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-[#DDE8F8] px-5 py-3 font-semibold text-[#242B8F] shadow-sm transition hover:bg-[#C8D9F4] disabled:cursor-not-allowed disabled:opacity-50">
                <FaGoogle size={19} />
                Continue with Google
            </button>
        </div>
    )
}
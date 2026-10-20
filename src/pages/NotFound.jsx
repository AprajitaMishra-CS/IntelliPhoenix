import { Link } from "react-router-dom";
import { Home, ArrowLeft, SearchX } from "lucide-react";
import { PiClipboard } from "react-icons/pi";

export default function NotFound() {
    return (
        <section className="flex min-h-[65vh] items-center justify-center bg-gradient-to-br from-[#F8FAFC] via-white to-[#EAF3FF] px-5 py-16">
            <div className="w-full max-w-2xl text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#DDE8F8] text-[#315D9B] shadow-sm">
                    <SearchX size={42} strokeWidth={1.6} />
                </div>

                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#080B20]">
                    Error 404
                </p>

                <h1 className="mb-4 text-4xl font-emerald leading-tight text-[#080B20] sm:text-6xl">
                    Page Not Found
                </h1>

                <p className="mx-auto mb-8 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                    Oops !! The page you are looking for doesn't exist, may have been moved, or is temporarily uavailable. <br/>
                    Let's get you back on the right path.
                </p>

                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Link to="/" className="iniline-flex flex flex-cols items-center justify-center gap-2 rounded-full bg-[#080B20] px-7 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#172554]">
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <button className="inline-flex items-center justify-center gap-2 rounded-full border border-[#9AA3B5] bg-transparent px-7 py-3 font-semibold text-[#17213D] transition hover:border-[#315D9B] hover:bg-[#EAF1FC]">
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>

                <p className="mt-10 text-sm text-slate-500">
                    Need help ? Explore IntelliPhoenix to continue your healthcare journey.
                </p>
            </div>
        </section>
    );
}
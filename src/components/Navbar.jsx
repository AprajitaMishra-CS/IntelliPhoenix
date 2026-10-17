import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
    ['Home', '/'],
    ['About', '/about'],
    ['Services', '/services'],
    ['Contact', '/contact'],
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-[#080b16] text-white shadow-lg">
            <nav className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
                {/* Right Side Logo and Brand Name */}
                <Link to='/' onClick={() => setOpen(false)} className="flex items-center gap-3 text-xl font-bold">
                    <img src="/assets/logo.png" alt="IntelliPhoenix" className="h-10 w-10 object-contain"/>
                    <span>IntelliPhoenix</span>
                </Link>

                {/* Hamburger Menu Option */}
                <button
                    className="rounded-lg p-2 md:hidden"
                    aria-label="Toggle navigation"
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X/>:<Menu/>}
                </button>

                {/* Other Links and active effect */}
                <div className="hidden items-center gap-6 md:flex">
                    {links.map(([label, path]) => (
                        <NavLink key={path} to={path} className={({ isActive }) => `text-sm transition hover:text-sky-400 ${
                                isActive ? 'text-sky-400' : 'text-gray-200'
                            }`
                        }
                        >
                            { label }
                        </NavLink>
                    ))}

                    {/* Login Link */}
                    <Link to='/login' className="rounded-lg border border-gray-500 px-4 py-2 text-sm hover:border-sky-400">
                        Login
                    </Link>

                    {/* Register Link */}
                    <Link to='/register' className="rounded-lg bg-[#16C7C1] px-4 py-2 text-sm font-semibold text-gray-950 hover:bg-[#16C7C1]/70">
                        Register
                    </Link>
                </div>
            </nav>

            {open && (
                <div className="absolute object-right left-0 top-full w-70 text-center border-t border-white/10 bg-[#080B16] px-5 py-5 shadow-xl md:hidden">
                    <div className="flex flex-col gap-3">
                        {links.map(([label, path]) => (
                            <NavLink key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => `rounded-lg px-4 py-3 transition-colors ${
                                isActive ? "text-cyan-400" : "text-gray-300 hover:bg-white/5 hover:text-white"
                            }`}>
                                {label}
                            </NavLink>
                        ))}
                        <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg border border-white/20 px-4 py-3 text-center hover:bg-white/10">
                            Login
                        </Link>
                        <Link to="/register" onClick={() => setOpen(false)} className="rounded-lg bg-[#16C7C1] px-4 py-3 text-center font-semibold text-black hover:bg-white/10 hover:text-white">
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
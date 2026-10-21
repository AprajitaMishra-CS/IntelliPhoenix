import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import { Mail } from "lucide-react";

export function Footer() {
    return (
        <>
            <footer className="bg-gradient-to-r from-[#071b50] via-[#102f80] to-[#080b16] text-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">

                    {/* Logo with tagline */}
                    <div>
                        <img src="/assets/logo.png" alt="IntelliPhoenix logo" className="mb-5 h-36 w-36 object-contain"/>
                        <p className="max-w-[220px] text-lg font-bold leading-tight">
                            Where Intelligence
                            <br/>
                            Inspires Recovery
                        </p>
                    </div>

                    {/* Helpful Links */}
                    <div>
                        <h3 className="mb-4 font-bold tracking-wide">HELPFUL LINKS</h3>
                        <ul className="space-y-2 text-gray-200">
                            {[
                                ['About', '/about'],
                                ['Services', '/services'],
                                ['Privacy Policy', '/privacy'],
                                ['Terms & Conditions', '/terms'],
                            ].map(([label, path]) => (
                                <li key={path}>
                                    <Link className="hover:text-sky-300" to={path}>
                                        &gt;&gt;&nbsp;&nbsp;{label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect with us link */}
                    <div>
                        <h3 className="mb-4 font-bold tracking-wide">CONNECT WITH US</h3>
                        <div className="space-y-3">
                            <Link to="/contact" className="flex items-center gap-2 hover:text-sky-300">
                                <Mail/> Contact
                            </Link>
                            <a href="#facebook" className="flex items-center gap-2 hover:text-sky-300">
                                <FaFacebookF/> Facebook
                            </a>
                            <a href="#instagram" className="flex items-center gap-2 hover:text-sky-300">
                                <FaInstagram/> Instagram
                            </a>
                            <a href="#linkedin" className="flex items-center gap-2 hover:text-sky-300">
                                <FaLinkedinIn/> LinkedIn
                            </a>
                            <a href="#twitter" className="flex items-center gap-2 hover:text-sky-300">
                                <FaXTwitter/> Twitter
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center border-t border-white/10 px-4 py-5 text-sm text-gray-300">
                    Copyright &copy; {new Date().getFullYear()} IntelliPhoenix. All rights reserved.
                </div>
            </footer>
        </>
    )
}
export default function Button({ children, variant="primary", type="button", onClick, disabled=false, className=""}) {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        primary: "bg-[#080B20] text-white shadow-md shadow-slate-900/10 hover:bg-[#172554] hover:-translate-y-0.5",
        secondary: "border border-[#9AA3B5] bg-transparent text-[#17213D] hover:border-[#315D9B] hover:bg-[#EAF1FC]",
        accent: "bg-[#DDE8F8] text-[#244B8F] hover:bg-[#C8D9F4]",
        danger: "bg-red-700 text-white hover:bg-red-800",
    };

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}>
            {children}
        </button>
    )
}
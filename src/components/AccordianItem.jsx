import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AccordianItem({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="overflow-hidden rounded-xl border-slate-200 bg-white shadow-sm">
            <button type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 bg-slate-50 px-5 py-5 text-left font-semibold text-slate-800 transition hover:bg-cyan-50">
                <span>{title}</span>
                <ChevronDown 
                    size={20}
                    className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="px-5 py-4 leading-7 text-slate-600">
                    {children}
                </div>
            )}
        </div>
    )
}
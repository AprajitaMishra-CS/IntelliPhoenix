import { CalendarDays, Stethoscope, FileText, Pill, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
    {
        title: "Book Appointment",
        description: "Schedule a visit with a specialist",
        icon: CalendarDays,
        color: "blue",
        path: "/appointment/book",
    },
    {
        title: "Symptom Checker",
        description: "Get AI-powered health suggestions",
        icon: Stethoscope,
        color: "emerald",
        path: "/symptom-checker",
    },
    {
        title: "Medical Records",
        description: "View your reports and history",
        icon: FileText,
        color: "blue",
        path: "/medical-records",
    },
    {
        title: "Prescriptions",
        description: "Access your prescriptions",
        icon: Pill,
        color: "purple",
        path: "/prescriptions",
    },
];

export default function QuickActionTab() {
    return(
        <section>
            <h2 className="mb-3 text-lg font-bold text-slate-900">
                Quick Actions
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {quickActions.map(
                    ({title, description, icon:Icon, color, path}) => (
                        <Link key={title} to={path} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-${color}-100 text-${color}-700`}>
                                <Icon size={23} />
                            </div>

                            <h3 className="font-bold text-slate-900">
                                {title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {description}
                            </p>

                            <div className="mt-3 flex justify-end text-blue-600">
                                <ArrowRight size={19} className="transition group-hover:translate-x-1"/>
                            </div>
                        </Link>
                    )
                )}
            </div>
        </section>
    )
}
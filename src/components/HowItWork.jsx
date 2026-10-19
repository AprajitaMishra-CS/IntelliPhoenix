import { UserRound, Search, BrainCircuit, Stethoscope } from "lucide-react"

const steps = [
    {
        icon: UserRound,
        title: "Step 1: Create Your Account",
        description: "Create account to access personalized healthcare services & manage health information.",
        color: "bg-sky-100 text-sky-800",
    },
    {
        icon: Search,
        title: "Step 2: Describe Your Symptoms",
        description: "Enter your symptoms, duration, and other relevant details for analysis.",
        color: "bg-slate-100 text-slate-800",
    },
    {
        icon: BrainCircuit,
        title: "Step 3: Get AI-Powered Analysis",
        description: "AI analyzes your symptoms and provides possible conditions and useful health insights.",
        color: "bg-emerald-100 text-emerald-800",
    },
    {
        icon: Stethoscope,
        title: "Step 4: Receive Guidance",
        description: "Receive precautions and suggested medical specialists based on your reported symptoms.",
        color: "bg-purple-100 text-purple-800",
    },
];

export default function HowItWork() {
    return(
        <section className="bg-gradient-to-b from-blue-50/50 to-white px-5 py-16 sm:px-8 lg:py-20">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap7">
                    {steps.map(({ icon:Icon, title, description, color}) => (
                        <article key={title} className="relative flex flex-col items-center text-center">
                            <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm ${color}`}>
                                <Icon size={30} strokeWidth={1.8} />
                            </div>

                            <h3 className="mb-4 min-h-12 text-lg font-bold leading-6 text-[#080B20]">
                                {title}
                            </h3>

                            <p className="max-w-xs text-sm leading-7 text-slate-600">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
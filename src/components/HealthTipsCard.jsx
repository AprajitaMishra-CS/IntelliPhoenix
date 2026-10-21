import DashboardCard from "./DashboardCard";
import { Droplet, Dumbbell, Apple, Moon } from "lucide-react";

export default function HealthTipsCard() {
    return(
        <section>
            <h2 className="mb-3 text-lg font-bold text-slate-900">
                Health Tips for You
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                    [Droplet, "Stay hydrated", "Drink water regularly throughout the day.", "indigo"],
                    [Dumbbell, "Stay active", "Choose movement that suits your abilities.", "purple"],
                    [Apple, "Eat balanced meals", "Include a variety of nutritious foods.", "blue"],
                    [Moon, "Rest well", "Aim for a consistent, restful sleep routine.", "emerald"],
                ].map(([Icon, title, description, color]) => (
                    <DashboardCard key={title} className="p-4">
                        <div className="flex flex-cols gap-5">
                            <div className={`flex h-11 w-14 items-center justify-center rounded-xl bg-${color}-100 text-${color}-700`}>
                                <Icon size={23} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">
                                    {title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {description}
                                </p>
                            </div>
                        </div>
                    </DashboardCard>
                ))}
            </div>
        </section>
    )
}
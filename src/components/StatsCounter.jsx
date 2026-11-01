import { useEffect, useState, useRef } from "react";
import { UserRound, Stethoscope, CalendarDays, Users } from "lucide-react";

const statsConfig = [
    {
        key: "patients",
        suffix: "+",
        label: "Patients",
        icon: UserRound,
        color: "bg-teal-100 text-teal-700"
    },
    {
        key: "doctors",
        suffix: "+",
        label: "Doctors",
        icon: Stethoscope,
        color: "bg-sky-100 text-sky-700",
    },
    {
        key: "appointments",
        suffix: "+",
        label: "Appointments",
        icon: CalendarDays,
        color: "bg-indigo-100 text-indigo-700"
    },
    {
        key: "totalUsers",
        suffix: "+",
        label: "Total Users",
        icon: Users,
        color: "bg-blue-100 text-blue-700"
    }
];

function Counter({target, start}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if(!start) {
            setCount(0);
            return;
        }

        let frameId;
        const duration = 1800;
        let startTime;

        const animate = (timestamp) => {
            if(!startTime) startTime = timestamp;

            const progress = Math.min(
                (timestamp - startTime)/duration, 1
            );

            // Ease out animation
            const eased = 1-Math.pow(1-progress, 3);

            setCount(Math.floor(eased * target));

            if(progress < 1){
                frameId = requestAnimationFrame(animate);
            }
        };

        frameId = requestAnimationFrame(animate);

        return() => cancelAnimationFrame(frameId);
    }, [target, start]);

    return <>{count.toLocaleString("en-IN")}</>;
}

export default function StatsCounter() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [stats, setStats] = useState({
        patients: 0,
        doctors: 0,
        appointments: 0,
        totalUsers: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const resposne = await fetch(`${import.meta.env.VITE_API_URL}/api/stats`);

                if(!resposne.ok){
                    throw new Error("Failed to fetch statistics.");
                }

                const data = await resposne.json();

                setStats(data.stats);

            } catch(error) {
                console.error("Statistics error: ", error);
            }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if(!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.25}
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);


    return (
        <section ref={sectionRef} aria-label="Application statistics" className="w-full border-y border-blue-100 bg-white/80 px-5 py-8 sm:py-10">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                {statsConfig.map(({key, suffix, label, icon:Icon, color}) => (
                    <div key={label} className="flex items-center justify-center gap-3">
                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${color}`}>
                            <Icon size={26} strokeWidth={1.8}/>
                        </div>
                        <div>
                            <p className="text-2xl font-bold tracking-tight text-[#080B20] sm:text-3xl">
                                <Counter target={stats[key]} start={isVisible} />
                                {suffix}
                            </p>
                            <p className="mt-1 text-sm text-slate-500 sm:txt-base">
                                {label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
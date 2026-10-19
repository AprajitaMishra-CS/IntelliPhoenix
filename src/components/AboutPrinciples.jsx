import { Eye, Target, HandHeart, Handshake } from "lucide-react";

const priniciples = [
    {
        icon: Eye,
        title: "Our Vision",
        description: "A healthier society through technology.",
    },
    {
        icon: Target,
        title: "Our Mission",
        description: "To make quality healthcare accessible to everyone.",
    },
    {
        icon: HandHeart,
        title: "Our Values",
        description: "Trust, Innovation, Care and Privacy.",
    },
    {
        icon: Handshake,
        title: "Our Commitment",
        description: "Your health and privacy always come first.",
    },
];

export default function AboutPrinciples() {
    return(
        <section className="bg-white px-5 py-10 sm:px-8 rounded-md">
            <div className="mx-auto grid max-w-7xl grid-cols sm:grid-cols-2 lg:grid-cols-4">
                {priniciples.map(({ icon:Icon, title, description}, index) => (
                    <article key={title} className={`flex flex-col items-center px-6 py-6 text-center ${
                        index!=3 ? "lg:border-r lg:border-slate-200" : ""
                    }`}>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-[#315D9B]">
                            <Icon size={24} strokeWidth={1.8} />
                        </div>

                        <h2 className="text-lg font-bold text-[#080B20]">
                            {title}
                        </h2>

                        <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">
                            {description}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}
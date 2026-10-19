export default function FeatureCardsStat() {
    const quickFeatures = [
        "AI Symptom Checker",
        "Appointment Booking",
        "Doctor Recommendation",
        "Digital Reports",
        "Precautions",
        "Severity Level",
    ];

    return (
        <section className="bg-gradient-to-b from-white to-blue-50/50 px-5 py-12 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
                    {quickFeatures.map((feature, index) => (
                        <div key={feature} className="flex min-h-28 items-center justify-center rounded-2xl border border-blue-100 bg-white/80 px-3 py-5 text-center shadow-[0_5px_18px_rgba(30, 64, 175, 0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_10px_24px_rgba(30, 64, 175, 0.13)]">
                            <p className="text-sm font-semibold leading-5 text-[#17213D] sm:text-base">
                                <span className="mb-1 block text-[#315D9B]">
                                    {index+1}
                                </span>
                                {feature}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


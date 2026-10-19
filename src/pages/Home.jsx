import { ShieldCheck, BrainCircuit, CalendarCheck, FileText, ChartNoAxesCombined, HeartPulse } from "lucide-react";

import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import StatsCounter from "../components/StatsCounter";
import FeatureCardsStat from "../components/FeatureCardsStat";
import HowItWork from "../components/HowItWork";

export default function Home() {
    return(
        <section>
            <div className="heroSection px-12 py-16">
                <HeroSection/>
            </div>

            <div className="mt-8 flex justify-center">
                <p className="rounded-4xl px-4 py-2 bg-[#C4DBF7] text-md text-navy-900 mb-4 w-fit flex flex-column">
                    Why Choose IntelliPhoenix ?
                </p>
            </div>

            <div className="mt-4 flex justify-center">
                <p className="text-2xl font-bold text-[#0F172B]">
                    Everything You Need for Better Healthcare
                </p>
            </div>

            <div className="features-grid px-6 py-16">
                <FeatureCard icon={ShieldCheck} title="AI Symptom Analysis" description="Advanced AI analyzes your symptoms and predicts possible conditions with accuracy." />

                <FeatureCard icon={BrainCircuit} title="Find Specialists" description="Connect with top doctors across various specializations."/>

                <FeatureCard icon={CalendarCheck} title="Book Appointment" description="Book appointments with verified specialists in just few clicks." />
            
                <FeatureCard icon={FileText} title="Digital Reports" description="Store and manage your reports, prescriptions, and medical history securely." />

                <FeatureCard icon={ChartNoAxesCombined} title="Health Insights" description="Get personalized health insights and recommendations." />

                <FeatureCard icon={HeartPulse} title="Emergency Guidance" description="Get Guidance on urgent symptoms and when to seek immediate medical attention." />
            </div>

            <hr className="hrtag"/>

            <div className="mt-8 flex justify-center">
                <p className="rounded-4xl px-4 py-2 bg-[#C4DBF7] text-md text-navy-900 mb-4 w-fit flex flex-column">
                    Simple &amp; Fast
                </p>
            </div>

            <div className="mt-4 flex justify-center mb-6">
                <p className="text-2xl font-bold text-[#0F172B]">
                    How It Works
                </p>
            </div>

            <HowItWork/>

            <p className="text-red-600 px-12 text-center">
                &#42; IntelliPhoenix provides AI-generated health insights for informational 
                purpose only. AI result are not a medical diagnosis and should not 
                replace professional medical consultation.
            </p>

            <hr className="hrtag"/>

            <div className="mt-4 flex justify-center mb-6">
                <p className="text-2xl font-bold text-[#0F172B]">
                    Features
                </p>
            </div>

            <FeatureCardsStat/>

            <StatsCounter/>

        </section>
    )
}
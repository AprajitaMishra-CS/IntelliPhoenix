import { useNavigate } from 'react-router-dom';

import Button from "../components/Button";
import { ShieldCheck, UsersRound, Clock3 } from "lucide-react";

export default function HeroSection() {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the target route path
        navigate('/register'); 
    };

    return (
        <div className="flex flex-column">
            <div className="leading-8">
                <p className="rounded-4xl px-4 py-2 bg-[#C4DBF7] text-md text-navy-900 mb-4 w-fit flex flex-column">
                    <img src="/assets/diamond.png" className="txtDiamond"/>
                    &nbsp;
                    AI-Powered Healthcare
                </p>

                <h1 className="text-6xl font-bold text-slate-900 flex flex-column">
                    IntelliPh<img src="/assets/logo.png" className="InTextLogo" />enix
                </h1>
                <p className="mb-4 mt-2 text-slate-600 text-xl">
                    Where Intelligence Inspires Recovery
                </p>

                <p className="text-2xl font-semibold mb-3">
                    <p>Smarter Care,</p>
                    <p className="text-blue-500">Better Health.</p>
                </p>

                <p className="mb-5 text-xl text-slate-600 leading-8">
                    Understand your symptoms, get possible insights, book appointment, <br/>
                    receive expert recommendations, and manage your health &mdash; all in one place.
                </p>

                <div className="mb-4">
                    <Button onClick={handleClick}>
                        Start Your Healthcare Journey &rArr; 
                    </Button>

                    &nbsp;&nbsp;

                    <Button variant="secondary">
                        Read More...
                    </Button>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    <div className="flex items-start gap-3">
                        <ShieldCheck size={30} strokeWidth={1.7} className="shrink-0 text-[#315D9B] mt-3"/>
                        <div>
                            <h3 className="text-md font-medium text-[#526B9A]">Your Data, Our Priority</h3>
                            <p className="text-sm text-slate-500">Secure &amp; Private</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <UsersRound size={30} strokeWidth={1.7} className="shrink-0 text-[#315D9B] mt-3"/>
                        <div>
                            <h3 className="text-md font-medium text-[#526B9A]">AI-Assisted Insights</h3>
                            <p className="text-xs text-slate-500">Not a replacement for a doctor</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 w-fit">
                        <Clock3 size={30} strokeWidth={1.7} className="shrink-0 text-[#315D9B] mt-3"/>
                        <div>
                            <h3 className="text-md font-medium text-[#526B9A]">Available 24/7</h3>
                            <p className="text-sm text-slate-500">Healthcare support anytime</p>
                        </div>
                    </div>
                </div>

                <p className="font-semibold text-lg text-slate-500 py-5 mt-8">
                    PEOPLE &nbsp;&bull;&nbsp; TECHNOLOGY &nbsp;&bull;&nbsp; A HEALTHIER TOMORROW
                </p>

            </div>

            <div className="ml-12">
                <img src="/assets/heroSectionImg.png" className="heroSecImg" />
            </div>
        </div>
    )
}
import AboutPrinciples from "../components/AboutPrinciples";
import StatsCounter from "../components/StatsCounter";

export default function About() {
    return (
        <section className="px-12 py-16">
            <div className="flex flex-row">
                <div>
                    <h1 className="text-6xl font-bold text-slate-900 flex flex-column">
                        About IntelliPhoenix
                    </h1>
                    <p className="mb-4 mt-2 text-slate-600 text-xl">
                        A smarter step towards a healthier tomorrow.
                    </p>
                    <p className="mt-8 mb-3 text-slate-700 text-lg">
                        IntelliPhoenix is an AI-powered healthcare platform designed to make <br/>
                        healthcare more accessible, efficient, and patient-centric. Our goal is to <br/>
                        use artificial intelligence to assist users in understanding their symptoms, <br/>
                        providing possible health insights, suggesting appropriate medical specialists, <br/>
                        and simplifying appointment booking — all in one place
                    </p>
                </div>

                <div className="ml-40">
                    <img src="/assets/aboutHeroSection.png" className="AboutHeroSecImg" />
                </div>
            </div>

            <div>
                <AboutPrinciples/>

                <StatsCounter/>

                <p className="mt-12 text-slate-700">
                    Healthcare is one of the most important sectors in modern society, 
                    where efficient patient management and timely medical assistance play 
                    a significant role in improving healthcare services. Traditional healthcare 
                    systems often rely on manual appointment handling and paper-based record 
                    management, which can lead to delays, inefficiency, and communication problems 
                    between patients and healthcare providers.
                </p>
                <br/>
                <p className="text-slate-700">
                    With the rapid growth of digital technologies and artificial intelligence, 
                    healthcare services are gradually shifting towards smart and automated systems. 
                    AI-based healthcare applications help improve accessibility, reduce manual 
                    workload, and provide preliminary assistance to users through intelligent 
                    automation and data processing.
                </p>
                <br/>
                <p className="text-slate-700">
                    The Web Application, “IntelliPhoenix” is designed to provide a smart 
                    healthcare platform that integrates appointment management with AI-assisted 
                    symptom guidance. Based on the symptoms provided by the user, the application 
                    generates AI-assisted responses such as possible health concerns, severity levels, 
                    specialist recommendations, and basic precautions.
                </p>
                <br/>
                <p className="text-slate-700">
                    The primary objective of this Application is to simplify healthcare appointment 
                    management and improve preliminary healthcare assistance through automation, 
                    intelligent response generation, and digital record management. The system is 
                    intended to enhance healthcare accessibility while reducing manual effort and 
                    improving user experience.
                </p>
                <br/>
                <p className="text-slate-700">
                    The “IntelliPhoenix” is a smart healthcare management system designed to improve 
                    the efficiency of appointment handling and provide preliminary AI-assisted 
                    symptom guidance to patients. The system aims to simplify communication between 
                    patients and healthcare providers through digital automation and intelligent assistance.
                </p>
                <br/>
                <p className="text-slate-700">
                    The application allows users to register, login, book appointments, manage 
                    schedules, and enter symptoms through an interactive web interface. Based 
                    on the symptoms provided by the user, the system generates AI-assisted responses 
                    such as possible health concerns, severity levels, recommended specialists, and 
                    basic precautions. The application also includes separate dashboards for patients, 
                    doctors, and administrators for efficient management of healthcare-related activities.
                </p>

                <p className="text-red-600 px-12 text-center mt-12 mb-4">
                    &#42; Disclaimer: The AI responses generated by the system 
                    are informational only and do not replace professional 
                    medical diagnosis or consultation.
                </p>
            </div>
        </section>
    )
}
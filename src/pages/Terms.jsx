import PageHeader from "../components/PageHeader";
import AccordionItem from "../components/AccordianItem";

export default function Terms() {
    return (
        <section className="px-12 py-16">
            <PageHeader eyebrow="" title="Terms & Conditions" description="Last Updated: September 2026"/>

            <p className="mt-12 text-slate-700 text-center">
                Welcome to IntelliPhoenix. By using this website, you agree to 
                comply with and be bound by the following terms and conditions.
            </p>

            <br/>

            <AccordionItem title="Acceptance of Terms" children="By accessing or using IntelliPhoenix, you agree to comply with and be bound by these terms and conditions. We may collect the following information: Full Name, Email Address, Phone Number, Password (stored securely in encrypted form), Date of Birth, Gender, Location (i.e., City, State and Country), Appointment Details, Symptoms entered for AI analysis"/>
            <br/>
            <AccordionItem title="User Responsibilities" children="Users agree to: Provide accurate and complete information during registration and use of the site, Keep login credentials secure and confidential, Use the AI-based symptom suggestions responsibly, Not misuse the platform for illegal or harmful activities."/>
            <br/>
            <AccordionItem title="AI Recommendations" children="The AI symptom analyzer is designed to assist users in understanding potential health issues based on their input. It does not diagnose diseases and should never replace consultation with a licensed healthcare professional."/>
            <br/>
            <AccordionItem title="Appointment Services" children="Users are responsible for: Providing accurate information when booking appointments, Selecting the appropriate appointment type and provider, Following any pre-appointment instructions provided. Appointment availability is subject to change, and we recommend checking our website or contacting us for the latest information."/>
            <br/>
            <AccordionItem title="Account Security" children="Users are responsible for maintaining the confidentiality of their account information, including passwords. Any activity performed through your account is considered your responsibility."/>
            <br/>
            <AccordionItem title="Prohibited Activities" children="Users are prohibited from: Using the platform for any illegal or unauthorized purpose, Attempting to gain unauthorized access to any part of the website, Interfering with the security or integrity of the website, Using automated means to access the website, Misuse AI-generated content or insights." />
            <br/>
            <AccordionItem title="Limitations of Liability" children="IntelliPhoenix is not liable for any medical decisions made based on the AI-generated symptom suggestions. Always consult a qualified healthcare professional for medical decisions."/>
            <br/>
            <AccordionItem title="Intellectual Property" children="All content, trademarks, and other intellectual property on the platform are the property of IntelliPhoenix or its licensors. Users may not use, reproduce, or distribute any content from the platform without explicit permission." />
            <br/>
            <AccordionItem title="Changes to Terms" children="We reserve the right to modify these terms and conditions at any time. Continued use of the platform after any changes indicates acceptance of the updated terms." />
            <br/>
            <AccordionItem title="Contact Us" children="If you have any questions or concerns about our privacy policy, please contact us: Email: support@intelliphoenix.com , Phone: +91 XXXXX XXXXX" />

             <p className="text-red-600 px-12 text-center mt-12 mb-4">
                &#42;  Please read these terms and conditions carefully before using IntelliPhoenix. <br/>
                By continuing to use our services, you agree to these conditions.
            </p>

            </section>
    )
}
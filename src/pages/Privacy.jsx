import PageHeader from "../components/PageHeader";
import AccordionItem from "../components/AccordianItem";

export default function Privacy() {
    return (
        <section className="px-12 py-16">
            <PageHeader eyebrow="" title="Privacy Policy" description="Last Updated: September 2026"/>

            <p className="mt-12 text-slate-700">
                At IntelliPhoenix, we are committed to protecting your policy and ensuring 
                the security of your personal information. The Privacy Policy explains how 
                we collect, use, and safeguard your information when you use our website and services. 
                We aim to handle your information responsibly and transparetly while taking reasonable 
                measures to prevent unauthorized access, misuse, alteration, or disclosure. By using 
                IntelliPhoenix, you acknowledge and agree to the practices described in this Privacy Policy.
            </p>

            <br/>

            <AccordionItem title="1. Information We Collect" children="We collect information from you when you visit our site, register on our site, place an order, subscribe to our newsletter, or interact with us in other ways. Full Name, Email Address, Phone Number, Password (stored securely in encrypted form), Date of Birth, Gender, Location (i.e., City, State and Country), Appointment Details, Symptoms entered for AI analysis"/>
            <br/>
            <AccordionItem title="2. How We Use Your Information ?" children="We use the information we collect from you in the following ways: To personalize your experience on our site, To improve our website and services, To generate AI-based symptoms suggestions, Maintain security and prevent unauthorized access, To respond to your inquiries and support needs, To comply with legal obligations and protect our rights, To manage your appointments, To analyze symptoms entered for AI analysis"/>
            <br/>
            <AccordionItem title="3. How Does Our AI Feature Work ?" children="The AI symptom analyzer provides preliminary suggestions based on the information you provide. However, it is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. It is not a replacement for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical decisions."/>
            <br/>
            <AccordionItem title="4.How Do We Keep Your Data Secure ?" children="We use appropriate security measures to protect your personal information from unauthorized access, use, or disclosure. This includes encryption, firewalls, and secure server hosting. Passwords are stored securely using strong hashing algorithms, and access to personal information is restricted to authorized personnel only."/>
            <br/>
            <AccordionItem title="5. Do We Sell Your Data ?" children="We do not sell or rent your personal information to third parties. We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release information when it's release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property or safety. Your information may only be shared with authorized healthcare professionals involved in your care."/>
            <br/>
            <AccordionItem title="6. How Do We Use Cookies ?" children="Our website may use cookies to: Keep you logged in, Remember your preferences, Improve user experience, Analyze how our website is used." />
            <br/>
            <AccordionItem title="7. What Rights Do You Have ?" children="You have rights regarding your personal information, including the right to: Access your data, Request correction of your data, Request deletion of your data, Object to processing of your data."/>
            <br/>
            <AccordionItem title="8. Can This Privacy Policy Change ?" children="This Privacy Policy may be updated periodically. Any changes will be reflected on this page." />
            <br/>
            <AccordionItem title="9. How Can You Contact Us ?" children="If you have any questions or concerns about our privacy policy, please contact us: Email: support@intelliphoenix.com , Phone: +91 XXXXX XXXXX" />

             <p className="text-red-600 px-12 text-center mt-12 mb-4">
                &#42; Your privacy matters. We are committed to 
                protecting your personal information and ensuring 
                secure healthcare interactions.
            </p>

            </section>
    )
}
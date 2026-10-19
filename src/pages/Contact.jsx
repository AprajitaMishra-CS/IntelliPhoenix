import { Mail, Phone, MapPin, Clock, icons } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useState } from "react";
import ContactInfoCard from "../components/ContactInfoCard";
import Button from "../components/Button";
import { href } from "react-router-dom";

const initialForm = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agree: false,
};

export default function Contact() {
    const [ formData, setFormData ] = useState(initialForm);
    const [ status, setStatus] = useState(""); 

    function handleChange(event) {
        const {name, value, type, checked} = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));

        setStatus("");
    }

    function handleSubmit(event) {
        event.preventDefault();

        setStatus(
            "Your form is validated, but message submission is not connected yet."
        );
    }

    const inputClass = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50/60 via-white to-white px-6 py-8">
            <section className="text-center sm:px-8 sm:pt-20">
                <p className="[word-spacing:6px] font-bold text-7xl mb-6">
                    GET IN TOUCH
                </p>
                <p className="text-slate-600 [word-spacing:8px] text-xl">
                    We're here to help you with your healthcare journey. <br/>
                    Feel free to reach out to us.
                </p>
                <br/>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
                    Have a question or feedback about IntelliPhoenix? 
                    We would love to hear from you.
                </p>
            </section>

            <section className="px-5 pb-16 mt-8 sm:px-8 lg:pb-20">
                <div className="mx-auto w-full max-w-none">
                    {/* Contact Information */}
                    <div className="h-full w-full rounded-2xl bg-[#080B20] p-7 text-white shadow-lg sm:p-8">
                        <h2 className="text-2xl font-bold">
                            Let's Talk
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-slate-300">
                            Reach out to us for questions, suggestions, or feedback about our healthcare platform.
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-br from-white via-blue-50/50 to-slate-50 px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
                    <div className="grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-[2fr_1fr] lg:gap-8">
                        {/* Contact Form */}
                        <div className="min-w-0 rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-8">
                            <h2 className="mb-6 text-2xl font-bold text-[#080B20]">
                                Send us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-sm font-medium text-slate-700">Name</label>
                                    <input id="name" name="name" type="text" autoComplete="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} className={inputClass} required />
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                                        <input id="email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} className={inputClass} required /> 
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</label>
                                        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} className={inputClass} required /> 
                                    </div>
                                </div>
                                        
                                <div>
                                    <label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</label>
                                    <input id="subject" name="subject" type="text" placeholder="Subject" value={formData.subject} onChange={handleChange} className={inputClass} required /> 
                                </div>

                                <div>
                                    <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                                    <input id="message" name="message" row={4} placeholder="Write your message..." value={formData.message} onChange={handleChange} className={`${inputClass} resize-y`} required /> 
                                </div>

                                <label className="flex items-start gap-3 text-sm text-slate-700">
                                    <input name="agree" type="checkbox" checked={formData.agree} onChange={handleChange} className="mt-1 accent-blue-600" required />
                                    <span>I agree to the terms &amp; conditions.</span>
                                </label>

                                <div className="flex flex-wrap justify-center gap-3 pt-2">
                                    <Button type="reset" variant="secondary" onClick={() => setFormData({
                                            name: "",
                                            email: "",
                                            phone: "",
                                            email: "",
                                            subject: "",
                                            message: "",
                                            agree: false,
                                        })
                                    }
                                    >
                                        Reset
                                    </Button>

                                    <Button type="submit">
                                        Send Message <span aria-hidden="true">&rarr;</span>
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="min-w-0">
                            <ContactInfoCard
                                title="Contact Information"
                                items={[
                                    {
                                        label: "Email",
                                        value: "supportintelliphoenix@gmail.com\nsupport@intelliphoenix.com\nintelliphoenix@support.com",
                                        icon: Mail,
                                    },
                                    {
                                        label: "Phone",
                                        value: "+91 xxxxx xxxxx",
                                        icon: Phone,
                                    },
                                    {
                                        label: "Address",
                                        value: "Gorakhpur, Uttar Pradesh, India",
                                        icon: MapPin,
                                    },
                                    {
                                        label: "Working Hours",
                                        value: "Sunday-Saturday\nTime: 24/7",
                                        icon: Clock,
                                    },
                                ]}
                                socialLinks={[
                                    {label: "Facebook", href: "https://facebook.com", icon: FaFacebook},
                                    {label: "Instagram", href: "https://instagram.com", icon: FaInstagram},
                                    {label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin},
                                    {label: "YouTube", href: "https://youtube.com", icon: FaYoutube},
                                ]}
                            />
                        </div>
                    </div>
            </section>

            <section className="px-5 pb-16 mt-8 sm:px-8 lg:pb-20">
                <div className="h-full w-full rounded-2xl border border-red-100 bg-red-50/70 p-6">
                    <h3 className="font-semibold text-red-800">
                        Medical Disclaimer
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-red-700">
                        This form is for general queries and feedback, not medical emergencies. 
                        Please do not share sensitive medical information here. 
                    </p>
                </div>
            </section>
        </main>
    )
}
export default function AuthCard({ children, className=""}) {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-cyan-50 px-4 py-10">
            <div className={`w-full max-w-2xl rounded-3xl border border-blue-100 bg-white/80 p-6 shadow-xl shadow-blue-900/10 backdrop-blur-sm sm:p-10 ${className}`}>
                {children}
            </div>
        </section>
    );
}
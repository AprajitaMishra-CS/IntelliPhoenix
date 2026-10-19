export default function FeatureCard({ icon:Icon, title, description }) {
    return (
        <article className="feature-card">
            <div className="feature-card-icon">
                <Icon size={26} strokeWidth={1.8} />
            </div>

            <h3>{title}</h3>

            <p>{description}</p>
        </article>
    )
}
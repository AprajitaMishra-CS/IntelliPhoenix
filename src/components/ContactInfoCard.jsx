export default function ContactInfoCard({ title, items, socialLinks, }) {
  return (
    <div className="h-full rounded-2xl border border-blue-100 bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-[#080B20]">
        {title}
      </h2>

      <div className="space-y-5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex gap-3">
              <Icon
                size={19}
                className="mt-1 shrink-0 text-[#244B8F]"
              />

              <div className="min-w-0">
                <h3 className="font-semibold text-[#17213D]">
                  {item.label}
                </h3>

                <p className="mt-1 whitespace-pre-line break-words text-sm leading-6 text-slate-600">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="mt-7 mb-4 font-bold text-[#080B20]">
        Follow Us
      </h3>

      <div className="flex flex-wrap gap-4">
        {socialLinks.map((social) => {
          const Icon = social.icon;

          return (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noreferrer"
              className="text-[#17213D] transition hover:text-blue-600"
            >
              <Icon size={20} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
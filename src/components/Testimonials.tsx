import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const avatarColors = [
  "bg-[linear-gradient(135deg,oklch(0.55_0.15_300),oklch(0.65_0.12_300))]",
  "bg-[linear-gradient(135deg,oklch(0.60_0.15_200),oklch(0.80_0.16_170))]",
  "bg-[linear-gradient(135deg,oklch(0.65_0.2_30),oklch(0.70_0.15_50))]",
];

export function Testimonials() {
  const { t } = useI18n();

  const testimonials = [
    { text: t.testimonials.t1Text, name: t.testimonials.t1Name, role: t.testimonials.t1Role, initials: "AK" },
    { text: t.testimonials.t2Text, name: t.testimonials.t2Name, role: t.testimonials.t2Role, initials: "MS" },
    { text: t.testimonials.t3Text, name: t.testimonials.t3Name, role: t.testimonials.t3Role, initials: "RF" },
  ];

  return (
    <section className="bg-surface py-20 sm:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/8 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
            {t.testimonials.badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 whitespace-pre-line"
          >
            {t.testimonials.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-light max-w-xl mx-auto"
          >
            {t.testimonials.subtitle}
          </motion.p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 mb-16">
          {testimonials.map((tm, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-7 hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              <div className="flex gap-0.5 mb-3.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-[oklch(0.75_0.15_85)] text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">{tm.text}</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${avatarColors[i]} grid place-items-center text-xs font-bold text-foreground`}>
                  {tm.initials}
                </div>
                <div>
                  <div className="text-sm font-bold">{tm.name}</div>
                  <div className="text-xs text-muted-foreground">{tm.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cities strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-border pt-10"
        >
          <div className="text-center text-xs text-muted-foreground uppercase tracking-wider mb-6">{t.testimonials.citiesLabel}</div>
          <div className="flex flex-wrap justify-center gap-3">
            {t.testimonials.cities.map((city, i) => (
              <div
                key={i}
                className={`px-5 py-2 rounded-full border text-sm flex items-center gap-2 ${
                  city.status === "launch"
                    ? "border-primary/30 bg-primary/7 text-primary"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {city.status === "launch" ? "🟢" : "🕐"} {city.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

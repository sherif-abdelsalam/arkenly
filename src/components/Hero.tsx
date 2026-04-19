import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t, dir } = useI18n();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(true);
      return;
    }
    setError(false);
    setEmail("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.15_300/18%),transparent_70%)]" />
        <div className="absolute top-[100px] -right-[150px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.80_0.16_170/10%),transparent_70%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(oklch(1 0 0 / 3%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 3%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/8 text-sm mb-6">
              <span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wider">
                {t.hero.badgeNew}
              </span>
              <span className="text-muted-foreground text-xs">{t.hero.badgeText}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6 text-foreground">
              <span className="block">{t.hero.title1}</span>
              <span className="block text-primary">{t.hero.titleAccent}</span>
              <span className="block">{t.hero.title2}</span>
            </h1>

            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8 max-w-lg">
              {t.hero.subtitle}
            </p>

            {/* Email form */}
            <div className="flex flex-wrap gap-2.5 mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder={t.hero.emailPlaceholder}
                className={`flex-1 min-w-[220px] px-5 py-3.5 rounded-full bg-card border ${error ? "border-destructive" : "border-border"} text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors`}
              />
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all whitespace-nowrap"
              >
                {t.hero.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
            {error && <p className="text-sm text-destructive ms-4 mb-4">{t.hero.emailError}</p>}
            {submitted && (
              <p className="text-sm text-primary ms-4 mb-4">✓ You're on the list!</p>
            )}

            <Link
              to="/book"
              className="mt-3 inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-primary/40 bg-primary/5 text-primary font-bold text-sm hover:bg-primary/10 hover:border-primary transition-all"
            >
              {t.nav.tryNow}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === "rtl" ? "scaleX(-1)" : undefined }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>

            {/* Social proof */}
            <div className="flex items-center gap-3.5 mt-6">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {["bg-violet", "bg-primary", "bg-destructive", "bg-success"].map((bg, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-background ${bg} grid place-items-center text-[10px] font-bold text-primary-foreground`}>
                    {["AK", "MS", "RF", "OT"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{t.hero.socialCount}</strong> {t.hero.socialProof}
              </p>
            </div>
          </motion.div>

          {/* Right: Phone Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[480px] hidden lg:flex items-center justify-center"
          >
            {/* Orbit rings */}
            <div className="absolute w-[360px] h-[360px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/8" />
            <div className="absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/6" />

            {/* Phone */}
            <div className="relative z-10 w-[240px] h-[480px] bg-card rounded-[36px] border-2 border-border shadow-2xl overflow-hidden" style={{ animation: "float 5s ease-in-out infinite" }}>
              <div className="w-[90px] h-[28px] bg-background rounded-b-[18px] mx-auto" />
              {/* Fake map */}
              <div className="relative w-full h-[220px] overflow-hidden" style={{ background: "linear-gradient(180deg, oklch(0.18 0.03 250) 0%, oklch(0.14 0.025 250) 100%)" }}>
                <div className="absolute inset-0" style={{
                  backgroundImage: "linear-gradient(oklch(0.80 0.16 170 / 7%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.80 0.16 170 / 7%) 1px, transparent 1px)",
                  backgroundSize: "28px 28px"
                }} />
                <div className="absolute h-[4px] w-full top-1/2 bg-foreground/10" />
                <div className="absolute w-[4px] h-full left-[40%] bg-foreground/10" />
                <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-7 h-7 rounded-full rounded-bl-none -rotate-45 bg-primary shadow-[0_0_20px_oklch(0.80_0.16_170/60%)]">
                  <svg className="rotate-45 w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="4" /></svg>
                </div>
                <div className="absolute bottom-[100px] right-[30px] w-5 h-5 rounded-full rounded-bl-none -rotate-45 bg-violet" />
                <div className="absolute bottom-[80px] left-[30px] w-4 h-4 rounded-full rounded-bl-none -rotate-45 bg-primary/70" />
              </div>
              {/* Phone UI */}
              <div className="p-4">
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-border text-[11px] text-muted-foreground mb-3.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  {t.hero.phoneSearch}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-primary/7 border border-primary/35 text-[11px]">
                    <div>
                      <div className="font-semibold text-[10px]">{t.hero.phoneSpot1}</div>
                      <div className="text-muted-foreground text-[9px] mt-0.5">{t.hero.phoneSpot1Info}</div>
                    </div>
                    <div className="font-bold text-primary text-[11px]">{t.hero.phoneSpot1Price}</div>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-foreground/5 border border-border text-[11px]">
                    <div>
                      <div className="font-semibold text-[10px]">{t.hero.phoneSpot2}</div>
                      <div className="text-muted-foreground text-[9px] mt-0.5">{t.hero.phoneSpot2Info}</div>
                    </div>
                    <div className="font-bold text-primary text-[11px]">{t.hero.phoneSpot2Price}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute top-[60px] -right-[30px] bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-3.5 px-4.5 shadow-2xl" style={{ animation: "float 6s ease-in-out infinite reverse" }}>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{t.hero.floatTimeSaved}</div>
              <div className="text-lg font-bold text-foreground"><span className="text-primary">{t.hero.floatTimeValue}</span> {t.hero.floatTimeUnit}</div>
              <div className="text-[10px] text-muted-foreground">{t.hero.floatTimeSub}</div>
            </div>
            <div className="absolute bottom-[80px] -left-[40px] bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-3.5 px-4.5 shadow-2xl" style={{ animation: "float 7s ease-in-out infinite", animationDelay: "1s" }}>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{t.hero.floatEarnings}</div>
              <div className="text-lg font-bold text-foreground"><span className="text-primary">{t.hero.floatEarningsValue}</span> {t.hero.floatEarningsCurrency}</div>
              <div className="text-[10px] text-success font-semibold">{t.hero.floatEarningsGrowth}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

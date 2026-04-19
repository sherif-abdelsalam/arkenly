import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

type Slot = { time: string; available: boolean; spotsLeft: number };
type Location = {
  id: string;
  nameEn: string;
  nameAr: string;
  areaEn: string;
  areaAr: string;
  pricePerHour: number;
  slots: Slot[];
};

const LOCATIONS: Location[] = [
  {
    id: "tahrir",
    nameEn: "Tahrir Square Garage",
    nameAr: "جراج ميدان التحرير",
    areaEn: "Downtown Cairo",
    areaAr: "وسط البلد",
    pricePerHour: 20,
    slots: [
      { time: "09:00", available: true, spotsLeft: 4 },
      { time: "10:00", available: true, spotsLeft: 2 },
      { time: "11:00", available: false, spotsLeft: 0 },
      { time: "12:00", available: true, spotsLeft: 6 },
      { time: "14:00", available: true, spotsLeft: 1 },
      { time: "16:00", available: false, spotsLeft: 0 },
    ],
  },
  {
    id: "zamalek",
    nameEn: "Zamalek Riverside",
    nameAr: "كورنيش الزمالك",
    areaEn: "Zamalek",
    areaAr: "الزمالك",
    pricePerHour: 25,
    slots: [
      { time: "09:00", available: true, spotsLeft: 3 },
      { time: "10:00", available: false, spotsLeft: 0 },
      { time: "11:00", available: true, spotsLeft: 5 },
      { time: "12:00", available: true, spotsLeft: 2 },
      { time: "14:00", available: true, spotsLeft: 4 },
      { time: "16:00", available: true, spotsLeft: 1 },
    ],
  },
  {
    id: "maadi",
    nameEn: "Maadi Grand Mall",
    nameAr: "مول المعادي الكبير",
    areaEn: "Maadi",
    areaAr: "المعادي",
    pricePerHour: 15,
    slots: [
      { time: "09:00", available: true, spotsLeft: 8 },
      { time: "10:00", available: true, spotsLeft: 6 },
      { time: "11:00", available: true, spotsLeft: 4 },
      { time: "12:00", available: false, spotsLeft: 0 },
      { time: "14:00", available: true, spotsLeft: 2 },
      { time: "16:00", available: true, spotsLeft: 5 },
    ],
  },
  {
    id: "newcairo",
    nameEn: "Cairo Festival City",
    nameAr: "كايرو فستيفال سيتي",
    areaEn: "New Cairo",
    areaAr: "التجمع الخامس",
    pricePerHour: 18,
    slots: [
      { time: "09:00", available: false, spotsLeft: 0 },
      { time: "10:00", available: true, spotsLeft: 3 },
      { time: "11:00", available: true, spotsLeft: 7 },
      { time: "12:00", available: true, spotsLeft: 5 },
      { time: "14:00", available: false, spotsLeft: 0 },
      { time: "16:00", available: true, spotsLeft: 2 },
    ],
  },
  {
    id: "mohandessin",
    nameEn: "Mohandessin Plaza",
    nameAr: "بلازا المهندسين",
    areaEn: "Mohandessin",
    areaAr: "المهندسين",
    pricePerHour: 22,
    slots: [
      { time: "09:00", available: true, spotsLeft: 2 },
      { time: "10:00", available: true, spotsLeft: 4 },
      { time: "11:00", available: false, spotsLeft: 0 },
      { time: "12:00", available: true, spotsLeft: 1 },
      { time: "14:00", available: true, spotsLeft: 3 },
      { time: "16:00", available: false, spotsLeft: 0 },
    ],
  },
  {
    id: "heliopolis",
    nameEn: "Heliopolis Korba",
    nameAr: "كوربة مصر الجديدة",
    areaEn: "Heliopolis",
    areaAr: "مصر الجديدة",
    pricePerHour: 17,
    slots: [
      { time: "09:00", available: true, spotsLeft: 5 },
      { time: "10:00", available: true, spotsLeft: 3 },
      { time: "11:00", available: true, spotsLeft: 6 },
      { time: "12:00", available: true, spotsLeft: 2 },
      { time: "14:00", available: false, spotsLeft: 0 },
      { time: "16:00", available: true, spotsLeft: 4 },
    ],
  },
];

export function BookingMVP() {
  const { t, lang } = useI18n();
  const tb = (t as any).booking;
  const [locationId, setLocationId] = useState(LOCATIONS[0].id);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "unavailable">("idle");

  const location = useMemo(() => LOCATIONS.find((l) => l.id === locationId)!, [locationId]);
  const today = new Date().toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
    weekday: "long", day: "numeric", month: "long",
  });

  const handleConfirm = () => {
    if (!selectedSlot) return;
    const slot = location.slots.find((s) => s.time === selectedSlot);
    if (!slot || !slot.available) {
      setStatus("unavailable");
      return;
    }
    // 85% chance of success to simulate real-world race conditions
    setStatus(Math.random() > 0.15 ? "success" : "unavailable");
  };

  const reset = () => {
    setStatus("idle");
    setSelectedSlot(null);
  };

  const locName = lang === "ar" ? location.nameAr : location.nameEn;
  const locArea = lang === "ar" ? location.areaAr : location.areaEn;

  return (
    <section id="booking" className="relative py-20 sm:py-28 overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--hero-glow),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-xs font-bold uppercase tracking-wider text-primary mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px] shadow-primary" />
            {tb.label}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            {tb.title}
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            {tb.subtitle}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Location selector */}
                <div className="mb-7">
                  <label className="block text-sm font-bold text-foreground mb-3">{tb.locationLabel}</label>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {LOCATIONS.map((loc) => {
                      const active = loc.id === locationId;
                      return (
                        <button
                          key={loc.id}
                          onClick={() => { setLocationId(loc.id); setSelectedSlot(null); }}
                          className={`text-start p-3.5 rounded-xl border transition-all ${
                            active
                              ? "bg-primary/10 border-primary text-foreground"
                              : "bg-background border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          <div className="font-semibold text-sm">{lang === "ar" ? loc.nameAr : loc.nameEn}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {lang === "ar" ? loc.areaAr : loc.areaEn} · {loc.pricePerHour} {tb.perHour}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Date display */}
                <div className="mb-7">
                  <label className="block text-sm font-bold text-foreground mb-3">{tb.dateLabel}</label>
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    {today}
                  </div>
                </div>

                {/* Slots */}
                <div className="mb-7">
                  <label className="block text-sm font-bold text-foreground mb-3">{tb.slotsLabel}</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                    {location.slots.map((slot) => {
                      const active = selectedSlot === slot.time;
                      return (
                        <button
                          key={slot.time}
                          onClick={() => slot.available && setSelectedSlot(slot.time)}
                          disabled={!slot.available}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            !slot.available
                              ? "bg-muted/40 border-border text-muted-foreground cursor-not-allowed line-through"
                              : active
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-background border-border text-foreground hover:border-primary/50"
                          }`}
                        >
                          <div className="font-bold text-sm">{slot.time}</div>
                          <div className={`text-[10px] mt-0.5 ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                            {slot.available ? `${slot.spotsLeft} ${tb.spotsLeft}` : tb.full}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Confirm */}
                <button
                  onClick={handleConfirm}
                  disabled={!selectedSlot}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {selectedSlot ? `${tb.confirm} · ${location.pricePerHour} ${tb.perHour}` : tb.selectSlot}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-success/15 grid place-items-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="oklch(0.70 0.18 145)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-2">{tb.successTitle}</h3>
                <p className="text-muted-foreground mb-6">
                  {tb.successMsg.replace("{location}", `${locName} (${locArea})`).replace("{slot}", selectedSlot!)}
                </p>
                <button onClick={reset} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:-translate-y-0.5 transition-transform">
                  {tb.bookAnother}
                </button>
              </motion.div>
            )}

            {status === "unavailable" && (
              <motion.div key="fail" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-destructive/15 grid place-items-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-destructive"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-2">{tb.unavailableTitle}</h3>
                <p className="text-muted-foreground mb-6">{tb.unavailableMsg}</p>
                <button onClick={reset} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:-translate-y-0.5 transition-transform">
                  {tb.bookAnother}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

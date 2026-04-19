import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

type Location = {
  id: string;
  name_en: string;
  name_ar: string;
  area_en: string;
  area_ar: string;
  price_per_hour: number;
  capacity_per_slot: number;
};

type Slot = {
  id: string;
  location_id: string;
  time: string;
  capacity: number;
};

type SlotWithCount = Slot & { booked: number; isMine: boolean };

export function BookingMVP() {
  const { t, lang } = useI18n();
  const tb = (t as any).booking;
  const { user } = useAuth();
  const today = new Date().toISOString().slice(0, 10);
  const todayLabel = new Date().toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
    weekday: "long", day: "numeric", month: "long",
  });

  const [locations, setLocations] = useState<Location[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [bookings, setBookings] = useState<{ slot_id: string; user_id: string }[]>([]);
  const [locationId, setLocationId] = useState<string>("");
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "unavailable" | "loading">("loading");
  const [submitting, setSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    const [{ data: locs }, { data: sl }, { data: bk }] = await Promise.all([
      supabase.from("locations").select("*").order("name_en"),
      supabase.from("slots").select("*"),
      supabase.from("bookings").select("slot_id, user_id").eq("booking_date", today).eq("status", "confirmed"),
    ]);
    if (locs) setLocations(locs);
    if (sl) setSlots(sl);
    if (bk) setBookings(bk);
    if (locs && locs.length && !locationId) setLocationId(locs[0].id);
    setStatus((s) => (s === "loading" ? "idle" : s));
  }, [today, locationId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const location = useMemo(() => locations.find((l) => l.id === locationId), [locations, locationId]);

  const slotsWithCount: SlotWithCount[] = useMemo(() => {
    if (!location) return [];
    return slots
      .filter((s) => s.location_id === location.id)
      .sort((a, b) => a.time.localeCompare(b.time))
      .map((s) => {
        const slotBookings = bookings.filter((b) => b.slot_id === s.id);
        return {
          ...s,
          booked: slotBookings.length,
          isMine: !!user && slotBookings.some((b) => b.user_id === user.id),
        };
      });
  }, [slots, bookings, location, user]);

  const handleConfirm = async () => {
    if (!selectedSlotId || !user) return;
    setSubmitting(true);
    const slot = slotsWithCount.find((s) => s.id === selectedSlotId);
    if (!slot || slot.booked >= slot.capacity) {
      setStatus("unavailable");
      setSubmitting(false);
      return;
    }
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      slot_id: selectedSlotId,
      booking_date: today,
    });
    setSubmitting(false);
    if (error) {
      setStatus("unavailable");
      return;
    }
    setStatus("success");
    await loadData();
  };

  const reset = () => {
    setStatus("idle");
    setSelectedSlotId(null);
  };

  const locName = location ? (lang === "ar" ? location.name_ar : location.name_en) : "";
  const locArea = location ? (lang === "ar" ? location.area_ar : location.area_en) : "";
  const selectedSlot = slotsWithCount.find((s) => s.id === selectedSlotId);

  return (
    <section id="booking" className="relative py-16 sm:py-24 overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--hero-glow),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-xs font-bold uppercase tracking-wider text-primary mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px] shadow-primary" />
            {tb.label}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-3">
            {tb.title}
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            {tb.subtitle}
          </p>
        </div>

        {!user && (
          <div className="mb-6 rounded-2xl border border-primary/30 bg-primary/5 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/15 grid place-items-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary"><path d="M12 11V7a5 5 0 0 1 10 0v4M5 11h14v11H5z"/></svg>
              </div>
              <div>
                <div className="font-bold text-sm text-foreground">{tb.loginRequired}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{tb.loginToBookMsg}</div>
              </div>
            </div>
            <Link
              to="/auth"
              search={{ redirect: "/book", mode: "login" }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-xs hover:-translate-y-0.5 transition-transform whitespace-nowrap"
            >
              {tb.signInNow}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {status === "loading" && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-muted-foreground text-sm">
                {tb.loadingSlots}
              </motion.div>
            )}

            {status === "idle" && location && (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Location selector */}
                <div className="mb-7">
                  <label className="block text-sm font-bold text-foreground mb-3">{tb.locationLabel}</label>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {locations.map((loc) => {
                      const active = loc.id === locationId;
                      return (
                        <button
                          key={loc.id}
                          onClick={() => { setLocationId(loc.id); setSelectedSlotId(null); }}
                          className={`text-start p-3.5 rounded-xl border transition-all ${
                            active
                              ? "bg-primary/10 border-primary text-foreground"
                              : "bg-background border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          <div className="font-semibold text-sm">{lang === "ar" ? loc.name_ar : loc.name_en}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {lang === "ar" ? loc.area_ar : loc.area_en} · {loc.price_per_hour} {tb.perHour}
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
                    {todayLabel}
                  </div>
                </div>

                {/* Slots */}
                <div className="mb-7">
                  <label className="block text-sm font-bold text-foreground mb-3">{tb.slotsLabel}</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                    {slotsWithCount.map((slot) => {
                      const remaining = slot.capacity - slot.booked;
                      const isFull = remaining <= 0;
                      const isMine = slot.isMine;
                      const active = selectedSlotId === slot.id;
                      return (
                        <button
                          key={slot.id}
                          onClick={() => !isFull && setSelectedSlotId(slot.id)}
                          disabled={isFull}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isMine
                              ? "bg-success/15 border-success text-foreground"
                              : isFull
                              ? "bg-destructive/10 border-destructive/40 text-destructive cursor-not-allowed"
                              : active
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-background border-border text-foreground hover:border-primary/50"
                          }`}
                        >
                          <div className={`font-bold text-sm ${isFull && !isMine ? "line-through" : ""}`}>{slot.time}</div>
                          <div className={`text-[10px] mt-0.5 leading-tight ${
                            active ? "text-primary-foreground/85" :
                            isMine ? "text-foreground/70 font-semibold" :
                            isFull ? "text-destructive font-semibold" :
                            "text-muted-foreground"
                          }`}>
                            {isMine ? "✓ You" : isFull ? tb.alreadyBooked : `${remaining} ${tb.spotsLeft}`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Confirm */}
                {user ? (
                  <button
                    onClick={handleConfirm}
                    disabled={!selectedSlotId || submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {submitting
                      ? tb.loadingSlots
                      : selectedSlot
                      ? `${tb.confirm} · ${location.price_per_hour} ${tb.perHour}`
                      : tb.selectSlot}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    search={{ redirect: "/book", mode: "login" }}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all"
                  >
                    {tb.signInNow}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                )}
              </motion.div>
            )}

            {status === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-success/15 grid place-items-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="oklch(0.70 0.18 145)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-2">{tb.successTitle}</h3>
                <p className="text-muted-foreground mb-6">
                  {tb.successMsg.replace("{location}", `${locName} (${locArea})`).replace("{slot}", selectedSlot?.time ?? "")}
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

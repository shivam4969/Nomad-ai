import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TripLength from "../components/TripLength";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DestinationIn from "../components/DestinationIn";
import Budget from "../components/Budget";
import { useTrip } from "../context/TripContext";

function Dashboard() {
    const navigate = useNavigate();
    const { tripData } = useTrip();

    const [errors,    setErrors]    = useState({});
    const [isLeaving, setIsLeaving] = useState(false);
    const [mounted,   setMounted]   = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    function validate() {
        const e = {};
        if (!tripData.destination?.trim())               e.destination = "Please enter a destination.";
        if (!tripData.startDate)                         e.dates = "Please pick a departure date.";
        else if (!tripData.endDate)                      e.dates = "Please pick a return date.";
        else if (tripData.endDate <= tripData.startDate) e.dates = "Return must be after departure.";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function handleContinue() {
        if (!validate()) return;
        setIsLeaving(true);
        setTimeout(() => navigate("/confirmation"), 300);
    }

    const tripDuration = (() => {
        if (!tripData.startDate || !tripData.endDate) return null;
        const days = Math.round(
            (new Date(tripData.endDate) - new Date(tripData.startDate)) / 86400000
        );
        if (days <= 0) return null;
        return `${days} night${days > 1 ? "s" : ""} · ${days + 1} day${days + 1 > 1 ? "s" : ""}`;
    })();

    return (
        <div
            className={`
                min-h-screen bg-[#F5FAF8] text-[#0F1F1B]
                transition-opacity duration-300
                ${isLeaving ? "opacity-0" : "opacity-100"}
            `}
        >
            <Navbar />

            <main className="flex min-h-screen items-center justify-center px-5 pb-20 pt-28">
                <div className="w-full max-w-[660px]">

                    {/* ── Page header ── */}
                    <div
                        className={`
                            mb-10 text-center
                            transition-all duration-500
                            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
                        `}
                    >
                        <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] text-[#3DB896] uppercase">
                            <span className="h-px w-5 bg-[#3DB896]/40" />
                            Plan your adventure
                            <span className="h-px w-5 bg-[#3DB896]/40" />
                        </div>

                        <h1
                            className="text-[clamp(38px,6vw,60px)] font-normal leading-[1.06] tracking-[-0.03em] text-[#0F1F1B]"
                            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                        >
                            Where will you go?
                        </h1>

                        <p className="mx-auto mt-3 max-w-[420px] text-[15px] leading-relaxed text-[#6B8880]">
                            Tell us about your trip and we'll craft an itinerary built entirely around you.
                        </p>
                    </div>

                    {/* ── Card ──
                        No translate animation — CSS transform creates a stacking context
                        that traps the DestinationIn dropdown z-index inside the card. */}
                    <div
                        className={`
                            rounded-[22px] border border-[#DDEEE9] bg-white
                            p-7 sm:p-10
                            shadow-[0_4px_6px_rgba(15,31,27,0.03),_0_24px_64px_rgba(15,31,27,0.07)]
                            transition-opacity duration-500 delay-100
                            ${mounted ? "opacity-100" : "opacity-0"}
                        `}
                    >

                        {/* ── Progress ── */}
                        <div className="mb-9 flex items-center justify-between gap-6 border-b border-[#DDEEE9] pb-7">
                            <div>
                                <p className="text-sm font-semibold text-[#0F1F1B]">Your trip</p>
                                <p className="mt-0.5 text-xs text-[#6B8880]">Step 1 of 2</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                                {["Destination", "Dates", "Budget"].map((step, i) => {
                                    const done = i === 0
                                        ? !!tripData.destination?.trim()
                                        : i === 1
                                            ? !!(tripData.startDate && tripData.endDate)
                                            : true;
                                    return (
                                        <div key={step} className="flex flex-col items-center gap-1">
                                            <div className={`h-[3px] w-14 rounded-full transition-all duration-500 ${done ? "bg-[#3DB896]" : "bg-[#DDEEE9]"}`} />
                                            <span className={`hidden text-[9px] font-medium sm:block transition-colors duration-300 ${done ? "text-[#3DB896]" : "text-[#A8BFBA]"}`}>
                                                {step}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── Destination ── */}
                        <section className={`mb-8 transition-opacity duration-500 delay-[120ms] ${mounted ? "opacity-100" : "opacity-0"}`}>
                            <label className="mb-2 block text-sm font-semibold text-[#2E4A44]">
                                Where do you want to go?
                                <span className="ml-2 text-xs font-normal text-[#A8BFBA]">city, country, or region</span>
                            </label>
                            <DestinationIn />
                            {errors.destination && (
                                <p className="mt-2 flex items-center gap-1.5 text-xs text-[#E05555]" style={{ animation: "errIn 0.2s ease both" }}>
                                    ⚠ {errors.destination}
                                </p>
                            )}
                        </section>

                        {/* ── Dates ── */}
                        <section className={`mb-9 transition-opacity duration-500 delay-[180ms] ${mounted ? "opacity-100" : "opacity-0"}`}>
                            <label className="mb-2 block text-sm font-semibold text-[#2E4A44]">
                                How long are you staying?
                            </label>
                            <TripLength />
                            {tripDuration && (
                                <p className="mt-2.5 text-sm font-medium text-[#3DB896]">✦ {tripDuration}</p>
                            )}
                            {errors.dates && (
                                <p className="mt-2 flex items-center gap-1.5 text-xs text-[#E05555]" style={{ animation: "errIn 0.2s ease both" }}>
                                    ⚠ {errors.dates}
                                </p>
                            )}
                        </section>

                        {/* ── Budget ── */}
                        <section
                            className={`mb-9 rounded-[14px] border border-[#DDEEE9] bg-[#F9FCFB] p-5 transition-opacity duration-500 delay-[240ms] ${mounted ? "opacity-100" : "opacity-0"}`}
                        >
                            <label className="mb-3 block text-sm font-semibold text-[#2E4A44]">
                                What's your budget?
                            </label>
                            <Budget />
                        </section>

                        <div className="h-px bg-[#DDEEE9]" />

                        {/* ── CTA row ── */}
                        <div className="mt-7 flex items-center justify-between gap-4">
                            <p className="text-sm text-[#A8BFBA]">Next: travel style &amp; interests</p>

                            <button
                                onClick={handleContinue}
                                className="
                                    group relative inline-flex items-center gap-2.5
                                    overflow-hidden rounded-[13px]
                                    bg-[#3DB896] px-6 py-3.5
                                    text-sm font-semibold text-white
                                    transition-all duration-200
                                    hover:-translate-y-0.5 hover:bg-[#2A9478]
                                    hover:shadow-[0_8px_28px_rgba(61,184,150,0.35)]
                                    active:translate-y-0 active:shadow-none
                                    focus-visible:outline-none focus-visible:ring-2
                                    focus-visible:ring-[#3DB896] focus-visible:ring-offset-2
                                "
                            >
                                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-transparent" />
                                Continue
                                <span className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1">→</span>
                            </button>
                        </div>

                    </div>

                    <p className="mt-5 text-center text-xs text-[#A8BFBA]">
                        You can fine-tune your travel style and interests next.
                    </p>

                </div>
            </main>

            <Footer />

            <style>{`
                @keyframes errIn {
                    from { opacity: 0; transform: translateY(-3px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default Dashboard;
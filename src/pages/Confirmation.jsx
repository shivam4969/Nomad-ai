import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTrip } from "../context/TripContext";

// ── Style selector
function StyleSelector({ label, options, value, onChange }) {
    return (
        <div>
            <p className="mb-3 text-xs font-medium text-[#A8BFBA]">{label}</p>
            <div className="flex flex-col gap-2">
                {options.map((opt) => {
                    const selected = value === opt;
                    return (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => onChange(opt)}
                            className={`
                                flex items-center justify-between rounded-[10px] border px-4 py-2.5
                                text-sm font-medium transition-all duration-150
                                ${selected
                                    ? "border-[#3DB896] bg-[rgba(61,184,150,0.08)] text-[#2A9478]"
                                    : "border-[#DDEEE9] bg-[#F9FCFB] text-[#2E4A44] hover:border-[#3DB896] hover:bg-[rgba(61,184,150,0.05)]"
                                }
                            `}
                        >
                            {opt}
                            <span
                                className={`
                                    flex h-[18px] w-[18px] shrink-0 items-center justify-center
                                    rounded-full border-2 text-[9px] text-white
                                    transition-all duration-200
                                    ${selected ? "border-[#3DB896] bg-[#3DB896]" : "border-[#DDEEE9]"}
                                `}
                            >
                                {selected && "✓"}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ── Interest picker
const INTERESTS = [
    { label: "Food & Drink",               icon: "🍜" },
    { label: "Culture & History",          icon: "🏛"  },
    { label: "Nature & Wildlife",          icon: "🌿" },
    { label: "Adventure & Sports",         icon: "🧗" },
    { label: "Relaxation & Wellness",      icon: "🧘" },
    { label: "Shopping & Fashion",         icon: "🛍"  },
    { label: "Nightlife & Entertainment",  icon: "🎶" },
    { label: "Arts & Music",               icon: "🎨" },
    { label: "Technology & Innovation",    icon: "💡" },
    { label: "Family-Friendly Activities", icon: "🎡" },
];

function InterestPicker({ value, onChange }) {
    function toggle(label) {
        const next = value.includes(label)
            ? value.filter((i) => i !== label)
            : [...value, label];
        onChange(next);
    }
    return (
        <div className="flex flex-wrap gap-2">
            {INTERESTS.map(({ label, icon }) => {
                const selected = value.includes(label);
                return (
                    <button
                        key={label}
                        type="button"
                        onClick={() => toggle(label)}
                        className={`
                            flex items-center gap-1.5 rounded-full border px-3.5 py-2
                            text-sm font-medium transition-all duration-150
                            ${selected
                                ? "border-[#3DB896] bg-[#3DB896] text-white -translate-y-0.5"
                                : "border-[#DDEEE9] bg-[#F9FCFB] text-[#2E4A44] hover:border-[#3DB896] hover:bg-[rgba(61,184,150,0.06)] hover:-translate-y-0.5"
                            }
                        `}
                    >
                        <span className="text-[14px] leading-none">{icon}</span>
                        {label}
                    </button>
                );
            })}
        </div>
    );
}

// ── Loading screen
const LOAD_STEPS = [
    { icon: "🗺", text: "Mapping your destination" },
    { icon: "⭐", text: "Matching your interests"  },
    { icon: "📅", text: "Structuring your days"    },
    { icon: "✨", text: "Adding local highlights"  },
];

function LoadingScreen() {
    const [visibleSteps, setVisibleSteps] = useState([]);
    const [activeStep,   setActiveStep]   = useState(-1);

    useEffect(() => {
        // Reveal each step with a staggered fade-in
        LOAD_STEPS.forEach((_, i) => {
            const tShow   = setTimeout(() => setVisibleSteps(p => [...p, i]),  i * 900 + 400);
            const tActive = setTimeout(() => setActiveStep(i),                  i * 900 + 400);
            return () => { clearTimeout(tShow); clearTimeout(tActive); };
        });
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#DDEFEA] px-6 text-center">

            {/* Globe — smooth bounce (translateY only, no rotation jank) */}
            <div style={{ animation: "globeBounce 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
                 className="mb-10 text-6xl select-none">
                🌍
            </div>

            <h1
                className="text-[clamp(26px,5vw,38px)] font-normal tracking-[-0.025em] text-[#0F1F1B]"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
                Building your adventure…
            </h1>

            <p className="mx-auto mt-3 max-w-xs text-[14px] leading-relaxed text-[#6B8880]">
                Weaving together experiences around the way you want to travel.
            </p>

            {/* Single slim progress bar — removed dots */}
            <div className="relative mt-8 h-[3px] w-56 overflow-hidden rounded-full bg-white/40">
                <div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#3DB896]"
                    style={{ animation: "shimmerBar 1.6s ease-in-out infinite" }}
                />
            </div>

            {/* Step list — slides in one by one */}
            <div className="mt-10 flex w-full max-w-[260px] flex-col gap-2">
                {LOAD_STEPS.map(({ icon, text }, i) => {
                    const visible = visibleSteps.includes(i);
                    const active  = activeStep === i;
                    return (
                        <div
                            key={i}
                            className="flex items-center gap-3 rounded-[10px] px-4 py-2.5 text-sm font-medium"
                            style={{
                                background:  visible ? "rgba(255,255,255,0.55)" : "transparent",
                                opacity:     visible ? 1 : 0,
                                transform:   visible ? "translateY(0)" : "translateY(6px)",
                                transition:  "opacity 0.5s ease, transform 0.5s ease, background 0.3s ease",
                                color:       active  ? "#1C6B54" : "#6B8880",
                            }}
                        >
                            {/* Animated checkmark when done, spinner when active */}
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                                {active
                                    ? <span style={{ animation: "spinStep 0.8s linear infinite", display:"inline-block" }}>⟳</span>
                                    : visible && activeStep > i
                                        ? <span className="text-[#3DB896]">✓</span>
                                        : <span>{icon}</span>
                                }
                            </span>
                            {text}
                        </div>
                    );
                })}
            </div>

            <style>{`
                @keyframes globeBounce {
                    0%,100% { transform: translateY(0px);   }
                    30%     { transform: translateY(-18px);  }
                    50%     { transform: translateY(-22px);  }
                    70%     { transform: translateY(-6px);   }
                    85%     { transform: translateY(-10px);  }
                }
                @keyframes shimmerBar {
                    0%   { left: -60%; width: 40%; }
                    60%  { left: 80%;  width: 60%; }
                    100% { left: 120%; width: 40%; }
                }
                @keyframes spinStep {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

// ── Main page
function Confirmation() {
    const { tripData, setTripData } = useTrip();
    const navigate = useNavigate();

    const [loading,     setLoading]     = useState(false);
    const [error,       setError]       = useState("");
    const [mounted,     setMounted]     = useState(false);
    const [travelStyle, setTravelStyle] = useState(tripData.travelStyle || "");
    const [tripStyle,   setTripStyle]   = useState(tripData.tripStyle   || "");
    const [interests,   setInterests]   = useState(tripData.interests   || []);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    function validate() {
        if (!travelStyle)           { setError("Please choose a travel pace.");              return false; }
        if (!tripStyle)             { setError("Please choose who you're travelling with."); return false; }
        if (interests.length === 0) { setError("Pick at least one interest.");               return false; }
        setError("");
        return true;
    }

    async function saveTrip() {
        if (!validate()) return;

        const finalData = { ...tripData, travelStyle, tripStyle, interests };
        setTripData(finalData);
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/itinerary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData),
            });

            if (!response.ok) throw new Error(`Server error ${response.status}`);

            const data = await response.json();
            navigate("/itinerary", { state: { ...finalData, ...data } });
        } catch (err) {
            setLoading(false);
            setError("Something went wrong reaching the server. Please try again.");
        }
    }

    if (loading) return <LoadingScreen />;

    return (
        <div className={`min-h-screen bg-[#F5FAF8] text-[#0F1F1B] transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <Navbar />

            <main className="px-6 pb-24 pt-28">
                <div className="mx-auto max-w-[680px]">

                    {/* ── Header ── */}
                    <div className={`mb-10 text-center transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[rgba(61,184,150,0.25)] bg-[rgba(61,184,150,0.1)] px-3.5 py-1.5 text-xs font-medium text-[#3DB896]">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M3 5l1.5 1.5L7 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Almost there · Step 2 of 2
                        </div>

                        <h1
                            className="text-[clamp(36px,5.5vw,56px)] font-normal leading-[1.08] tracking-[-0.03em]"
                            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                        >
                            Your adventure awaits.
                        </h1>

                        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#6B8880]">
                            A few final touches and we'll create your personalised itinerary.
                        </p>

                        <div className="mx-auto mt-5 h-[3px] w-24 overflow-hidden rounded-full bg-[#DDEEE9]">
                            <div className="h-full w-full rounded-full bg-[#3DB896] transition-all duration-700" />
                        </div>
                    </div>

                    {/* ── Error banner ── */}
                    {error && (
                        <div
                            className="mb-4 flex items-center gap-2 rounded-[10px] border border-[rgba(224,85,85,0.25)] bg-[#fff2f2] px-4 py-3 text-sm text-[#c0392b]"
                            style={{ animation: "errIn 0.2s ease both" }}
                        >
                            <span>⚠</span>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* ── Destination banner ── */}
                    <div
                        className={`
                            mb-5 overflow-hidden rounded-[20px] px-9 py-8
                            transition-all duration-500 delay-[100ms]
                            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                        `}
                        style={{
                            background: "linear-gradient(135deg, #1c3d36 0%, #2a5248 50%, #1e4038 100%)",
                            position: "relative",
                        }}
                    >
                        <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"200px", height:"200px", background:"radial-gradient(circle, rgba(61,184,150,0.2) 0%, transparent 70%)", pointerEvents:"none" }} />
                        <div style={{ position:"absolute", bottom:"-60px", left:"-20px", width:"160px", height:"160px", background:"radial-gradient(circle, rgba(61,184,150,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />

                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
                            Your destination
                        </p>
                        <h2
                            className="mt-2 font-normal leading-[1.1] tracking-[-0.02em] text-white"
                            style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(28px, 5vw, 42px)", position: "relative", zIndex: 1 }}
                        >
                            {tripData.destination || "Your destination"}
                        </h2>
                        <div className="mt-4 flex gap-1.5" style={{ position:"relative", zIndex:1 }}>
                            <div className="h-[6px] w-[18px] rounded-[3px] bg-[#3DB896]" />
                            <div className="h-[6px] w-[6px] rounded-full bg-white/25" />
                            <div className="h-[6px] w-[6px] rounded-full bg-white/25" />
                        </div>
                    </div>

                    {/* ── Style selectors ── */}
                    <div
                        className={`
                            mb-5 rounded-[20px] border border-[#DDEEE9] bg-white p-8
                            shadow-[0_4px_6px_rgba(15,31,27,0.03),_0_20px_50px_rgba(15,31,27,0.07)]
                            transition-all duration-500 delay-[150ms]
                            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                        `}
                    >
                        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A8BFBA]">
                            Your travel preferences
                        </p>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <StyleSelector
                                label="Travel pace"
                                options={["Relaxed", "Balanced", "Adventurous"]}
                                value={travelStyle}
                                onChange={setTravelStyle}
                            />
                            <StyleSelector
                                label="Travelling with"
                                options={["Solo", "Duo", "Squad"]}
                                value={tripStyle}
                                onChange={setTripStyle}
                            />
                        </div>
                    </div>

                    {/* ── Interests ── */}
                    <div
                        className={`
                            mb-5 rounded-[20px] border border-[#DDEEE9] bg-white p-8
                            shadow-[0_4px_6px_rgba(15,31,27,0.03),_0_20px_50px_rgba(15,31,27,0.07)]
                            transition-all duration-500 delay-[200ms]
                            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                        `}
                    >
                        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A8BFBA]">
                            What excites you?
                        </p>
                        <InterestPicker value={interests} onChange={setInterests} />
                    </div>

                    {/* ── CTA ── */}
                    <div
                        className={`
                            rounded-[20px] border border-[#DDEEE9] bg-white p-8 text-center
                            shadow-[0_4px_6px_rgba(15,31,27,0.03),_0_20px_50px_rgba(15,31,27,0.07)]
                            transition-all duration-500 delay-[250ms]
                            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                        `}
                    >
                        <h3 className="text-lg font-semibold text-[#0F1F1B]">Ready to explore?</h3>
                        <p className="mt-1.5 text-sm text-[#A8BFBA]">
                            Nomad AI will craft your full itinerary in seconds.
                        </p>

                        {(travelStyle || tripStyle || interests.length > 0) && (
                            <div className="mt-4 flex flex-wrap justify-center gap-2">
                                {[travelStyle, tripStyle, ...interests.slice(0, 3)].filter(Boolean).map((item) => (
                                    <span key={item} className="rounded-full border border-[rgba(61,184,150,0.2)] bg-[rgba(61,184,150,0.1)] px-3 py-1 text-xs font-medium text-[#2A9478]">
                                        {item}
                                    </span>
                                ))}
                                {interests.length > 3 && (
                                    <span className="rounded-full border border-[rgba(61,184,150,0.2)] bg-[rgba(61,184,150,0.1)] px-3 py-1 text-xs font-medium text-[#2A9478]">
                                        +{interests.length - 3} more
                                    </span>
                                )}
                            </div>
                        )}

                        <button
                            onClick={saveTrip}
                            className="
                                group relative mt-7 inline-flex items-center gap-2.5
                                overflow-hidden rounded-[14px]
                                bg-[#3DB896] px-9 py-4
                                text-[15px] font-semibold text-white
                                transition-all duration-200
                                hover:-translate-y-0.5 hover:bg-[#2A9478]
                                hover:shadow-[0_10px_32px_rgba(61,184,150,0.38)]
                                active:translate-y-0
                            "
                        >
                            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/15 to-transparent" />
                            Generate my itinerary
                            <span className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1">
                                →
                            </span>
                        </button>
                    </div>

                </div>
            </main>

            <style>{`
                @keyframes errIn {
                    from { opacity: 0; transform: translateY(-4px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default Confirmation;
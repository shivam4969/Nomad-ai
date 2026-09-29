import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ── Category → icon map
const CATEGORY_ICONS = {
    "Food & Drink":              "🍜",
    "Food":                      "🍜",
    "Drink":                     "🍶",
    "Culture & History":         "🏛",
    "Culture":                   "🏛",
    "History":                   "📜",
    "Nature & Wildlife":         "🌿",
    "Nature":                    "🌿",
    "Adventure & Sports":        "🧗",
    "Adventure":                 "🧗",
    "Sports":                    "⚽",
    "Relaxation & Wellness":     "🧘",
    "Relaxation":                "🧘",
    "Wellness":                  "🛁",
    "Shopping & Fashion":        "🛍",
    "Shopping":                  "🛍",
    "Nightlife & Entertainment": "🎶",
    "Nightlife":                 "🎶",
    "Entertainment":             "🎭",
    "Arts & Music":              "🎨",
    "Arts":                      "🎨",
    "Music":                     "🎵",
    "Transport":                 "🚆",
    "Accommodation":             "🏨",
    "Sightseeing":               "📸",
};

function categoryIcon(cat) {
    if (!cat) return "📍";
    return CATEGORY_ICONS[cat] ?? "📍";
}

// ── Trip stat pill
function StatPill({ icon, label, value }) {
    if (!value) return null;
    return (
        <div className="flex items-center gap-2 rounded-full border border-[#DDEEE9] bg-white/60 px-4 py-2 text-sm backdrop-blur-sm">
            <span className="text-base leading-none">{icon}</span>
            <span className="text-[#6B8880]">{label}</span>
            <span className="font-semibold text-[#0F1F1B]">{value}</span>
        </div>
    );
}

// ── Empty state
function EmptyState({ navigate }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5FAF8] px-6 text-center">
            <span className="mb-6 text-5xl">🗺</span>
            <h1
                className="text-3xl font-normal tracking-[-0.02em] text-[#0F1F1B]"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
                No itinerary found
            </h1>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-[#6B8880]">
                Looks like you haven't planned a trip yet. Let's fix that.
            </p>
            <button
                onClick={() => navigate("/dashboard")}
                className="group mt-8 inline-flex items-center gap-2.5 rounded-[13px] bg-[#3DB896] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2A9478] hover:shadow-[0_8px_28px_rgba(61,184,150,0.35)]"
            >
                Plan a trip
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
        </div>
    );
}

// ── Activity card with timeline connector
function ActivityCard({ activity, isLast }) {
    return (
        <div className="flex gap-4">
            {/* Timeline dot + line */}
            <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#DDEEE9] bg-white text-sm shadow-sm">
                    {categoryIcon(activity.category)}
                </div>
                {!isLast && <div className="mt-1 w-px flex-1 bg-[#DDEEE9]" />}
            </div>

            {/* Content */}
            <div className={`flex-1 rounded-[14px] border border-[#DDEEE9] bg-[#F9FCFB] p-4 transition-all duration-200 hover:border-[#3DB896]/40 hover:bg-white hover:shadow-[0_4px_20px_rgba(15,31,27,0.06)] ${isLast ? "mb-0" : "mb-4"}`}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-[#3DB896]">{activity.time}</p>
                        <h3 className="mt-0.5 text-base font-semibold text-[#0F1F1B]">{activity.name}</h3>
                    </div>
                    {activity.category && (
                        <span className="shrink-0 rounded-full border border-[rgba(61,184,150,0.2)] bg-[rgba(61,184,150,0.08)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#2A9478]">
                            {activity.category}
                        </span>
                    )}
                </div>
                {activity.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#6B8880]">{activity.description}</p>
                )}
            </div>
        </div>
    );
}

// ── Budget chart (R-derived percentages, rendered in-browser)
const BUDGET_DISTRIBUTION = [
    { category: "Accommodation", pct: 0.35, icon: "🏨", color: "#3DB896" },
    { category: "Food & Drink",  pct: 0.25, icon: "🍜", color: "#2A9478" },
    { category: "Transport",     pct: 0.15, icon: "🚆", color: "#1C6B54" },
    { category: "Activities",    pct: 0.12, icon: "🎯", color: "#5BCBA8" },
    { category: "Shopping",      pct: 0.08, icon: "🛍", color: "#A8DDD0" },
    { category: "Emergency",     pct: 0.05, icon: "🛡", color: "#D4EFE8" },
];

function BudgetChart({ budget }) {
    if (!budget || Number(budget) <= 0) return null;
    const total = Number(budget);
    const data  = BUDGET_DISTRIBUTION.map(d => ({ ...d, amount: Math.round(total * d.pct) }));
    const max   = Math.max(...data.map(d => d.amount));

    return (
        <section className="mt-10 rounded-[20px] border border-[#DDEEE9] bg-white p-6 shadow-[0_4px_6px_rgba(15,31,27,0.03)] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3DB896]">
                Budget breakdown
            </p>
            <div className="mt-1 flex items-baseline gap-2">
                <h2
                    className="text-2xl font-normal tracking-[-0.02em] text-[#0F1F1B]"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                    ${total.toLocaleString()} total
                </h2>
                <span className="text-sm text-[#A8BFBA]">suggested allocation</span>
            </div>

            <div className="mt-6 space-y-3">
                {data.map(({ category, amount, pct, icon, color }) => (
                    <div key={category}>
                        <div className="mb-1.5 flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-sm font-medium text-[#2E4A44]">
                                <span>{icon}</span>{category}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-[#A8BFBA]">{Math.round(pct * 100)}%</span>
                                <span className="min-w-[64px] text-right text-sm font-semibold text-[#0F1F1B]">
                                    ${amount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-[#F0F7F5]">
                            <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${(amount / max) * 100}%`, background: color }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <p className="mt-5 text-xs text-[#A8BFBA]">
                * Based on average travel cost distributions. Adjust to your spending style.
            </p>
        </section>
    );
}

// ── Main
function Itinerary() {
    const location  = useLocation();
    const navigate  = useNavigate();
    const itinerary = location.state;

    const [mounted, setMounted] = useState(false);
    const [copied,  setCopied]  = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 60);
        return () => clearTimeout(t);
    }, []);

    if (!itinerary) return <EmptyState navigate={navigate} />;

    // ── Normalise days: guarantee every day has a numeric .day field
    // Fixes accordion when backend returns [{ title, activities }] without a day number
    const days = (itinerary.days ?? []).map((d, i) => ({
        ...d,
        day: d.day ?? i + 1,
    }));
    const totalDays = days.length;

    // ── Accordion state — initialise with day 1 open
    const [openDays, setOpenDays] = useState(() => new Set([days[0]?.day ?? 1]));
    const allOpen = openDays.size === totalDays;

    function toggleDay(dayNum) {
        setOpenDays(prev => {
            const next = new Set(prev);
            next.has(dayNum) ? next.delete(dayNum) : next.add(dayNum);
            return next;
        });
    }

    function toggleAll() {
        setOpenDays(allOpen ? new Set() : new Set(days.map(d => d.day)));
    }

    // ── Copy to clipboard
    function handleCopy() {
        const text = days.map(d =>
            `Day ${d.day}: ${d.title ?? "Untitled"}\n` +
            (d.activities ?? []).map(a => `  ${a.time ?? ""} — ${a.name ?? ""}`).join("\n")
        ).join("\n\n");
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    // ── Duration label
    // startDate/endDate come from { ...finalData, ...data } merged in Confirmation
    const duration = (() => {
        if (itinerary.startDate && itinerary.endDate) {
            const nights = Math.round(
                (new Date(itinerary.endDate) - new Date(itinerary.startDate)) / 86400000
            );
            if (nights > 0) return `${nights} night${nights > 1 ? "s" : ""}`;
        }
        return totalDays > 0 ? `${totalDays} day${totalDays > 1 ? "s" : ""}` : null;
    })();

    return (
        <div className={`min-h-screen bg-[#F5FAF8] text-[#0F1F1B] transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>

            {/* ── Hero header ── */}
            <header
                className="relative overflow-hidden"
                style={{ background: "linear-gradient(160deg, #1c3d36 0%, #2a5248 55%, #1e4038 100%)" }}
            >
                <div style={{ position:"absolute", top:"-80px", right:"-60px", width:"360px", height:"360px", background:"radial-gradient(circle, rgba(61,184,150,0.18) 0%, transparent 65%)", pointerEvents:"none" }} />
                <div style={{ position:"absolute", bottom:"-100px", left:"-40px", width:"280px", height:"280px", background:"radial-gradient(circle, rgba(61,184,150,0.10) 0%, transparent 65%)", pointerEvents:"none" }} />

                <div className="relative z-10 mx-auto max-w-5xl px-6 pb-10 pt-20 sm:pb-14 sm:pt-24">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white/90"
                    >
                        ← Back to planner
                    </button>

                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#3DB896]">
                        Your personalised trip
                    </p>

                    <h1
                        className="text-[clamp(36px,6vw,64px)] font-normal leading-[1.06] tracking-[-0.03em] text-white"
                        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                        {itinerary.destination}
                    </h1>

                    {/* Stat pills — only show if data is present (fixed by Confirmation merge) */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        <StatPill icon="📅" label="Duration" value={duration} />
                        <StatPill icon="🧭" label="Style"    value={itinerary.travelStyle} />
                        <StatPill icon="👥" label="Group"    value={itinerary.tripStyle} />
                        {itinerary.budget && (
                            <StatPill icon="💰" label="Budget" value={`$${Number(itinerary.budget).toLocaleString()}`} />
                        )}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <button
                            onClick={handleCopy}
                            className="inline-flex items-center gap-2 rounded-[10px] border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
                        >
                            {copied ? "✓ Copied!" : "📋 Copy itinerary"}
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 rounded-[10px] border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
                        >
                            🖨 Print
                        </button>
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="inline-flex items-center gap-2 rounded-[10px] border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
                        >
                            ✦ Plan another trip
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">

                {/* ── Accordion controls ── */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#A8BFBA]">
                        {totalDays} day{totalDays !== 1 ? "s" : ""} planned
                    </h2>
                    <button
                        onClick={toggleAll}
                        className="text-sm font-medium text-[#3DB896] transition-colors hover:text-[#2A9478]"
                    >
                        {allOpen ? "Collapse all" : "Expand all"}
                    </button>
                </div>

                {/* ── Day cards ── */}
                <div className="space-y-3">
                    {days.map((day, dayIdx) => {
                        const isOpen       = openDays.has(day.day);
                        const actCount     = day.activities?.length ?? 0;

                        return (
                            <section
                                key={day.day}
                                className={`overflow-hidden rounded-[20px] border bg-white shadow-[0_2px_8px_rgba(15,31,27,0.04)] transition-all duration-200 ${isOpen ? "border-[#3DB896]/30 shadow-[0_8px_32px_rgba(61,184,150,0.10)]" : "border-[#DDEEE9] hover:border-[#3DB896]/20"}`}
                                style={{ animation: `fadeUp 0.4s ${dayIdx * 60}ms both` }}
                            >
                                {/* Header */}
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() => toggleDay(day.day)}
                                    className="flex w-full items-center gap-4 px-6 py-5 text-left sm:px-8"
                                >
                                    <div className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-[12px] transition-all duration-200 ${isOpen ? "bg-[#3DB896] text-white shadow-[0_4px_16px_rgba(61,184,150,0.3)]" : "bg-[#F0F7F5] text-[#3DB896]"}`}>
                                        <span className="text-[10px] font-semibold uppercase leading-none opacity-70">Day</span>
                                        <span className="text-lg font-bold leading-tight">{day.day}</span>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h2 className={`truncate text-lg font-semibold leading-snug tracking-[-0.01em] transition-colors duration-200 ${isOpen ? "text-[#0F1F1B]" : "text-[#2E4A44]"}`}>
                                            {day.title ?? `Day ${day.day}`}
                                        </h2>
                                        <p className="mt-0.5 text-xs text-[#A8BFBA]">
                                            {actCount} activit{actCount !== 1 ? "ies" : "y"}
                                            {day.activities?.[0]?.time && ` · starts ${day.activities[0].time}`}
                                        </p>
                                    </div>

                                    {/* Emoji preview when collapsed */}
                                    {!isOpen && actCount > 0 && (
                                        <div className="hidden shrink-0 items-center gap-1 sm:flex">
                                            {day.activities.slice(0, 4).map((a, i) => (
                                                <span key={i} className="text-sm" title={a.name}>{categoryIcon(a.category)}</span>
                                            ))}
                                            {actCount > 4 && <span className="text-xs text-[#A8BFBA]">+{actCount - 4}</span>}
                                        </div>
                                    )}

                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-[rgba(61,184,150,0.12)] text-[#3DB896] rotate-180" : "bg-[#F0F7F5] text-[#A8BFBA]"}`}>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </button>

                                {/* Body */}
                                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                    <div className="overflow-hidden">
                                        <div className="border-t border-[#DDEEE9] px-6 pb-6 pt-6 sm:px-8 sm:pb-8">
                                            {actCount > 0 ? (
                                                <div>
                                                    {day.activities.map((activity, i) => (
                                                        <ActivityCard
                                                            key={`${day.day}-${i}`}
                                                            activity={activity}
                                                            isLast={i === actCount - 1}
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-[#A8BFBA]">No activities planned for this day.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* ── Special Events ──
                    Always rendered. Shows a helpful empty state if backend didn't return the field.
                    Fix: make sure your server prompt includes `specialEvents` in the required JSON shape. */}
                <section className="mt-12">
                    <div className="mb-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3DB896]">
                            Happening while you're there
                        </p>
                        <h2
                            className="mt-2 text-2xl font-normal tracking-[-0.02em] text-[#0F1F1B]"
                            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                        >
                            Special Events
                        </h2>
                    </div>

                    {!itinerary.specialEvents || itinerary.specialEvents.length === 0 ? (
                        /* Empty state — visible so you know the backend isn't returning this field */
                        <div className="rounded-[16px] border border-dashed border-[#DDEEE9] bg-white px-6 py-8 text-center">
                            <p className="text-2xl">🎭</p>
                            <p className="mt-2 text-sm font-medium text-[#2E4A44]">No special events found</p>
                            <p className="mt-1 text-xs leading-relaxed text-[#A8BFBA]">
                                Ask your backend to include a{" "}
                                <code className="rounded bg-[#F0F7F5] px-1 py-0.5 font-mono text-[#3DB896]">specialEvents</code>{" "}
                                array in its response to populate this section.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {itinerary.specialEvents.map((event, i) => (
                                <div
                                    key={`${event.name}-${i}`}
                                    className="rounded-[16px] border border-[#DDEEE9] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(15,31,27,0.07)]"
                                >
                                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                                        <div className="shrink-0 sm:w-36">
                                            <p className="text-sm font-semibold text-[#3DB896]">{event.date}</p>
                                            {event.location && (
                                                <p className="mt-1 text-xs text-[#A8BFBA]">{event.location}</p>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="text-base font-semibold text-[#0F1F1B]">{event.name}</h3>
                                                {event.category && (
                                                    <span className="rounded-full border border-[rgba(61,184,150,0.2)] bg-[rgba(61,184,150,0.08)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#2A9478]">
                                                        {event.category}
                                                    </span>
                                                )}
                                            </div>
                                            {event.description && (
                                                <p className="mt-1.5 text-sm leading-relaxed text-[#6B8880]">{event.description}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* ── Budget chart ── */}
                <BudgetChart budget={itinerary.budget} />

                {/* ── Footer ── */}
                <div className="mt-16 flex flex-col items-center gap-2 text-center">
                    <div className="h-px w-16 bg-[#DDEEE9]" />
                    <p className="mt-4 text-xs text-[#A8BFBA]">Crafted for you by</p>
                    <a
                        href="/"
                        className="text-lg font-normal tracking-[-0.02em] text-[#0F1F1B] no-underline"
                        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                        nomad<span className="text-[#3DB896]">.</span>ai
                    </a>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mt-4 text-sm font-medium text-[#3DB896] transition-colors hover:text-[#2A9478]"
                    >
                        ✦ Plan another trip →
                    </button>
                </div>

            </main>

            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @media print {
                    nav, button, .no-print { display: none !important; }
                    header { background: #1c3d36 !important; -webkit-print-color-adjust: exact; }
                    * { box-shadow: none !important; }
                }
            `}</style>
        </div>
    );
}

export default Itinerary;
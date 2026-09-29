import { useState, useRef, useEffect } from "react";
import { useTrip } from "../context/TripContext";

const destinations = [
    { city: "Tokyo",         country: "Japan",        emoji: "🇯🇵", tag: "Iconic" },
    { city: "Kyoto",         country: "Japan",        emoji: "🇯🇵", tag: "Cultural" },
    { city: "Osaka",         country: "Japan",        emoji: "🇯🇵", tag: "Foodie" },
    { city: "Seoul",         country: "South Korea",  emoji: "🇰🇷", tag: "Vibrant" },
    { city: "Paris",         country: "France",       emoji: "🇫🇷", tag: "Classic" },
    { city: "Rome",          country: "Italy",        emoji: "🇮🇹", tag: "Historic" },
    { city: "Barcelona",     country: "Spain",        emoji: "🇪🇸", tag: "Sunny" },
    { city: "New York",      country: "USA",          emoji: "🇺🇸", tag: "Epic" },
    { city: "Lisbon",        country: "Portugal",     emoji: "🇵🇹", tag: "Charming" },
    { city: "Bali",          country: "Indonesia",    emoji: "🇮🇩", tag: "Tropical" },
    { city: "Cape Town",     country: "South Africa", emoji: "🇿🇦", tag: "Scenic" },
    { city: "Mexico City",   country: "Mexico",       emoji: "🇲🇽", tag: "Lively" },
    { city: "Amsterdam",     country: "Netherlands",  emoji: "🇳🇱", tag: "Cozy" },
    { city: "Bangkok",       country: "Thailand",     emoji: "🇹🇭", tag: "Bustling" },
    { city: "Marrakech",     country: "Morocco",      emoji: "🇲🇦", tag: "Exotic" },
    { city: "Sydney",        country: "Australia",    emoji: "🇦🇺", tag: "Beautiful" },
];

function highlight(text, query) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
        <>
            {text.slice(0, idx)}
            <mark className="bg-[rgba(61,184,150,0.18)] text-[#2A9478] rounded-sm not-italic font-semibold">
                {text.slice(idx, idx + query.length)}
            </mark>
            {text.slice(idx + query.length)}
        </>
    );
}

function DestinationIn() {
    const [query,        setQuery]        = useState("");
    const [activeIndex,  setActiveIndex]  = useState(-1);
    const [isOpen,       setIsOpen]       = useState(false);
    const [confirmed,    setConfirmed]    = useState(false);
    const { setTripData } = useTrip();

    const inputRef    = useRef(null);
    const listRef     = useRef(null);
    const containerRef = useRef(null);

    // Filter by city OR country
    const results = query.trim().length === 0
        ? []
        : destinations.filter(({ city, country }) =>
            `${city} ${country}`.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 6);

    // Close on outside click
    useEffect(() => {
        function onClickOut(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setActiveIndex(-1);
            }
        }
        document.addEventListener("mousedown", onClickOut);
        return () => document.removeEventListener("mousedown", onClickOut);
    }, []);

    // Scroll active item into view
    useEffect(() => {
        if (activeIndex >= 0 && listRef.current) {
            const item = listRef.current.children[activeIndex];
            item?.scrollIntoView({ block: "nearest" });
        }
    }, [activeIndex]);

    function saveDestination(dest) {
        const label = `${dest.city}, ${dest.country}`;
        setQuery(label);
        setConfirmed(true);
        setIsOpen(false);
        setActiveIndex(-1);
        setTripData(prev => ({ ...prev, destination: label }));
    }

    function handleChange(e) {
        const val = e.target.value;
        setQuery(val);
        setConfirmed(false);
        setIsOpen(true);
        setActiveIndex(-1);
        setTripData(prev => ({ ...prev, destination: val }));
    }

    function handleKeyDown(e) {
        if (!isOpen || results.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex(i => Math.min(i + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex(i => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0) saveDestination(results[activeIndex]);
            else if (results.length === 1) saveDestination(results[0]);
        } else if (e.key === "Escape") {
            setIsOpen(false);
            setActiveIndex(-1);
        }
    }

    const showDropdown = isOpen && results.length > 0;

    return (
        <div ref={containerRef} className="relative w-full" style={{ isolation: "isolate" }}>

            {/* ── Input ── */}
            <div className="relative">
                {/* Search / check icon — SVG so size is always exact, no emoji rendering quirk */}
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center">
                    {confirmed ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6.5" stroke="#3DB896" strokeWidth="1.2"/>
                            <path d="M4 7l2.2 2.2L10 5" stroke="#3DB896" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M21 3L3 10.5l6.75 2.25L12 21l3-6.75L21 3z" stroke="#A8BFBA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                </span>

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => query && !confirmed && setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="          Kyoto, Japan"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-expanded={showDropdown}
                    aria-controls="dest-listbox"
                    className={`
                        w-full rounded-[14px] border bg-[#F9FCFB] py-3.5 pl-11 pr-10
                        text-[15px] text-[#0F1F1B] placeholder:text-[#A8BFBA]
                        outline-none transition-all duration-200
                        ${confirmed
                            ? "border-[#3DB896] bg-white shadow-[0_0_0_4px_rgba(61,184,150,0.12)]"
                            : showDropdown
                                ? "border-[#3DB896] bg-white shadow-[0_0_0_4px_rgba(61,184,150,0.12)]"
                                : "border-[#DDEEE9] hover:border-[#3DB896]/50 focus:border-[#3DB896] focus:bg-white focus:shadow-[0_0_0_4px_rgba(61,184,150,0.12)]"
                        }
                    `}
                />

                {/* Clear button */}
                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            setConfirmed(false);
                            setIsOpen(false);
                            setTripData(prev => ({ ...prev, destination: "" }));
                            inputRef.current?.focus();
                        }}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-[#DDEEE9] text-[10px] text-[#6B8880] transition-all duration-150 hover:bg-[#3DB896] hover:text-white"
                        aria-label="Clear destination"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* ── Dropdown ── */}
            <div
                id="dest-listbox"
                role="listbox"
                ref={listRef}
                style={{ backgroundColor: "#ffffff", zIndex: 9999 }}
                className={`
                    absolute left-0 right-0 mt-2
                    overflow-hidden rounded-[16px]
                    border border-[#DDEEE9]
                    shadow-[0_16px_48px_rgba(15,31,27,0.16)]
                    transition-all duration-200 ease-out
                    ${showDropdown
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none"
                    }
                `}
            >
                <ul className="max-h-72 overflow-y-auto p-1.5">
                    {results.map((dest, i) => {
                        const isActive = i === activeIndex;
                        const label = `${dest.city}, ${dest.country}`;
                        return (
                            <li key={label} role="option" aria-selected={isActive}>
                                <button
                                    type="button"
                                    onMouseEnter={() => setActiveIndex(i)}
                                    onMouseDown={(e) => {
                                        // prevent input blur before click registers
                                        e.preventDefault();
                                        saveDestination(dest);
                                    }}
                                    className={`
                                        flex w-full items-center gap-3.5 rounded-[10px]
                                        px-3.5 py-3 text-left
                                        transition-all duration-100
                                        ${isActive
                                            ? "bg-[rgba(61,184,150,0.08)]"
                                            : "hover:bg-[#F5FAF8]"
                                        }
                                    `}
                                >
                                    {/* Flag */}
                                    <span className="text-xl leading-none shrink-0">{dest.emoji}</span>

                                    {/* Text */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-[#0F1F1B] leading-snug">
                                            {highlight(dest.city, query)}
                                        </p>
                                        <p className="text-xs text-[#6B8880] mt-0.5 leading-snug">
                                            {highlight(dest.country, query)}
                                        </p>
                                    </div>

                                    {/* Tag pill */}
                                    <span className="shrink-0 rounded-full bg-[rgba(61,184,150,0.1)] border border-[rgba(61,184,150,0.2)] px-2.5 py-0.5 text-[10px] font-medium text-[#2A9478]">
                                        {dest.tag}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* Footer hint */}
                <div className="border-t border-[#DDEEE9] px-4 py-2 flex items-center gap-1.5">
                    <span className="text-[10px] text-[#A8BFBA]">↑↓ navigate</span>
                    <span className="text-[#DDEEE9]">·</span>
                    <span className="text-[10px] text-[#A8BFBA]">↵ select</span>
                    <span className="text-[#DDEEE9]">·</span>
                    <span className="text-[10px] text-[#A8BFBA]">esc close</span>
                </div>
            </div>

        </div>
    );
}

export default DestinationIn;
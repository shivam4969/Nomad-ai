import { useState } from "react";
import { useTrip } from "../context/TripContext";

const TIERS = [
    { max: 1500,     label: "Budget",      color: "#6B8880" },
    { max: 3500,     label: "Mid-range",   color: "#3DB896" },
    { max: 7000,     label: "Comfortable", color: "#2A9478" },
    { max: Infinity, label: "Luxury",      color: "#1C6B54" },
];

function getTier(value) {
    return TIERS.find(t => value <= t.max);
}

function Budget() {
    const { setTripData } = useTrip();
    const [budget, setBudget] = useState(1000);

    const MIN = 100;
    const MAX = 10000;
    const pct = ((budget - MIN) / (MAX - MIN)) * 100;
    const tier = getTier(budget);
    const displayAmt = budget >= MAX ? "$10,000+" : `$${budget.toLocaleString()}`;

    function handleChange(e) {
        const value = Number(e.target.value);
        setBudget(value);
        setTripData(prev => ({ ...prev, budget: value }));
    }

    return (
        <div className="w-full">

            {/* Amount row */}
            <div className="mb-4 flex items-end justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[#A8BFBA]">Total budget</p>
                    <p
                        className="mt-0.5 font-serif text-3xl font-normal tracking-[-0.02em] text-[#0F1F1B] transition-all duration-150"
                        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                        {displayAmt}
                    </p>
                </div>

                {/* Tier badge */}
                <span
                    className="rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-all duration-300"
                    style={{
                        color: tier.color,
                        borderColor: `${tier.color}40`,
                        background: `${tier.color}12`,
                    }}
                >
                    {tier.label}
                </span>
            </div>

            {/* Slider */}
            <div className="relative py-1">
                {/* Filled track — sits behind native thumb */}
                <div
                    className="pointer-events-none absolute left-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#3DB896] transition-all duration-75"
                    style={{ width: `${pct}%` }}
                />
                <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    step="50"
                    value={budget}
                    onChange={handleChange}
                    className="relative w-full cursor-pointer appearance-none bg-transparent
                        [&::-webkit-slider-runnable-track]:h-[4px]
                        [&::-webkit-slider-runnable-track]:rounded-full
                        [&::-webkit-slider-runnable-track]:bg-[#DDEEE9]
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:h-[22px]
                        [&::-webkit-slider-thumb]:w-[22px]
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:border-[2.5px]
                        [&::-webkit-slider-thumb]:border-[#3DB896]
                        [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(61,184,150,0.3)]
                        [&::-webkit-slider-thumb]:transition-transform
                        [&::-webkit-slider-thumb]:duration-150
                        [&::-webkit-slider-thumb]:hover:scale-110
                        [&::-webkit-slider-thumb]:hover:shadow-[0_4px_16px_rgba(61,184,150,0.4)]
                        [&::-moz-range-track]:h-[4px]
                        [&::-moz-range-track]:rounded-full
                        [&::-moz-range-track]:bg-[#DDEEE9]
                        [&::-moz-range-thumb]:h-[22px]
                        [&::-moz-range-thumb]:w-[22px]
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:border-[2.5px]
                        [&::-moz-range-thumb]:border-[#3DB896]
                        [&::-moz-range-thumb]:bg-white
                        outline-none"
                />
            </div>

            {/* Labels */}
            <div className="mt-2 flex justify-between text-xs text-[#A8BFBA]">
                <span>$100</span>
                <span>$5,000</span>
                <span>$10,000+</span>
            </div>

        </div>
    );
}

export default Budget;
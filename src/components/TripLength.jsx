import { useTrip } from "../context/TripContext";

function TripLength() {
    const { tripData, setTripData } = useTrip();

    const today = new Date().toISOString().split("T")[0];

    function handleStartDate(e) {
        const startDate = e.target.value;
        setTripData(prev => ({
            ...prev,
            startDate,
            // Clear end date if it's now before the new start
            endDate: prev.endDate && prev.endDate <= startDate ? "" : prev.endDate,
        }));
    }

    function handleEndDate(e) {
        setTripData(prev => ({ ...prev, endDate: e.target.value }));
    }

    const inputClass = `
        w-full rounded-[12px] border bg-[#F9FCFB]
        px-4 py-3 text-sm text-[#0F1F1B]
        outline-none cursor-pointer
        transition-all duration-200
        hover:border-[#3DB896]/50
        focus:border-[#3DB896] focus:bg-white focus:shadow-[0_0_0_4px_rgba(61,184,150,0.12)]
        [&::-webkit-calendar-picker-indicator]:opacity-40
        [&::-webkit-calendar-picker-indicator]:cursor-pointer
        [&::-webkit-calendar-picker-indicator]:transition-opacity
        [&::-webkit-calendar-picker-indicator]:hover:opacity-80
    `;

    return (
        <div className="grid gap-3 sm:grid-cols-2">

            {/* Departure */}
            <div>
                <label className="mb-1.5 block text-xs font-medium text-[#A8BFBA] uppercase tracking-wider">
                    Departure
                </label>
                <input
                    type="date"
                    value={tripData.startDate || ""}
                    min={today}
                    onChange={handleStartDate}
                    className={`${inputClass} border-[#DDEEE9] ${tripData.startDate ? "border-[#3DB896]/50 text-[#0F1F1B]" : ""}`}
                />
            </div>

            {/* Return */}
            <div>
                <label className="mb-1.5 block text-xs font-medium text-[#A8BFBA] uppercase tracking-wider">
                    Return
                </label>
                <input
                    type="date"
                    value={tripData.endDate || ""}
                    min={tripData.startDate || today}
                    onChange={handleEndDate}
                    disabled={!tripData.startDate}
                    className={`
                        ${inputClass}
                        border-[#DDEEE9]
                        ${tripData.endDate ? "border-[#3DB896]/50 text-[#0F1F1B]" : ""}
                        ${!tripData.startDate ? "cursor-not-allowed opacity-50" : ""}
                    `}
                />
                {!tripData.startDate && (
                    <p className="mt-1.5 text-xs text-[#A8BFBA]">Pick a departure date first</p>
                )}
            </div>

        </div>
    );
}

export default TripLength;
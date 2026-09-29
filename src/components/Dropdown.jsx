import { useState } from "react";

function Dropdown({ options, placeholder, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");

    function handleSelect(option) {
        setSelected(option);
        setIsOpen(false);
        onSelect(option);
    }

    return (
        <div className="relative w-full max-w-md">

            {/* Dropdown button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex w-full items-center justify-between
                    rounded-xl
                    border border-[#D8E6E2]
                    bg-[#F8FBFA]
                    px-4 py-3
                    text-left text-base font-medium text-[#243B38]
                    transition-all duration-300 ease-out
                    hover:border-[#43A88F]
                    hover:bg-white
                    focus:outline-none
                    focus:ring-2 focus:ring-[#43A88F]/20
                    ${isOpen ? "border-[#43A88F] bg-white shadow-sm" : ""}
                `}
            >
                <span className={selected ? "text-[#243B38]" : "text-[#8A9C98]"}>
                    {selected || placeholder}
                </span>

                <span
                    className={`
                        ml-4 text-xs text-[#43A88F]
                        transition-transform duration-300 ease-out
                        ${isOpen ? "rotate-180" : ""}
                    `}
                >
                    ▼
                </span>
            </button>

            {/* Dropdown menu */}
            <div
                className={`
                    absolute left-0 right-0 z-50 mt-2
                    overflow-hidden rounded-xl
                    border border-[#D8E6E2]
                    bg-white
                    shadow-[0_10px_30px_rgba(39,77,69,0.10)]
                    transition-all duration-300 ease-out
                    ${
                        isOpen
                            ? "translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-1 opacity-0"
                    }
                `}
            >
                <ul className="max-h-60 overflow-y-auto p-1.5">

                    {options.map((option) => (
                        <li key={option}>

                            <button
                                type="button"
                                onClick={() => handleSelect(option)}
                                className={`
                                    w-full rounded-lg
                                    px-3 py-2.5
                                    text-left text-sm
                                    transition-all duration-200 ease-out
                                    hover:bg-[#E8F4F0]
                                    ${
                                        selected === option
                                            ? "bg-[#E8F4F0] font-semibold text-[#2F8F78]"
                                            : "text-[#243B38]"
                                    }
                                `}
                            >
                                {option}

                                {selected === option && (
                                    <span className="float-right text-[#43A88F]">
                                        ✓
                                    </span>
                                )}
                            </button>

                        </li>
                    ))}

                </ul>
            </div>

        </div>
    );
}

export default Dropdown;
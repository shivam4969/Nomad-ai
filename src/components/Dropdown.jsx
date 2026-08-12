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
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="border border-gray-400 rounded-md px-4 py-2"
            >
                {selected || placeholder} ▼
            </button>

            {isOpen && (
                <ul>
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;

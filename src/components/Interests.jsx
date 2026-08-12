import { useState } from "react";

const interests = [
    "Food & Drink",
    "Culture & History",
    "Nature & Wildlife",
    "Adventure & Sports",
    "Relaxation & Wellness",
    "Shopping & Fashion",
    "Nightlife & Entertainment",
    "Arts & Music",
    "Technology & Innovation",
    "Family-Friendly Activities"
];

function Interests() {
    const [selectedInterests, setSelectedInterests] = useState([]);

    function handleSelect(interest) {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(
                selectedInterests.filter((i) => i !== interest)
            );
        } else {
            setSelectedInterests([
                ...selectedInterests,
                interest
            ]);
        }
    }

    return (
        <div className="interests w-full max-w-md text-silver-500 border border-gray-500 rounded-md px-4 py-2">

            <h2>Choose your Interests</h2>

            <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                    <button
                        key={interest}
                        onClick={() => handleSelect(interest)}
                        className={`m-1 px-3 py-2 rounded-full ${
                            selectedInterests.includes(interest)
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-black"
                        }`}
                    >
                        {interest}
                    </button>
                ))}
            </div>

        </div>
    );
}

export default Interests;
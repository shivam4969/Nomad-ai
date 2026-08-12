import { useState } from "react";
import Dropdown from "./Dropdown";

const tripLengths = [
    "3 Days",
    "7 Days",
    "15 Days",
    "20 Days",
    "25 Days",
    "30 Days",
    "1 Month+"
];
function TripLength() {
    const [selectedLength, setSelectedLength] = useState(null);
    
    function handleSelect(length) {
        setSelectedLength(length);
        console.log("Selected trip length:", length);
    }
    return (
        <div className="trip-length text-silver-500 border border-grey-500 rounded-md px-4 py-2">
            <h2>Choose your trip length</h2>
            <Dropdown 
                options={tripLengths}
                onSelect={handleSelect}
            />
        </div>
    );
}
export default TripLength;

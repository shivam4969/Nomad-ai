import Dropdown from "./Dropdown";
import { useTrip } from "../context/TripContext";

const travelStyles = [
    "Relaxed",
    "Balanced",
    "Adventurous",
];

function TravelStyle() {
    const { tripData, setTripData } = useTrip();
    return (
        <Dropdown
            options={travelStyles}
            placeholder="Travel Style"
            onSelect={(value) => {
                setTripData(prev => ({
                        ...prev,
                 travelStyle: value
                }));
            }}
        />
    );
}

export default TravelStyle;

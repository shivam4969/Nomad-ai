import Dropdown from "./Dropdown";

const travelStyles = [
    "Relaxed",
    "Balanced",
    "Adventurous",
];

function TravelStyle() {
    return (
        <Dropdown
            options={travelStyles}
            placeholder="Travel Style"
            onSelect={(value) => console.log(value)}
        />
    );
}

export default TravelStyle;

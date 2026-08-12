import Dropdown from "./Dropdown";

const tripStyles = [
    "Solo",
    "Duo",
    "Squad",
];

function TripStyle() {
    return (
        <div className="trip-style text-silver-500 border border-grey-500 rounded-md px-4 py-2">
            <h2>Choose your trip style</h2>
            <Dropdown 
                options={tripStyles}
                onSelect={(value) => console.log(value)}
            />
        </div>
    );
}
export default TripStyle;
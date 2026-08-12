import { useState }  from "react";
import Dropdown from "./Dropdown";
    const destinations = [
        "Tokyo, Japan",
        "Kyoto, Japan",
        "Osaka, Japan",
        "Seoul, South Korea",
        "Paris, France",
        "Rome, Italy",
        "Barcelona, Spain",
        "New York, USA"];
    
function DestinationIn() {
    const [destination, setDestination] = useState("");
    
    const filteredDestinations = destinations.filter((place) =>
        place.toLowerCase().includes(destination.toLowerCase())
    );
    return (
        <div className="destination-in text-silver-500 border border-grey-500 rounded-md px-4 py-2">
            <input 
                type="text" 
                placeholder="Enter your destination" 
                className="destination-input" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            />
            <Dropdown 
                options={filteredDestinations}
                onSelect={setDestination}
            />
        </div>
    )
}
export default DestinationIn;

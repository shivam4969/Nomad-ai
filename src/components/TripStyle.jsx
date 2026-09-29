
import Dropdown from "./Dropdown";
import TravelStyle from "./TravelStyle";
import { useTrip } from "../context/TripContext";

const tripStyles = [
    "Solo",
    "Duo",
    "Squad",
];

function TripStyle() {
    const { setTripData } = useTrip();
    return (
        <div className="trip-style text-silver-500 border border-grey-500 rounded-md px-4 py-2">
          
            <Dropdown 
                options={tripStyles}
                placeholder="Trip Style"
                onSelect={(value) =>  
                    setTripData(prev => ({
                        ...prev,
                 tripStyle: value
                }))
                }
            />
        </div>
    );
}
export default TripStyle;
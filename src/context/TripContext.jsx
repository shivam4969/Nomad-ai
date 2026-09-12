import { createContext, useContext, useState } from "react";

const TripContext = createContext();

export function TripProvider({ children }) {
    const [tripData, setTripData] = useState({
        destination: "",
        duration: "",
        travelStyle: "",
        tripStyle: "",
        interests: []
    });

    return (
        <TripContext.Provider value={{ tripData, setTripData }}>
            {children}
        </TripContext.Provider>
    );
}

export function useTrip() {
    return useContext(TripContext);
}
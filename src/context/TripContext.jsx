import { createContext, useContext, useState } from "react";

const TripContext = createContext();

export function TripProvider({ children }) {
    const [tripData, setTripData] = useState({
        destination: "",
        startDate: "",
        endDate: "",
        travelStyle: "",
        tripStyle: "",
        interests: [],
        budget: 1000,
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
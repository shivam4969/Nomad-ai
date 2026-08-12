import Navbar from "../components/Navbar";
import PrimaryButton from "../components/PrimaryButton";
import TravelStyle from "../components/TravelStyle";
import TripStyle from "../components/TripStyle";
import Interests from "../components/Interests";

function Confirmation() {
    return (
        <div className="min-h-screen bg-[#DDEFEA]">

            <Navbar />

            <div className="confirmation min-h-screen flex flex-col items-center justify-center gap-10">

                <h1 className="font-bold px-4 py-2">
                    JUST A LAST FEW STEPS TO GET STARTED
                </h1>

                <TravelStyle />

                <TripStyle />

                <Interests />

                <PrimaryButton />

            </div>

        </div>
    );
}

export default Confirmation;
import TripLength from "../components/TripLength";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DestinationIn from "../components/DestinationIn";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
    function Dashboard() {
        const navigate = useNavigate();
        return (
            <div className="min-h-screen bg-[#DDEFEA]">
                <div className="dashboard min-h-screen flex flex-col items-center justify-center gap-10">

                    <h1 className = "font-bold px-4 py-2">
                        Welcome to Nomad AI Dashboard
                    </h1>
                    <h2> Lets get you started with a few questions </h2>
                    <Navbar />
                    <DestinationIn />
                    <TripLength />
                    <PrimaryButton 
                        onClick={() => navigate("/confirmation")}   
                    />
                    <Footer />
                </div>
            </div>
        );
}
export default Dashboard;
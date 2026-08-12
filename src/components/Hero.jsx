import {useNavigate} from "react-router-dom";
function Hero() {
    const navigate = useNavigate();
    return (
        <section className="hero">
            <div
            className = "h-screen bg-cover bg-center h-screen bg-cover bg-center flex flex-col items-center justify-center gap-10"
            style={{ backgroundImage: `url('/Hero.jpg')` }}
            >
                <h1 className = "text-5xl font-bold text-center gap-10 max-w-md ">
                    Explore like a local 
                    Nomad
                </h1>
                <button className="bg-green-600 text-white min-w-80 py-6 rounded-lg mt-16 text-2xl font-bold hover:bg-green-700 transition duration-300"
                onClick={() => navigate("/dashboard")}
                >Get Started
                </button>
            </div>
        </section>
    )
}
export default Hero;
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();

    return (
        <section className="relative h-screen w-full overflow-hidden">

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{ backgroundImage: "url('/Hero.jpg')" }}
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">

                {/* Small label */}
                <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-white/80">
                    Your journey starts here
                </p>

                {/* Main heading */}
                <h1 className="max-w-4xl text-6xl font-bold leading-[1.05] tracking-tight md:text-8xl">
                    Explore like a local.
                    <br />
                    <span className="text-white/80">
                        Travel like a nomad.
                    </span>
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
                    Let AI build a trip around your interests,
                    your travel style, and the places you want to discover.
                </p>

                {/* CTA */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="group mt-30 flex items-center gap-5 rounded-full bg-white px-14 py-5 text-lg font-semibold text-[#243b38] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:px-12 hover:shadow-2xl active:scale-105" >
                    Start exploring

                    <span className="transition-transform duration-400 group-hover:translate-x-1">
                        →
                    </span>
                </button>

                {/* Bottom scroll indicator */}
                <div className="absolute bottom-8 flex flex-col items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/60">
                    <span>Scroll to explore</span>

                    <div className="h-10 w-px animate-pulse bg-white/50" />
                </div>

            </div>

        </section>
    );
}

export default Hero;
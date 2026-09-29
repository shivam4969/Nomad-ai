function Footer() {
    return (
        <footer className="border-t border-[#DDEEE9] bg-[#F5FAF8] px-6 py-8 sm:px-10">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">

                {/* Brand */}
                <a
                    href="/"
                    className="font-serif text-lg font-normal tracking-[-0.02em] text-[#0F1F1B] no-underline"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                    nomad<span className="text-[#3DB896]">.</span>ai
                </a>

                {/* Centre note */}
                <p className="text-xs text-[#A8BFBA] text-center">
                    Built for curious travellers · &copy; 2026 Nomad AI
                </p>

                {/* Links */}
                <div className="flex gap-5">
                    {["Privacy", "Terms", "Contact"].map((item) => (
                        <a
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-xs font-medium text-[#6B8880] no-underline transition-colors duration-150 hover:text-[#3DB896]"
                        >
                            {item}
                        </a>
                    ))}
                </div>

            </div>
        </footer>
    );
}

export default Footer;
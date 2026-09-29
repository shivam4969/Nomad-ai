import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        function onScroll() { setScrolled(window.scrollY > 12); }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => { setMenuOpen(false); }, [location]);

    const links = [
        { href: "/",       label: "Home"    },
        { href: "/about",  label: "About"   },
        { href: "/contact",label: "Contact" },
    ];

    return (
        <nav
            className={`
                fixed top-0 left-0 right-0 z-50
                flex items-center justify-between
                px-6 py-4 sm:px-10
                transition-all duration-300
                ${scrolled
                    ? "bg-[#F5FAF8]/90 backdrop-blur-xl border-b border-[#DDEEE9] shadow-[0_1px_12px_rgba(15,31,27,0.06)]"
                    : "bg-transparent"
                }
            `}
        >
            {/* Logo */}
            <a
                href="/"
                className="font-serif text-xl font-normal tracking-[-0.02em] text-[#0F1F1B] no-underline"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
                nomad<span className="text-[#3DB896]">.</span>ai
            </a>

            {/* Desktop links */}
            <ul className="hidden items-center gap-8 sm:flex list-none m-0 p-0">
                {links.map(({ href, label }) => {
                    const active = location.pathname === href;
                    return (
                        <li key={href}>
                            <a
                                href={href}
                                className={`
                                    text-sm font-medium no-underline
                                    transition-colors duration-150
                                    ${active
                                        ? "text-[#0F1F1B]"
                                        : "text-[#6B8880] hover:text-[#0F1F1B]"
                                    }
                                `}
                            >
                                {label}
                                {active && (
                                    <span className="mx-auto mt-1 block h-[2px] w-full rounded-full bg-[#3DB896]" />
                                )}
                            </a>
                        </li>
                    );
                })}
            </ul>

            {/* Mobile hamburger */}
            <button
                type="button"
                onClick={() => setMenuOpen(o => !o)}
                className="flex sm:hidden flex-col gap-[5px] p-1"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
            >
                <span className={`block h-[1.5px] w-5 bg-[#0F1F1B] rounded-full transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
                <span className={`block h-[1.5px] w-5 bg-[#0F1F1B] rounded-full transition-all duration-200 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`block h-[1.5px] w-5 bg-[#0F1F1B] rounded-full transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>

            {/* Mobile dropdown */}
            <div
                className={`
                    absolute top-full left-0 right-0
                    bg-[#F5FAF8]/95 backdrop-blur-xl
                    border-b border-[#DDEEE9]
                    overflow-hidden transition-all duration-300 sm:hidden
                    ${menuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}
                `}
            >
                <ul className="flex flex-col list-none m-0 p-0 px-6 py-4 gap-1">
                    {links.map(({ href, label }) => (
                        <li key={href}>
                            <a
                                href={href}
                                className={`
                                    block py-2.5 text-sm font-medium no-underline
                                    transition-colors duration-150
                                    ${location.pathname === href
                                        ? "text-[#3DB896]"
                                        : "text-[#2E4A44] hover:text-[#3DB896]"
                                    }
                                `}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
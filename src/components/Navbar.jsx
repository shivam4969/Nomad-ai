function Navbar() {
    return (
        <nav>
            <ul className="list-disc flex space-x-5 flex-row justify-center items-center gap-6">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
}   
export default Navbar;
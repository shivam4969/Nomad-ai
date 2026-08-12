function PrimaryButton({onClick}) {
    return (
        <button className="bg-green-600 text-white px-12 py-4 rounded-lg font-bold text-xl hover:bg-green-700 transition duration-300"
                onClick={onClick}>
            Continue
        </button>
    )
}
export default PrimaryButton;

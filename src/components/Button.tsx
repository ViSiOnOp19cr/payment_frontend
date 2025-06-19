export const Button = ({ label, onClick }: {
    label: string;
    onClick: () => void;
}) => {
    return (
        <button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={onClick}
        >
            {label}
        </button>
    );
};
export const ErrorModal = ({ open, message, onClose }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        {/* Icono de error simple */}
                        <div className="text-red-500 mr-2">⚠️</div>
                        <h2 className="text-lg font-semibold">Error</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4">
                    {message}
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 font-semibold"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

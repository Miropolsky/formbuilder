import { useNavigate } from "react-router-dom";

const ErrorPage = ({ errorCode = "404", errorMessage = "Page not found" }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500">{errorCode}</h1>
            <p className="text-xl text-gray-700 mt-4">{errorMessage}</p>
            <div className="mt-6">
                <button
                    onClick={handleGoBack}
                    className="bg-blue-500 text-white py-2 px-4 rounded mr-4 hover:bg-blue-600"
                >
                    Go Back
                </button>
                <button
                    onClick={handleGoHome}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;

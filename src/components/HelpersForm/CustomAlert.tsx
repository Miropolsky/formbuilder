import { useEffect } from "react";
import { Button } from "react-bootstrap";

interface IProps {
    type: "success" | "error" | "info";
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

export const CustomAlert = ({ type, message, isVisible, onClose }: IProps) => {
    const alertColors = {
        success: "bg-green-500 border-green-700",
        error: "bg-red-500 border-red-700",
        info: "bg-blue-500 border-blue-700",
    };

    const iconTypes = {
        success: "✅",
        error: "❌",
        info: "ℹ️",
    };

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <div
            className={`fixed bottom-5 right-5 z-50 flex items-center text-white p-4 border-l-4 rounded-md shadow-lg
            transition-all duration-300 transform ${
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
            } ${alertColors[type]}`}
            style={{ minWidth: "300px" }}
        >
            <span className="mr-2">{iconTypes[type]}</span>
            <span className="flex-grow">{message}</span>
            <Button
                variant="outline-light"
                size="sm"
                className="ml-3"
                onClick={onClose}
            >
                Close
            </Button>
        </div>
    );
};

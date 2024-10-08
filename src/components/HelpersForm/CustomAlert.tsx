import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { TypeCustomAlert } from "../../utils/utils";

interface IProps {
    type: TypeCustomAlert;
    message: string;
    isVisible: boolean;
    onClose: () => void;
}
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

export const CustomAlert = ({ type, message, isVisible, onClose }: IProps) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <CSSTransition in={isVisible} timeout={500} classNames="" unmountOnExit>
            <div
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition:
                        "opacity 500ms ease-in-out, transform 500ms ease-in-out",
                }}
                className={`fixed bottom-5 right-5 z-50 flex items-center text-white p-4 border-l-4 rounded-md shadow-lg ${alertColors[type]}`}
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
        </CSSTransition>
    );
};

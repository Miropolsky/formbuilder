import React from "react";

interface ModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <p>{message}</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onCancel}
                        className="mr-2 px-4 py-2 bg-gray-200"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white"
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

import React from "react";

interface IProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const CustomModal: React.FC<IProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Фон для затемнения */}
            <div className="fixed inset-0 bg-black opacity-50"></div>

            {/* Содержимое модального окна */}
            <div className="relative bg-white p-4 rounded shadow-lg z-10">
                <p>{message}</p>
                <div className="flex justify-between mt-4">
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

export default CustomModal;

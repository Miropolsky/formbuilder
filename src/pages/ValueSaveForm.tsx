import { useState, useEffect } from "react";
import axios from "axios";

// Функция для рендеринга вложенных объектов
const renderObject = (obj: Record<string, any>, indentLevel = 0) => {
    const indent = " ".repeat(indentLevel * 4); // Для отступов
    return Object.entries(obj).map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
            // Если это объект, вызываем функцию рекурсивно
            return (
                <div key={key} className="ml-4">
                    <strong>{indent + key}:</strong>
                    <div className="ml-4">
                        {renderObject(value, indentLevel + 1)}
                    </div>
                </div>
            );
        }
        // Если это не объект, просто выводим ключ-значение
        return (
            <p key={key}>
                <strong>{indent + key}:</strong> {String(value)}
            </p>
        );
    });
};

export default function ValueSaveForm() {
    const [savedData, setSavedData] = useState<{ data: Record<string, any> }[]>(
        [],
    );

    useEffect(() => {
        // Получаем сохраненные данные при загрузке компонента
        axios
            .get("http://localhost:5000/getData")
            .then((response) => {
                setSavedData(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
            });
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mt-8">Сохраненные данные</h2>
            <ul className="mt-4">
                {savedData.map((dataObj, index) => (
                    <li key={index} className="border p-4 mb-2">
                        {renderObject(dataObj.data)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

import { useState, useEffect } from "react";
import { useStoreDispatch, useStoreSelector } from "../redux/store";
import { getAllValue } from "../redux/builder";
import { LoadValues } from "../utils/utils";

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
    const savedData: LoadValues[] = useStoreSelector(
        (state) => state.builder.loadValues,
    );
    const dispatch = useStoreDispatch();

    const [selectedForm, setSelectedForm] = useState<string>("all"); // "all" для отображения всех данных

    useEffect(() => {
        dispatch(getAllValue());
    }, [dispatch]);

    // Получение уникальных имен форм для отображения в select
    const formNames = Array.from(
        new Set(savedData.map((dataObj) => dataObj.name)),
    );

    // Фильтрация данных по выбранному имени формы
    const filteredData =
        selectedForm === "all"
            ? savedData
            : savedData.filter((dataObj) => dataObj.name === selectedForm);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mt-8">Сохраненные данные</h2>

            {/* Селект для выбора имени формы */}
            <div className="my-4">
                <label htmlFor="form-select" className="block mb-2 font-bold">
                    Выберите форму:
                </label>
                <select
                    id="form-select"
                    className="border p-2 rounded-md"
                    value={selectedForm}
                    onChange={(e) => setSelectedForm(e.target.value)}
                >
                    <option value="all">Показать все формы</option>
                    {formNames.map((name, index) => (
                        <option key={index} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Отображение данных */}
            <ul className="mt-4">
                {filteredData.length > 0 ? (
                    filteredData.map((dataObj, index) => (
                        <li key={index} className="border p-4 mb-2">
                            <h3 className="font-bold">Форма: {dataObj.name}</h3>
                            {renderObject(dataObj.data)}
                        </li>
                    ))
                ) : (
                    <p>Нет данных для отображения.</p>
                )}
            </ul>
        </div>
    );
}

import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import {
    deleteLoadSchema,
    setCurNameSchema,
    setSchema,
} from "../../redux/builder";

export default function LoadedForm() {
    const [selectedForm, setSelectedForm] = useState("");
    const savedForms = useStoreSelector((state) => state.builder.loadSchems);
    const dispatch = useStoreDispatch();

    const loadFormSchema = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files?.[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result;
            if (typeof result === "string") {
                try {
                    const loadedSchema = JSON.parse(result);
                    dispatch(setSchema(loadedSchema));
                    dispatch(setCurNameSchema(file.name.slice(0, -5)));
                    alert("Форма загружена!");
                } catch (error) {
                    alert("Ошибка при загрузке формы");
                }
            } else {
                alert("Ошибка! Некорректные данные");
            }
        };
        reader.readAsText(file);
    };

    const handleDeleteForm = () => {
        dispatch(deleteLoadSchema(selectedForm));
        dispatch(setSchema({ display: "form", components: [] }));
        alert("Форма удалена из списка.");
    };

    const handleLoadSelectedForm = (name: string) => {
        const form = savedForms.find((form) => form.name === name);
        if (form) {
            dispatch(setSchema(form.schema));
            dispatch(setCurNameSchema(form.name));
            alert("Форма загружена!");
        } else {
            alert("Форма не найдена.");
        }
    };
    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedForm(e.target.value);
        handleLoadSelectedForm(e.target.value);
    };
    return (
        <>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-2xl">
                <div className="flex flex-col gap-6">
                    <div>
                        <div className="text-xl font-semibold mb-2 text-gray-700">
                            Загрузить форму с компьютера
                        </div>
                        <input
                            type="file"
                            accept="application/json"
                            onChange={loadFormSchema}
                            className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="text-lg font-semibold mb-2 block">
                            Выберите сохраненную форму
                        </label>
                        <Form.Select
                            aria-label="Выберите сохраненную форму"
                            value={selectedForm}
                            onChange={(e) => onChangeSelect(e)}
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Выберите форму</option>
                            {savedForms.map((form) => (
                                <>
                                    <option key={form.name} value={form.name}>
                                        {form.name}
                                    </option>
                                </>
                            ))}
                        </Form.Select>
                        <div className="flex gap-4 mt-4">
                            {/* <Button
                                className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={handleLoadSelectedForm}
                            >
                                Загрузить
                            </Button> */}
                            <Button
                                className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={handleDeleteForm}
                            >
                                Удалить
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

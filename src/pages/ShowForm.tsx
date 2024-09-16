import { Form } from "react-bootstrap";
import { IloadSchema } from "../utils/utils";
import { useEffect, useState } from "react";
import { useStoreDispatch, useStoreSelector } from "../redux/store";
import { getAllForms } from "../redux/builder";

export default function ShowForm() {
    const [loadSchema, setLoadSchema] = useState<null | IloadSchema>(null);
    const [nameForm, setNameForm] = useState("");
    const savedForms = useStoreSelector((state) => state.builder.loadSchems);
    const dispatch = useStoreDispatch();

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNameForm(e.target.value);
        handleLoadSelectedForm(e.target.value);
    };
    const handleLoadSelectedForm = (name: string) => {
        const form = savedForms.find((form) => form.name === name);
        if (form) {
            setLoadSchema(form);
            alert("Форма загружена!");
        } else {
            alert("Форма не найдена.");
        }
    };

    useEffect(() => {
        dispatch(getAllForms());
    }, []);

    return (
        <div className="p-4">
            <div className="w-1/3">
                <label className="text-lg font-semibold mb-2 block">
                    Выберите сохраненную форму
                </label>
                <Form.Select
                    aria-label="Выберите сохраненную форму"
                    value={nameForm}
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
            </div>
            <div>
                <Form></Form>
            </div>
        </div>
    );
}

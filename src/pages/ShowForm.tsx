import { Button, Form as FormBootStrap } from "react-bootstrap";
import { Form } from "@formio/react";
import { CustomSchemaType } from "../utils/utils";
import { useEffect, useRef, useState } from "react";
import { useStoreDispatch, useStoreSelector } from "../redux/store";
import { addValue, getAllForms } from "../redux/builder";
import { Webform } from "@formio/js";

export default function ShowForm() {
    const [loadSchema, setLoadSchema] = useState<null | CustomSchemaType>(null);
    const [nameForm, setNameForm] = useState("");
    const savedForms = useStoreSelector((state) => state.builder.loadSchems);
    const dispatch = useStoreDispatch();
    const formInstance = useRef<null | Webform>(null);

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

    const handleFormReady = (instance: Webform) => {
        formInstance.current = instance;
    };

    const handleButtonClick = () => {
        if (!formInstance.current) {
            console.log("Наша форма еще не готова.");
            return;
        }

        const formData = formInstance.current.getValue(); // Получаем значения формы
        console.log("Данные формы:", formData);
    };

    const handleEvent = (event: any) => {
        console.log(event);
        if (event.type === "button" && event.component.key === "myButtonKey") {
            // Замените myButtonKey на ключ вашей кнопки
            handleButtonClick();
        }
    };

    useEffect(() => {
        dispatch(getAllForms());
    }, [dispatch]);

    const handleEventSaveValue = () => {
        console.log(formInstance.current);
        if (formInstance.current) {
            dispatch(
                addValue({
                    data: { ...formInstance.current?.getValue().data },
                    name: nameForm,
                }),
            );
        }
    };

    return (
        <div className="p-4">
            <div className="w-1/3">
                <label className="text-lg font-semibold mb-2 block">
                    Выберите сохраненную форму
                </label>
                <FormBootStrap.Select
                    aria-label="Выберите сохраненную форму"
                    value={nameForm}
                    onChange={onChangeSelect}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Выберите форму</option>
                    {savedForms.map((form) => (
                        <option key={form.name} value={form.name}>
                            {form.name}
                        </option>
                    ))}
                </FormBootStrap.Select>
            </div>
            <div className="mt-3 flex justify-end mr-10">
                <Button onClick={handleEventSaveValue}>
                    Сохранить значения
                </Button>
            </div>
            <div>
                {loadSchema && (
                    <Form
                        src={loadSchema}
                        onFormReady={handleFormReady}
                        onSubmitDone={handleEvent} // Обработчик событий // Можно создать кнопку для сохранения значений, а не создавать ее в форм буилдере, тогда через нее будет универсальный url, который все значения форм принимает и потом будет отображать
                    />
                )}
            </div>
        </div>
    );
}

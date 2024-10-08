import { Button, Form as FormBootStrap } from "react-bootstrap";
import { Form } from "@formio/react";
import { CustomSchemaType, TypeCustomAlert } from "../utils/utils";
import { useEffect, useRef, useState } from "react";
import { useStoreDispatch, useStoreSelector } from "../redux/store";
import { addValue, getAllForms } from "../redux/builder";
import { Webform } from "@formio/js";
import { CustomAlert } from "../components/HelpersForm/CustomAlert";

export default function ShowForm() {
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState<TypeCustomAlert>("error");
    const [loadSchema, setLoadSchema] = useState<null | CustomSchemaType>(null);
    const [nameForm, setNameForm] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
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
            setTypeAlert("success");
            setTextAlert("Форма загружена!");
        } else {
            setTypeAlert("error");
            setTextAlert("Форма не найдена.");
        }
    };

    const handleFormReady = (instance: Webform) => {
        formInstance.current = instance;
    };

    const handleButtonClick = async () => {
        if (!formInstance.current) {
            console.log("Форма еще не готова.");
            return;
        }

        // Получаем данные формы перед проверкой валидности
        const formData = formInstance.current.getValue();
        console.log(formData);

        // Проверяем валидность формы
        const isValid = formInstance.current.validate(
            formData, // Данные формы
        );
        console.log(isValid);
        if (isValid.length === 0) {
            // console.log("Данные формы:", formData);

            // Выполните отправку данных на сервер
            dispatch(
                addValue({
                    data: { ...formData.data }, // Измените это в зависимости от структуры данных
                    name: nameForm,
                }),
            );

            setTypeAlert("success");
            setTextAlert("Форма успешно отправлена!");
        } else {
            setTypeAlert("error");
            setTextAlert("Ошибка валидации. Пожалуйста, проверьте форму.");
            formInstance.current.showErrors(
                formInstance.current.errors, // Ошибки формы
                formData, // Передаем текущие данные формы
            );
        }
    };

    useEffect(() => {
        dispatch(getAllForms());
    }, [dispatch]);

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
                <Button onClick={handleButtonClick} disabled={isButtonDisabled}>
                    {isButtonDisabled ? "Подождите..." : "Сохранить значения"}
                </Button>
            </div>
            <div>
                {loadSchema && (
                    <Form src={loadSchema} onFormReady={handleFormReady} />
                )}
            </div>
            <CustomAlert
                onClose={() => setTextAlert("")}
                isVisible={textAlert !== ""}
                message={textAlert}
                type={typeAlert}
            />
        </div>
    );
}

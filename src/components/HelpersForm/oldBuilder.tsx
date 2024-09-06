import { FormBuilder, FormType } from "@formio/react";
import React, { useMemo, useRef, useState } from "react";
import "../styles/Builder.css";
import { Button, Card, Form } from "react-bootstrap";
import { Form as FormReact } from "@formio/react";
import ReactJson from "@microlink/react-json-view";
import { saveAs } from "file-saver";

const translations = {
    ru: {
        Submit: "Отправить",
        Cancel: "Отмена",
        Save: "Сохранить",
        Remove: "Удалить",
        invalid_email: "Некорректный email",
        required: "Это поле обязательно для заполнения",
        Display: "Дисплей",
        Action: "Действие",
        Theme: "Тема",
        Logic: "Логика",
        Preview: "Предпросмотр",
        Size: "Размер",
        Description: "Описание",
        Label: "Название поля",
        "Label Position": "Позиция названия поля",
        Top: "Сверху",
        Bottom: "Снизу",
        Left: "Слева",
        Right: "Справа",
        Validation: "Валидация",
        "Hide preview": "Скрыть предпросмотр",
        "Show preview": "Показать предпросмотр",
    },
    en: {
        Submit: "Submit",
        Cancel: "Cancel",
        Save: "Save",
        Remove: "Remove",
        invalid_email: "Invalid email",
        required: "This field is required",
        Display: "Display",
        Action: "Action",
        Theme: "Theme",
        Logic: "Logic",
        Preview: "Preview",
        Size: "Size",
        Description: "Description",
        Label: "Field Label",
        "Label Position": "Label Position",
        Top: "Top",
        Bottom: "Bottom",
        Left: "Left",
        Right: "Right",
        Validation: "Validation",
        "Hide preview": "Hide preview",
        "Show preview": "Show preview",
    },
};

const Builder = () => {
    const [nameForm, setNameForm] = useState("");
    const [language, setLanguage] = useState("ru");
    const [schema, setSchema] = useState<FormType>({
        display: "form",
        components: [],
    });
    const [savedForms, setSavedForms] = useState<
        { name: string; schema: FormType }[]
    >([]);
    const [selectedForm, setSelectedForm] = useState<string>("");

    const schemaRef = useRef(schema);

    const customOptions = useMemo(
        () => ({
            language: language,
            i18n: translations,
            noNewEdit: true,
            editForm: {
                textfield: [
                    /* ... */
                ],
                password: [
                    /* ... */
                ],
                number: [
                    /* ... */
                ],
                time: [
                    /* ... */
                ],
                address: [
                    /* ... */
                ],
                url: [
                    /* ... */
                ],
            },
            builder: {
                advanced: {
                    /* ... */
                },
                premium: false,
                basic: {
                    /* ... */
                },
            },
        }),
        [language],
    );

    const onFormChange = (newSchema: FormType) => {
        if (typeof newSchema === "object" && newSchema !== null) {
            setSchema(newSchema);
        } else {
            console.error("Некорректные данные схемы");
        }
    };

    const saveFormSchema = () => {
        localStorage.setItem("formSchema", JSON.stringify(schema));
        const blob = new Blob([JSON.stringify(schema, null, 2)], {
            type: "application/json",
        });
        saveAs(blob, nameForm ? nameForm : "FormJson");
        alert("Форма сохранена!");
    };

    const loadFormSchemaLocalStorage = () => {
        const savedSchema = localStorage.getItem("formSchema");
        if (savedSchema) {
            schemaRef.current = JSON.parse(savedSchema);
            setSchema(JSON.parse(savedSchema));
            alert("Форма загружена!");
        } else {
            alert("Нет сохраненной формы для загрузки.");
        }
    };

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
                    schemaRef.current = loadedSchema;
                    setSchema(loadedSchema);
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

    const handleSaveForm = () => {
        if (nameForm.trim()) {
            const newForm = { name: nameForm, schema };
            setSavedForms((prevForms) => [...prevForms, newForm]);
            setNameForm("");
            alert("Форма добавлена в список сохраненных!");
        } else {
            alert("Введите имя формы перед сохранением.");
        }
    };

    const handleDeleteForm = () => {
        setSavedForms((prevForms) =>
            prevForms.filter((form) => form.name !== selectedForm),
        );
        setSelectedForm("");
        setSchema({ display: "form", components: [] });
        alert("Форма удалена из списка.");
    };

    const handleLoadSelectedForm = () => {
        const form = savedForms.find((form) => form.name === selectedForm);
        if (form) {
            setSchema(form.schema);
            alert("Форма загружена!");
        } else {
            alert("Форма не найдена.");
        }
    };

    return (
        <>
            <div className="ml-2 mt-2 mb-2 w-[100px]">
                <Form.Select
                    aria-label="Выберите язык"
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                >
                    <option value="ru">RU</option>
                    <option value="en">EN</option>
                </Form.Select>

                <div className="flex gap-x-5">
                    <Button className="mt-2" onClick={saveFormSchema}>
                        Сохранить форму
                    </Button>
                    <Button
                        className="mt-2"
                        onClick={loadFormSchemaLocalStorage}
                    >
                        Загрузить форму с localeStorage
                    </Button>
                    <Button
                        className="mt-2"
                        onClick={() => console.log(schema)}
                    >
                        scheme
                    </Button>
                    <div>
                        <div className="text-xl font-bold">
                            Загрузить форму с компьютера
                        </div>
                        <input
                            type="file"
                            accept="application/json"
                            onChange={loadFormSchema}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="ml-[290px] mb-4 w-[400px]">
                    <label>Имя формы</label>
                    <Form.Control
                        onChange={(e) => setNameForm(e.target.value)}
                        value={nameForm}
                    />
                    <Button className="mt-2" onClick={handleSaveForm}>
                        Сохранить в списке
                    </Button>
                </div>

                <div className="ml-[290px] mb-4 w-[400px]">
                    <label>Выберите сохраненную форму</label>
                    <Form.Select
                        aria-label="Выберите сохраненную форму"
                        value={selectedForm}
                        onChange={(e) => setSelectedForm(e.target.value)}
                    >
                        <option value="">Выберите форму</option>
                        {savedForms.map((form) => (
                            <option key={form.name} value={form.name}>
                                {form.name}
                            </option>
                        ))}
                    </Form.Select>
                    <div className="mt-2">
                        <Button onClick={handleLoadSelectedForm}>
                            Загрузить выбранную форму
                        </Button>
                        <Button
                            variant="danger"
                            className="ml-2"
                            onClick={handleDeleteForm}
                        >
                            Удалить выбранную форму
                        </Button>
                    </div>
                </div>
            </div>

            <form>
                <FormBuilder
                    initialForm={schemaRef.current}
                    options={customOptions}
                    onChange={onFormChange}
                />
            </form>

            <Card title="Form JSON Schema" className="my-4">
                <Card.Body>
                    <Card.Title className="text-center">
                        As JSON Schema
                    </Card.Title>
                    <ReactJson
                        src={schema}
                        name={null}
                        collapsed={false}
                    ></ReactJson>
                </Card.Body>
            </Card>

            <Card className="my-4">
                <Card.Body>
                    <Card.Title className="text-center">
                        As Rendered Form
                    </Card.Title>
                    <FormReact src={schema} />
                </Card.Body>
            </Card>
        </>
    );
};

export default Builder;

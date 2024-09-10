import { FormBuilder, FormType } from "@formio/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import { formOptions } from "../../utils/utils";
import {
    addLoadSchema,
    setCurNameSchema,
    setSchema,
} from "../../redux/builder";
import { translations } from "../../utils/constans";
import { Button, Form } from "react-bootstrap";
import { saveAs } from "file-saver";

export default function BuildForm() {
    const language = useStoreSelector((state) => state.builder.language);
    const nameSchema = useStoreSelector((state) => state.builder.curNameSchema);
    const globalSchema = useStoreSelector((state) => state.builder.schema);
    const savedForms = useStoreSelector((state) => state.builder.loadSchems);
    const [nameForm, setNameForm] = useState("");
    const [localSchema, setLocalSchema] = useState<FormType>({
        display: "form",
        components: [],
    });
    const schemaRef = useRef(globalSchema);
    const dispatch = useStoreDispatch();

    const onFormChange = useCallback((newSchema: FormType) => {
        if (typeof newSchema === "object" && newSchema !== null) {
            setLocalSchema(newSchema);
            dispatch(setSchema(newSchema));
        } else {
            console.error("Некорректные данные схемы");
        }
    }, []);
    const customOptions = useMemo(
        () => ({ ...formOptions(language), i18n: translations }),
        [language],
    );
    const handleSaveForm = () => {
        if (localSchema.components.length === 0) {
            alert("Невозможно сохранить пустую форму");
            return;
        }
        let nameForm = prompt("Введите название формы");
        if (nameForm && nameForm.trim()) {
            const newForm = { name: nameForm, schema: localSchema };
            dispatch(addLoadSchema(newForm));
            dispatch(setCurNameSchema(""));
            setNameForm("");
            alert("Форма добавлена в список сохраненных!");
        } else {
            alert("Некорректное имя формы");
        }
    };
    useEffect(() => {
        schemaRef.current = globalSchema;
        setNameForm(nameSchema);
    }, [nameSchema]);
    const downloadFormSchema = () => {
        if (localSchema.components.length === 0) {
            alert("Невозможно сохранить пустую форму");
            return;
        }
        let nameForm = prompt("Введите название формы");
        if (nameForm && nameForm.trim()) {
            const blob = new Blob([JSON.stringify(localSchema, null, 2)], {
                type: "application/json",
            });
            saveAs(blob, nameForm);
            alert("Форма сохранена!");
        } else {
            alert("Некорректное имя формы");
        }
    };
    const resetFormSchema = () => {
        dispatch(setCurNameSchema(""));
        dispatch(
            setSchema({
                display: "form",
                components: [],
            }),
        );
        setLocalSchema({
            display: "form",
            components: [],
        });
        setNameForm("");
        schemaRef.current = {
            display: "form",
            components: [],
        };
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

    const handleLoadSelectedForm = (name: string) => {
        const form = savedForms.find((form) => form.name === name);
        if (form) {
            schemaRef.current = form.schema;
            dispatch(setSchema(form.schema));
            dispatch(setCurNameSchema(form.name));
            alert("Форма загружена!");
        } else {
            alert("Форма не найдена.");
        }
    };
    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNameForm(e.target.value);
        handleLoadSelectedForm(e.target.value);
    };

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-lg mt-8 space-y-8">
                <form className="flex flex-col ">
                    <div className="flex gap-x-4 items-center">
                        <div>
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
                                        <option
                                            key={form.name}
                                            value={form.name}
                                        >
                                            {form.name}
                                        </option>
                                    </>
                                ))}
                            </Form.Select>
                        </div>
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
                    </div>
                    <div className="flex gap-x-4 items-end mt-3">
                        <Button
                            className="mt-2 h-10 bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
                            onClick={handleSaveForm}
                        >
                            Сохранить форму в список
                        </Button>

                        <Button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
                            onClick={downloadFormSchema}
                        >
                            Скачать форму
                        </Button>
                        <Button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
                            onClick={resetFormSchema}
                        >
                            Очистить форму
                        </Button>
                    </div>
                </form>
                <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 shadow-sm min-h-[700px] ">
                    <FormBuilder
                        initialForm={schemaRef.current}
                        options={customOptions}
                        onChange={onFormChange}
                    />
                </div>
            </div>
        </>
    );
}

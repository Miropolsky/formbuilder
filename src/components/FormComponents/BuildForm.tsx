import { FormBuilder, FormType } from "@formio/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import { CustomSchemaType, formOptions } from "../../utils/utils";
import {
    addForm,
    deleteForm,
    editForm,
    getAllForms,
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
    const [localSchema, setLocalSchema] = useState<CustomSchemaType>({
        name: "",
        id: "",
        display: "form",
        components: [],
    });
    const schemaRef = useRef(globalSchema);
    const dispatch = useStoreDispatch();

    const onFormChange = useCallback((newSchema: FormType) => {
        if (typeof newSchema === "object" && newSchema !== null) {
            setLocalSchema({
                ...newSchema,
                id: localSchema.id,
                name: localSchema.name,
            });
            dispatch(
                setSchema({
                    ...newSchema,
                    id: localSchema.id,
                    name: localSchema.name,
                }),
            );
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
        let nameForm = prompt("Введите название формы", nameSchema);
        if (
            savedForms.find((el) => el.name === nameForm) !== undefined &&
            nameForm
        ) {
            handleEditLoadSchema();
        } else if (nameForm && nameForm.trim()) {
            const newForm = { name: nameForm, schema: localSchema, id: "" };
            dispatch(addForm(newForm));
            dispatch(setCurNameSchema(""));
            alert("Форма добавлена в список сохраненных!");
        } else {
            alert("Некорректное имя формы");
        }
    };
    useEffect(() => {
        schemaRef.current = globalSchema;
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
        const defaultFormBuilder: CustomSchemaType = {
            display: "form",
            components: [],
            id: "",
            name: "",
        };
        dispatch(setSchema(defaultFormBuilder));
        setLocalSchema(defaultFormBuilder);
        schemaRef.current = defaultFormBuilder;
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
                    dispatch(setSchema(loadedSchema));
                    setLocalSchema(loadedSchema);
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
            const newForm = {
                ...form.schema,
                id: form.id,
                name: form.name,
            };
            schemaRef.current = newForm;
            setLocalSchema(newForm);
            dispatch(setSchema(newForm));
            dispatch(setCurNameSchema(form.name));
            alert("Форма загружена!");
        } else {
            alert("Форма не найдена.");
        }
    };

    const handleEditLoadSchema = () => {
        dispatch(
            editForm({
                schema: localSchema,
                name: localSchema.name,
                id: localSchema.id,
            }),
        );
        alert("Форма перезаписана");
    };

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCurNameSchema(e.target.value));
        handleLoadSelectedForm(e.target.value);
    };
    const deleateFormLoadSchema = () => {
        if (schemaRef.current) {
            dispatch(deleteForm(schemaRef.current.id));
            alert(`Форма удалена`);
            resetFormSchema();
        } else {
            alert("Форма не выбрана");
        }
    };

    useEffect(() => {
        dispatch(getAllForms());
    }, []);

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
                                key="selectSaveForm"
                                aria-label="Выберите сохраненную форму"
                                value={nameSchema}
                                onChange={(e) => onChangeSelect(e)}
                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option key="default" value="">
                                    Выберите форму
                                </option>
                                {savedForms.map((form) => (
                                    <>
                                        <option
                                            key={form.name + form.id}
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
                            className="mt-2 h-10 bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
                            onClick={() => console.log(localSchema)}
                        >
                            test
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
                        <Button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
                            onClick={deleateFormLoadSchema}
                        >
                            Удалить выбранную форму
                        </Button>
                    </div>
                </form>
                <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 shadow-sm min-h-[700px] ">
                    <FormBuilder
                        initialForm={
                            schemaRef.current ? schemaRef.current : undefined
                        }
                        options={customOptions}
                        onChange={onFormChange}
                    />
                </div>
            </div>
        </>
    );
}

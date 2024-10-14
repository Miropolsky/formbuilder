import { Components, FormBuilder, FormType } from "@formio/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import {
    CustomSchemaType,
    TypeCustomAlert,
    formOptions,
} from "../../utils/utils";
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
import CustomModal from "../HelpersForm/CustomModal";
import { CustomAlert } from "../HelpersForm/CustomAlert";
import { ImageComponent } from "./ImageComponent";
import { CustomWidget } from "./CustomWidget";

Components.addComponent("customwidget", CustomWidget);
Components.addComponent("customimage", ImageComponent);

export default function BuildForm() {
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState<TypeCustomAlert>("error");
    const [isDelModal, setIsDelModal] = useState(false);
    const language = useStoreSelector((state) => state.builder.language);
    const nameSchema = useStoreSelector((state) => state.builder.curNameSchema);
    const globalSchema = useStoreSelector(
        (state) => state.builder.schema,
    ) as CustomSchemaType;
    const savedForms = useStoreSelector((state) => state.builder.loadSchems);
    const schemaRef = useRef(globalSchema);
    const dispatch = useStoreDispatch();

    const onFormChange = useCallback((newSchema: FormType) => {
        if (typeof newSchema === "object" && newSchema !== null) {
            // schemaRef.current = {
            //     ...newSchema,
            //     id: globalSchema ? globalSchema.id : "",
            //     name: globalSchema ? globalSchema.name : nameSchema,
            // };
            // console.log(newSchema);
            dispatch(
                setSchema({
                    ...newSchema,
                    id: globalSchema ? globalSchema.id : "",
                    name: globalSchema ? globalSchema.name : nameSchema,
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
        if (globalSchema.components.length === 0) {
            setTypeAlert("error");
            setTextAlert("Невозможно сохранить пустую форму");
            return;
        }
        let nameForm = prompt("Введите название формы", nameSchema);
        if (
            savedForms.find((el) => el.name === nameForm) !== undefined &&
            nameForm
        ) {
            handleEditLoadSchema();
        } else if (nameForm && nameForm.trim()) {
            dispatch(addForm({ ...globalSchema, name: nameForm }));
            dispatch(setCurNameSchema(""));
            setTypeAlert("success");
            setTextAlert("Форма добавлена в список сохраненных!");
        } else {
            setTypeAlert("error");
            setTextAlert("Некорректное имя формы");
        }
    };
    useEffect(() => {
        schemaRef.current = globalSchema;
    }, [nameSchema]);

    const downloadFormSchema = () => {
        if (globalSchema.components.length === 0) {
            setTypeAlert("error");
            setTextAlert("Невозможно сохранить пустую форму");
            return;
        }
        let nameForm = prompt("Введите название формы");
        if (nameForm && nameForm.trim()) {
            const blob = new Blob([JSON.stringify(globalSchema, null, 2)], {
                type: "application/json",
            });
            saveAs(blob, nameForm);
            setTypeAlert("success");
            setTextAlert("Форма сохранена!");
        } else {
            setTypeAlert("error");
            setTextAlert("Некорректное имя формы");
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
                    console.log();
                    schemaRef.current = loadedSchema;
                    dispatch(setSchema(loadedSchema));
                    dispatch(setCurNameSchema(file.name.slice(0, -5)));
                    setTypeAlert("success");
                    setTextAlert("Форма загружена!");
                } catch (error) {
                    setTypeAlert("error");
                    setTextAlert("Ошибка при загрузке формы");
                }
            } else {
                setTypeAlert("error");
                setTextAlert("Ошибка! Некорректные данные");
            }
        };
        reader.readAsText(file);
    };

    const handleLoadSelectedForm = (name: string) => {
        const form = savedForms.find((form) => form.name === name);
        if (form) {
            schemaRef.current = form;
            dispatch(setSchema(form));
            dispatch(setCurNameSchema(form.name));
            setTypeAlert("success");
            setTextAlert("Форма загружена!");
        } else {
            setTypeAlert("error");
            setTextAlert("Форма не найдена.");
        }
    };

    const handleEditLoadSchema = () => {
        dispatch(
            editForm({
                ...schemaRef.current,
                components: [...globalSchema.components],
            }),
        );
        setTypeAlert("success");
        setTextAlert("Форма перезаписана");
    };

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCurNameSchema(e.target.value));
        handleLoadSelectedForm(e.target.value);
    };
    const deleateFormLoadSchema = () => {
        if (schemaRef.current) {
            dispatch(deleteForm(schemaRef.current.id));
            setTypeAlert("info");
            setTextAlert(`Форма удалена`);
            resetFormSchema();
        } else {
            setTypeAlert("error");
            setTextAlert("Форма не выбрана");
        }
        setIsDelModal(false);
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
                                    <option key={form.id} value={form.name}>
                                        {form.name}
                                    </option>
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
                        <Button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
                            onClick={() => setIsDelModal(true)}
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
            {isDelModal && (
                <CustomModal
                    message={`Вы точно хотите удалить форму ${nameSchema}?`}
                    onCancel={() => setIsDelModal(false)}
                    onConfirm={() => deleateFormLoadSchema()}
                />
            )}

            <CustomAlert
                onClose={() => setTextAlert("")}
                isVisible={textAlert !== ""}
                message={textAlert}
                type={typeAlert}
            />
        </>
    );
}

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
        if (!nameForm) {
            alert("Введите имя формы");
            return;
        }
        if (nameForm.trim()) {
            const newForm = { name: nameForm, schema: localSchema };
            dispatch(addLoadSchema(newForm));
            dispatch(setCurNameSchema(""));
            setNameForm("");
            alert("Форма добавлена в список сохраненных!");
        } else {
            alert("Введите имя формы перед сохранением.");
        }
    };
    useEffect(() => {
        schemaRef.current = globalSchema;
        setNameForm(nameSchema);
    }, [nameSchema]);
    const downloadFormSchema = () => {
        const blob = new Blob([JSON.stringify(localSchema, null, 2)], {
            type: "application/json",
        });
        saveAs(blob, nameForm ? nameForm : "FormJson");
        alert("Форма сохранена!");
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

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-lg mt-8 space-y-8">
                <form className="flex flex-col ">
                    <div className="flex gap-x-4 items-end">
                        <div className="flex flex-col items-start">
                            <label className="text-lg font-semibold text-gray-700">
                                Имя формы
                            </label>
                            <Form.Control
                                className="w-[400px] mt-2 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                value={nameForm}
                                onChange={(e) => setNameForm(e.target.value)}
                            />
                        </div>
                        <Button
                            className="mt-2 h-10 bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
                            onClick={handleSaveForm}
                        >
                            Сохранить форму
                        </Button>

                        <Button
                            className="h-10 bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
                            onClick={downloadFormSchema}
                        >
                            Скачать форму
                        </Button>
                        <Button
                            className="h-10 bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
                            onClick={resetFormSchema}
                        >
                            Очистить поле
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

import { Form as FormBootStrap } from "react-bootstrap";
import { Form, FormType } from "@formio/react";
import { CustomSchemaType, IloadSchema } from "../utils/utils";
import { useEffect, useRef, useState } from "react";
import { useStoreDispatch, useStoreSelector } from "../redux/store";
import { getAllForms } from "../redux/builder";
import { Webform } from "@formio/js";

export default function ShowForm() {
    const [loadSchema, setLoadSchema] = useState<null | CustomSchemaType>(null);
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
            setLoadSchema({ ...form.schema, id: form.id, name });
            alert("Форма загружена!");
        } else {
            alert("Форма не найдена.");
        }
    };

    const formInstance = useRef<null | Webform>(null);

    const handleFormReady = (instance: Webform) => {
        formInstance.current = instance;
    };

    const handleClick = () => {
        if (!formInstance.current) {
            console.log("Our form isn't quite ready yet.");
            return;
        }
        console.log(formInstance.current);
        // formInstance.current.getComponent("firstName")?.setValue("John");
        // formInstance.current.getComponent("lastName")?.setValue("Smith");
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
                <FormBootStrap.Select
                    aria-label="Выберите сохраненную форму"
                    value={nameForm}
                    onChange={(e) => onChangeSelect(e)}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="base">Выберите форму</option>
                    {savedForms.map((form) => (
                        <>
                            <option key={form.name} value={form.name}>
                                {form.name}
                            </option>
                        </>
                    ))}
                </FormBootStrap.Select>
            </div>
            <div>
                {loadSchema && (
                    <Form src={loadSchema} onFormReady={handleFormReady} />
                )}
            </div>
        </div>
    );
}

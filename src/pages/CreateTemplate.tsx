import { FormBuilder, FormType } from "@formio/react";
import { useState } from "react";
import { FormTemplate } from "./TemplateManager";

const CreateTemplate = () => {
    const [schema, setSchema] = useState<FormType>({
        display: "form",
        components: [],
    });
    const [templateName, setTemplateName] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const handleSaveTemplate = () => {
        const newTemplate: FormTemplate = {
            id: Date.now().toString(),
            name: templateName,
            description,
            schema,
            createdAt: new Date(),
            updatedAt: new Date(),
            isPublic,
        };
        // Отправка шаблона на сервер или сохранение локально
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Название шаблона"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
            />
            <textarea
                placeholder="Описание шаблона"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <FormBuilder
                initialForm={schema}
                onChange={(newSchema) => setSchema(newSchema)}
            />
            <label>
                Публичный шаблон:
                <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={() => setIsPublic(!isPublic)}
                />
            </label>
            <button onClick={handleSaveTemplate}>Сохранить шаблон</button>
        </div>
    );
};

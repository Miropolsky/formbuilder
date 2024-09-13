import { useState } from "react";
import { FormTemplate } from "./TemplateManager";
import { FormBuilder } from "@formio/react";

const CreateFormFromTemplate = ({
    templates,
}: {
    templates: FormTemplate[];
}) => {
    const [selectedTemplate, setSelectedTemplate] =
        useState<FormTemplate | null>(null);

    const handleSelectTemplate = (templateId: string) => {
        const template = templates.find((t) => t.id === templateId);
        setSelectedTemplate(template || null);
    };

    return (
        <div>
            <h2>Создать форму на основе шаблона</h2>
            <select onChange={(e) => handleSelectTemplate(e.target.value)}>
                <option value="">Выберите шаблон</option>
                {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                        {template.name}
                    </option>
                ))}
            </select>

            {selectedTemplate && (
                <div>
                    <h3>Выбранный шаблон: {selectedTemplate.name}</h3>
                    <FormBuilder
                        initialForm={selectedTemplate.schema}
                        // Возможность доработки шаблона
                    />
                </div>
            )}
        </div>
    );
};

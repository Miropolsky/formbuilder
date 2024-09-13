import { FormType } from "@formio/react";
import { useState, useEffect } from "react";
// import { FormTemplate } from "./types";
export type FormTemplate = {
    id: string;
    name: string;
    description: string;
    schema: FormType; // Структура самой формы
    createdAt: Date;
    updatedAt: Date;
    isPublic: boolean; // Возможность сделать шаблон публичным для всех
};

const TemplateManager = () => {
    const [templates, setTemplates] = useState<FormTemplate[]>([]);

    useEffect(() => {
        // Здесь логика получения шаблонов с сервера
        const fetchTemplates = async () => {
            const response = await fetch("/api/templates");
            const data = await response.json();
            setTemplates(data);
        };
        fetchTemplates();
    }, []);

    const handleDeleteTemplate = (id: string) => {
        // Логика удаления шаблона
    };

    return (
        <div>
            <h1>Управление шаблонами</h1>
            <button
                onClick={() => {
                    /* Логика для создания нового шаблона */
                }}
            >
                Создать новый шаблон
            </button>
            <ul>
                {templates.map((template) => (
                    <li key={template.id}>
                        <h3>{template.name}</h3>
                        <p>{template.description}</p>
                        <button
                            onClick={() => handleDeleteTemplate(template.id)}
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

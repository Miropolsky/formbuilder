import { FormType } from "@formio/react";
import { translations } from "./constans";
import { ImageComponent } from "../components/FormComponents/ImageComponent";
import { CustomWidget } from "../components/FormComponents/CustomWidget";

const languages = ["en", "ru"] as const;

export type LanguagesType = (typeof languages)[number];
export function isLanguage(language: string): language is LanguagesType {
    return languages.includes(language as LanguagesType);
}
export type TypeCustomAlert = "error" | "success" | "info";

// Определяем editForm для компонента
ImageComponent.editForm = () => {
    return {
        components: [
            {
                type: "textfield",
                input: true,
                key: "imageSrc",
                label: "Image URL",
                placeholder: "Enter image URL",
                weight: 0, // Порядок отображения
            },
            {
                type: "file",
                input: true,
                key: "fileImg",
                label: "Upload Image",
                weight: 10, // Порядок отображения
            },
            {
                type: "textfield",
                input: true,
                key: "width",
                label: "Image Width",
                placeholder: "Enter width (e.g., 100%, 300px)",
                weight: 20, // Порядок отображения
            },
            {
                type: "textfield",
                input: true,
                key: "height",
                label: "Image Height",
                placeholder: "Enter height (e.g., auto, 200px)",
                weight: 30,
            },
            {
                type: "select",
                input: true,
                key: "position",
                label: "Position Image",
                dataSrc: "values",
                data: {
                    values: [
                        { value: "Left", label: "Left" },
                        { value: "Center", label: "Center" },
                        { value: "Right", label: "Right" },
                    ],
                },
                defaultValue: "Left",
                weight: 40,
            },
            {
                type: "textfield",
                input: true,
                key: "alt",
                label: "Alt attribute",
                placeholder: "Custom Image",
                weight: 50,
            },
            {
                type: "textfield",
                input: true,
                key: "margin",
                label: "External indentation(margin)",
                placeholder: "0px 0px 0px 0px",
                weight: 60,
            },
            {
                type: "textfield",
                input: true,
                key: "padding",
                label: "Internal indentation(padding)",
                placeholder: "0px 0px 0px 0px",
                weight: 70,
            },
            {
                type: "textfield",
                input: true,
                key: "rounding",
                label: "Rounding",
                placeholder: "Enter rounding(10%, 12px)",
                weight: 80,
            },
        ],
    };
};

CustomWidget.edit

export function formOptions(lang: LanguagesType) {
    return {
        language: lang,
        noNewEdit: true,
        alwaysConfirmComponentRemoval: true,
        editForm: {
            button: [
                {
                    key: "display",
                    ignore: false,
                    components: [
                        {
                            key: "action",
                            type: "select",
                            label: "Action",
                            dataSrc: "values", // Указываем источник данных как массив значений
                            data: {
                                values: [
                                    { label: "URL", value: "url" }, // Добавляем "URL" как вариант
                                    { label: "Submit", value: "submit" },
                                    { label: "Reset", value: "reset" },
                                ],
                            },
                            defaultValue: { label: "URL", value: "url" }, // Устанавливаем "url" по умолчанию
                        },
                        {
                            key: "headers", // Поле для заголовков
                            type: "datagrid", // Тип поля — таблица (для заголовков)
                            defaultValue: [
                                {
                                    header: "Content-Type",
                                    value: "application/json",
                                },
                            ],
                        },
                    ],
                },
            ],
            textfield: [
                // { key: "api", ignore: true },
                // { key: "layout", ignore: true },
                {
                    key: "display",
                    ignore: false,
                    components: [
                        { key: "inputMask", ignore: true },
                        { key: "suffix", ignore: true },
                        {
                            type: "select",
                            key: "type",

                            label: lang === "ru" ? "Тип поля" : "Input Type",
                            dataSrc: "values",
                            data: {
                                values: [
                                    { value: "textfield", label: "TextField" },
                                    { value: "email", label: "Email" },
                                    {
                                        value: "password",
                                        label: "Password",
                                    },
                                    { value: "number", label: "Number" },
                                    {
                                        value: "url",
                                        label: "Url",
                                    },
                                    {
                                        value: "address",
                                        label: "Address",
                                    },
                                    {
                                        value: "time",
                                        label: "Time",
                                    },
                                    {
                                        value: "currency",
                                        label: "Currency",
                                    },
                                ],
                            },
                            input: true,
                            weight: 1,
                        },
                    ],
                },
            ],
            password: [
                // { key: "api", ignore: true },
                // { key: "layout", ignore: true },
                {
                    key: "display",
                    ignore: false,
                    components: [
                        { key: "inputMask", ignore: true },
                        { key: "suffix", ignore: true },
                        {
                            type: "select",
                            key: "type",

                            label: lang === "ru" ? "Тип поля" : "Input Type",
                            dataSrc: "values",
                            data: {
                                values: [
                                    { value: "textfield", label: "TextField" },
                                    { value: "email", label: "Email" },
                                    {
                                        value: "password",
                                        label: "Password",
                                    },
                                    { value: "number", label: "Number" },
                                    {
                                        value: "url",
                                        label: "Url",
                                    },
                                    {
                                        value: "address",
                                        label: "Address",
                                    },
                                    {
                                        value: "time",
                                        label: "Time",
                                    },
                                    {
                                        value: "currency",
                                        label: "Currency",
                                    },
                                ],
                            },
                            input: true,
                            weight: 1,
                        },
                    ],
                },
            ],
            number: [
                // { key: "api", ignore: true },
                // { key: "layout", ignore: true },
                {
                    key: "display",
                    ignore: false,
                    components: [
                        { key: "inputMask", ignore: true },
                        { key: "suffix", ignore: true },
                        {
                            type: "select",
                            key: "type",

                            label: lang === "ru" ? "Тип поля" : "Input Type",
                            dataSrc: "values",
                            data: {
                                values: [
                                    { value: "textfield", label: "TextField" },
                                    { value: "email", label: "Email" },
                                    {
                                        value: "password",
                                        label: "Password",
                                    },
                                    { value: "number", label: "Number" },
                                    {
                                        value: "url",
                                        label: "Url",
                                    },
                                    {
                                        value: "address",
                                        label: "Address",
                                    },
                                    {
                                        value: "time",
                                        label: "Time",
                                    },
                                    {
                                        value: "currency",
                                        label: "Currency",
                                    },
                                ],
                            },
                            input: true,
                            weight: 1,
                        },
                    ],
                },
            ],
            time: [
                // { key: "api", ignore: true },
                // { key: "layout", ignore: true },
                {
                    key: "display",
                    ignore: false,
                    components: [
                        { key: "inputMask", ignore: true },
                        { key: "suffix", ignore: true },
                        {
                            type: "select",
                            key: "type",

                            label: lang === "ru" ? "Тип поля" : "Input Type",
                            dataSrc: "values",
                            data: {
                                values: [
                                    { value: "textfield", label: "TextField" },
                                    { value: "email", label: "Email" },
                                    {
                                        value: "password",
                                        label: "Password",
                                    },
                                    { value: "number", label: "Number" },
                                    {
                                        value: "url",
                                        label: "Url",
                                    },
                                    {
                                        value: "address",
                                        label: "Address",
                                    },
                                    {
                                        value: "time",
                                        label: "Time",
                                    },
                                    {
                                        value: "currency",
                                        label: "Currency",
                                    },
                                ],
                            },
                            input: true,
                            weight: 1,
                        },
                    ],
                },
            ],
            address: [
                // { key: "api", ignore: true },
                // { key: "layout", ignore: true },
                {
                    key: "display",
                    ignore: false,
                    components: [
                        { key: "inputMask", ignore: true },
                        { key: "suffix", ignore: true },
                        {
                            type: "select",
                            key: "type",

                            label: lang === "ru" ? "Тип поля" : "Input Type",
                            dataSrc: "values",
                            data: {
                                values: [
                                    { value: "textfield", label: "TextField" },
                                    { value: "email", label: "Email" },
                                    {
                                        value: "password",
                                        label: "Password",
                                    },
                                    { value: "number", label: "Number" },
                                    {
                                        value: "url",
                                        label: "Url",
                                    },
                                    {
                                        value: "address",
                                        label: "Address",
                                    },
                                    {
                                        value: "time",
                                        label: "Time",
                                    },
                                    {
                                        value: "currency",
                                        label: "Currency",
                                    },
                                ],
                            },
                            input: true,
                            weight: 1,
                        },
                    ],
                },
            ],
            url: [
                // { key: "api", ignore: true },
                // { key: "layout", ignore: true },
                {
                    key: "display",
                    ignore: false,
                    components: [
                        { key: "inputMask", ignore: true },
                        { key: "suffix", ignore: true },
                        {
                            type: "select",
                            key: "type",

                            label: lang === "ru" ? "Тип поля" : "Input Type",
                            dataSrc: "values",
                            data: {
                                values: [
                                    { value: "textfield", label: "TextField" },
                                    { value: "email", label: "Email" },
                                    {
                                        value: "password",
                                        label: "Password",
                                    },
                                    { value: "number", label: "Number" },
                                    {
                                        value: "url",
                                        label: "Url",
                                    },
                                    {
                                        value: "address",
                                        label: "Address",
                                    },
                                    {
                                        value: "time",
                                        label: "Time",
                                    },
                                    {
                                        value: "currency",
                                        label: "Currency",
                                    },
                                ],
                            },
                            input: true,
                            weight: 1,
                        },
                    ],
                },
            ],
            email: [
                // { key: "api", ignore: true },
                // { key: "layout", ignore: true },
                {
                    key: "display",
                    ignore: false,
                    components: [
                        { key: "inputMask", ignore: true },
                        { key: "suffix", ignore: true },
                        {
                            type: "select",
                            key: "type",

                            label: lang === "ru" ? "Тип поля" : "Input Type",
                            dataSrc: "values",
                            data: {
                                values: [
                                    { value: "textfield", label: "TextField" },
                                    { value: "email", label: "Email" },
                                    {
                                        value: "password",
                                        label: "Password",
                                    },
                                    { value: "number", label: "Number" },
                                    {
                                        value: "url",
                                        label: "Url",
                                    },
                                    {
                                        value: "address",
                                        label: "Address",
                                    },
                                    {
                                        value: "time",
                                        label: "Time",
                                    },
                                    {
                                        value: "currency",
                                        label: "Currency",
                                    },
                                ],
                            },
                            input: true,
                            weight: 1,
                        },
                    ],
                },
            ],
            currency: [
                // { key: "api", ignore: true },
                // { key: "layout", ignore: true },
                {
                    key: "display",
                    ignore: false,
                    components: [
                        { key: "inputMask", ignore: true },
                        { key: "suffix", ignore: true },
                        {
                            type: "select",
                            key: "type",

                            label: lang === "ru" ? "Тип поля" : "Input Type",
                            dataSrc: "values",
                            data: {
                                values: [
                                    { value: "textfield", label: "TextField" },
                                    { value: "email", label: "Email" },
                                    {
                                        value: "password",
                                        label: "Password",
                                    },
                                    { value: "number", label: "Number" },
                                    {
                                        value: "url",
                                        label: "Url",
                                    },
                                    {
                                        value: "address",
                                        label: "Address",
                                    },
                                    {
                                        value: "time",
                                        label: "Time",
                                    },
                                    {
                                        value: "currency",
                                        label: "Currency",
                                    },
                                ],
                            },
                            input: true,
                            weight: 1,
                        },
                    ],
                },
            ],
        },
        noDefaultSubmitButton: true,
        builder: {
            basic: {
                default: true,
                title: translations[lang]["Basic Elements"] || "Basic Elements",
                components: {
                    textfield: {
                        title: translations[lang]["Text Field"] || "Text Field",
                        key: "textfield",
                        icon: "terminal",
                        schema: {
                            label:
                                translations[lang]["Text Field"] ||
                                "Text Field",
                            type: "textfield",
                            key: "textfield",
                            input: true,
                        },
                    },
                    customimage: ImageComponent.builderInfo,
                    select: {
                        title: translations[lang]["Select"] || "Select",
                        key: "select",
                        icon: "th-list",
                        schema: {
                            label: translations[lang]["Select"] || "Select",
                            type: "select",
                            key: "select",
                            input: true,
                        },
                    },

                    textArea: {
                        title: translations[lang]["Text Area"] || "Text Area",
                        icon: "terminal",
                        schema: {
                            label:
                                translations[lang]["Text Area"] || "Text Area",
                            type: "textarea",
                            key: "textarea",
                            input: true,
                        },
                    },
                    checkbox: {
                        title: translations[lang]["Checkbox"] || "Checkbox",
                        icon: "check-square",
                        schema: {
                            label: translations[lang]["Checkbox"] || "Checkbox",
                            type: "checkbox",
                            key: "checkbox",
                        },
                    },
                    // button: {
                    //     title: translations[lang]["Button"] || "Button",
                    //     icon: "stop",
                    //     schema: {
                    //         label: translations[lang]["Button"] || "Button",
                    //         type: "button",
                    //         key: "button",
                    //     },
                    // },
                    custombutton: {
                        title: translations[lang]["Button"] || "Button",
                        key: "button",
                        icon: "stop",
                        schema: {
                            label: translations[lang]["Submit"] || "Submit",
                            action: "url", // Действие по умолчанию — отправка на URL
                            url: "http://localhost:5000/saveData", // URL по умолчанию
                            type: "button",
                            key: "submit",
                            input: true,
                        },
                    },
                    password: false,
                    number: false,
                },
            },
            advanced: {
                title: lang === "ru" ? "Дополнительно" : "Advanced",
                default: false,
                components: {
                    email: false,
                    url: false,
                    time: false,
                    currency: false,
                    address: false,
                    signature: false,
                    phoneNumber: {
                        title:
                            translations[lang]["Phone Number"] ||
                            "Phone Number",
                        icon: "phone-square",
                        schema: {
                            label:
                                translations[lang]["Phone Number"] ||
                                "Phone Number",
                            type: "phoneNumber",
                            key: "phoneNumber",
                            input: true,
                        },
                    },
                    tags: {
                        title: translations[lang]["Tags"] || "Tags",
                        icon: "tags",
                        schema: {
                            label: translations[lang]["Tags"] || "Tags",
                            type: "tags",
                            key: "tags",
                            input: true,
                        },
                    },
                    datetime: {
                        title:
                            translations[lang]["Date / Time"] || "Date / Time",
                        icon: "calendar",
                        schema: {
                            label:
                                translations[lang]["Date / Time"] ||
                                "Date / Time",
                            type: "datetime",
                            key: "datetime",
                            input: true,
                        },
                    },
                    day: {
                        title: translations[lang]["Day"] || "Day",
                        icon: "calendar",
                        schema: {
                            label: translations[lang]["Day"] || "Day",
                            type: "day",
                            key: "day",
                            input: true,
                        },
                    },
                    survey: {
                        title: translations[lang]["Survey"] || "Survey",
                        icon: "list",
                        schema: {
                            label: translations[lang]["Survey"] || "Survey",
                            type: "survey",
                            key: "survey",
                        },
                    },
                },
            },
            premium: false,
            layout: {
                title: "Расположение",
                default: false,
                components: {
                    htmlelement: {
                        title: lang === "ru" ? "HTML Элемент" : "HTML Element",
                        icon: "code",
                        schema: {
                            label:
                                lang === "ru" ? "HTML Элемент" : "HTML Element",
                            type: "htmlelement",
                            key: "html",
                        },
                    },
                    content: {
                        title: lang === "ru" ? "Контент" : "Content",
                        icon: "file-richtext",
                        schema: {
                            label: lang === "ru" ? "Контент" : "Content",
                            type: "content",
                            key: "content",
                        },
                    },
                    columns: {
                        title: lang === "ru" ? "Колонки" : "Columns",
                        icon: "layout-three-columns ",
                        schema: {
                            label: lang === "ru" ? "Колонки" : "Columns",
                            type: "columns",
                            key: "columns",
                        },
                    },
                    fieldset: {
                        title: lang === "ru" ? "Набор полей" : "Field Set",
                        icon: "grid-fill",
                        schema: {
                            label: lang === "ru" ? "Набор полей" : "Field Set",
                            type: "fieldset",
                            key: "fieldset",
                        },
                    },
                    panel: {
                        title: lang === "ru" ? "Панель" : "Panel",
                        icon: "window",
                        schema: {
                            label: lang === "ru" ? "Панель" : "Panel",
                            type: "panel",
                            key: "panel",
                        },
                    },
                    table: {
                        title: lang === "ru" ? "Таблица" : "Table",
                        icon: "table",
                        schema: {
                            label: lang === "ru" ? "Таблица" : "Table",
                            type: "table",
                            key: "table",
                        },
                    },
                    tabs: {
                        title: lang === "ru" ? "Вкладки" : "Tabs",
                        icon: "folder",
                        schema: {
                            label: lang === "ru" ? "Вкладки" : "Tabs",
                            type: "tabs",
                            key: "tabs",
                        },
                    },
                    well: {
                        title: lang === "ru" ? "Карточка" : "Well",
                        icon: "square",
                        schema: {
                            label: lang === "ru" ? "Карточка" : "Well",
                            type: "well",
                            key: "well",
                        },
                    },
                },
            },
            data: {
                title: "Расположение",
                default: false,
                components: {
                    hidden: {
                        title: lang === "ru" ? "Hidden" : "Скрытие",
                        icon: "code",
                        schema: {
                            label: lang === "ru" ? "Hidden" : "Скрытие",
                            type: "hidden",
                            key: "hidden",
                        },
                    },
                    container: {
                        title: lang === "ru" ? "Контейнер" : "Container",
                        icon: "folder-open",
                        schema: {
                            label: lang === "ru" ? "Контейнер" : "Container",
                            type: "container",
                            key: "container",
                        },
                    },
                    datamap: {
                        title: lang === "ru" ? "Карта данных" : "Data Map",
                        icon: "menu-button-wide",
                        schema: {
                            label: lang === "ru" ? "Карта данных" : "Data Map",
                            type: "datamap",
                            key: "datamap",
                        },
                    },
                    datagrid: {
                        title: lang === "ru" ? "Таблица данных" : "Data Grid",
                        icon: "grid-3x3-gap-fill",
                        schema: {
                            label:
                                lang === "ru" ? "Таблица данных" : "Data Grid",
                            type: "datagrid",
                            key: "datagrid",
                        },
                    },
                    editgrid: {
                        title:
                            lang === "ru"
                                ? "Редактирование данных"
                                : "Edit Grid",
                        icon: "view-stacked",
                        schema: {
                            label:
                                lang === "ru"
                                    ? "Редактирование данных"
                                    : "Edit Grid",
                            type: "editgrid",
                            key: "editgrid",
                        },
                    },
                },
            },
        },
    };
}
export type FormOptionsType = ReturnType<typeof formOptions>;
// export interface IloadSchema {
//     id: string;
//     name: string;
//     schema: FormType;
// }

export interface CustomSchemaType extends FormType {
    id: string;
    name: string;
}

export interface LoadValues {
    id: string;
    name: string;
    data: Record<string, any>;
    metadata?: Record<string, any>;
}

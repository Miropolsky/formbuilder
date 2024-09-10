import { FormType } from "@formio/react";
import { translations } from "./constans";

const languages = ["en", "ru"] as const;

export type LanguagesType = (typeof languages)[number];
export function isLanguage(language: string): language is LanguagesType {
    return languages.includes(language as LanguagesType);
}

export function formOptions(lang: LanguagesType) {
    return {
        language: lang,
        noNewEdit: true,
        editForm: {
            textfield: [
                { key: "api", ignore: true },
                { key: "layout", ignore: true },
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
                                    { value: "text", label: "Text" },
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
                                    { value: "text", label: "Text" },
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
                                    { value: "text", label: "Text" },
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
                                    { value: "text", label: "Text" },
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
                                    { value: "text", label: "Text" },
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
                                    { value: "text", label: "Text" },
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
                                ],
                            },
                            input: true,
                            weight: 1,
                        },
                    ],
                },
            ],
        },

        builder: {
            basic: {
                title: translations[lang]["Basic Elements"] || "Basic Elements",
                default: false,
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

                    textarea: {
                        title: translations[lang]["Text Area"] || "Text Area",
                        icon: "terminal",
                        schema: {
                            label:
                                translations[lang]["Text Area"] || "Text Area",
                            type: "textArea",
                            key: "textArea",
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
                    button: {
                        title: translations[lang]["Button"] || "Button",
                        icon: "stop",
                        schema: {
                            label: translations[lang]["Button"] || "Button",
                            type: "button",
                            key: "button",
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
                },
            },
            premium: false,
            layout: {
                title: "Расположение",
                default: false,
                components: {
                    // htmlelement: {
                    //     title: lang === "ru" ? "HTML Элемент" : "HTML Element",
                    //     icon: "code",
                    //     schema: {
                    //         label:
                    //             lang === "ru" ? "HTML Элемент" : "HTML Element",
                    //         type: "htmlelement",
                    //         key: "html",
                    //     },
                    // },
                    // content: {
                    //     title: lang === "ru" ? "Контент" : "Content",
                    //     icon: "file-richtext",
                    //     schema: {
                    //         label: lang === "ru" ? "Контент" : "Content",
                    //         type: "content",
                    //         key: "content",
                    //     },
                    // },
                    // columns: {
                    //     title: lang === "ru" ? "Колонки" : "Columns",
                    //     icon: "layout-three-columns ",
                    //     schema: {
                    //         label: lang === "ru" ? "Колонки" : "Columns",
                    //         type: "columns",
                    //         key: "columns",
                    //     },
                    // },
                    // fieldset: {
                    //     title: lang === "ru" ? "Набор полей" : "Field Set",
                    //     icon: "grid-fill",
                    //     schema: {
                    //         label: lang === "ru" ? "Набор полей" : "Field Set",
                    //         type: "fieldset",
                    //         key: "fieldset",
                    //     },
                    // },
                    // panel: {
                    //     title: lang === "ru" ? "Панель" : "Panel",
                    //     icon: "window",
                    //     schema: {
                    //         label: lang === "ru" ? "Панель" : "Panel",
                    //         type: "panel",
                    //         key: "panel",
                    //     },
                    // },
                    // table: {
                    //     title: lang === "ru" ? "Таблица" : "Table",
                    //     icon: "table",
                    //     schema: {
                    //         label: lang === "ru" ? "Таблица" : "Table",
                    //         type: "table",
                    //         key: "table",
                    //     },
                    // },
                    // tabs: {
                    //     title: lang === "ru" ? "Вкладки" : "Tabs",
                    //     icon: "foler",
                    //     schema: {
                    //         label: lang === "ru" ? "Вкладки" : "Tabs",
                    //         type: "tabs",
                    //         key: "tabs",
                    //     },
                    // },
                    // well: {
                    //     title: lang === "ru" ? "Карточка" : "Well",
                    //     icon: "square",
                    //     schema: {
                    //         label: lang === "ru" ? "Карточка" : "Well",
                    //         type: "well",
                    //         key: "well",
                    //     },
                    // },
                },
            },
        },
    };
}
export type FormOptionsType = ReturnType<typeof formOptions>;
export interface IloadSchema {
    name: string;
    schema: FormType;
}

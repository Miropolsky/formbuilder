import React from "react";
import { createRoot } from "react-dom/client"; // Импортируем createRoot
import { Components } from "@formio/react";
import Ventilator from "../../assets/Widjet/Ventilator";

// Описание типов для пропсов
interface CustomWidgetProps {
    customProp?: string;
}

// Описание схемы для нашего компонента
interface CustomWidgetSchema {
    label: string;
    type: string;
    key: string;
    input: boolean;
    selectedComponent: string;
    props: CustomWidgetProps;
}

export class CustomWidget extends Components.components.textfield {
    static schema(...extend: Partial<CustomWidgetSchema>[]) {
        return Components.components.textfield.schema({
            label: "Custom Widget",
            type: "customwidget",
            key: "customWidget",
            input: true,
            selectedComponent: "Ventilator", // Компонент по умолчанию
            props: {}, // Пропсы для выбранного компонента
            ...extend,
        });
    }

    static get builderInfo() {
        return {
            title: "Custom Widget",
            group: "basic",
            icon: "cog",
            weight: 60,
            schema: CustomWidget.schema(),
        };
    }

    renderElement(value: any): string {
        const containerId = `ventilator-container-${this.component.key}`;
        return `
        <div class="custom-widget">
            <div id="${containerId}"></div>
        </div>
        `;
    }

    attach(element: HTMLElement) {
        super.attach(element);
        this.renderVentilator(element); // Вызываем метод для отрисовки компонента
    }

    renderVentilator(element: HTMLElement) {
        const containerId = `ventilator-container-${this.component.key}`; // Уникальный ID для контейнера
        const container = element.querySelector(`#${containerId}`);

        if (container) {
            const root = createRoot(container); // Создаем корень для рендеринга
            root.render(<Ventilator isActive={true} />); // Отрисовка компонента Ventilator
        }
    }

    static editForm() {
        return {
            components: [
                {
                    type: "select",
                    input: true,
                    label: "Выберите компонент",
                    key: "selectedComponent",
                    dataSrc: "values",
                    data: {
                        values: [
                            { label: "Ventilator", value: "Ventilator" },
                            // Добавьте другие компоненты здесь
                        ],
                    },
                    defaultValue: "Ventilator",
                    weight: 0,
                },
                {
                    type: "textfield",
                    input: true,
                    key: "customProp",
                    label: "Пользовательское свойство",
                    placeholder: "Введите значение пользовательского свойства",
                    weight: 10,
                },
            ],
        };
    }
}

// Регистрируем кастомный виджет
Components.addComponent("customwidget", CustomWidget);

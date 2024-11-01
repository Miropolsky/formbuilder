import { createRoot } from "react-dom/client"; // Импортируем createRoot
import { Components } from "@formio/react";
import Ventilator from "../../assets/Widjet/Ventilator";
import WaterFlow from "../../assets/Widjet/WaterFlow";
import WaterTank from "../../assets/Widjet/WaterTank";
import { positionToFlex } from "../../utils/utils";

// Описание схемы для нашего компонента
interface CustomWidgetSchema {
    label: string;
    type: string;
    key: string;
    input: boolean;
    selectedComponent: string;
    props: CustomWidgetProps;
}

// Описание типов для пропсов
interface CustomWidgetProps {
    customProp?: string;
    waterLevel?: number; // Проп для WaterTank
    isActive?: boolean; // Проп для WaterFlow и Ventilator
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
            label: "",
            type: "customwidget",
            key: "customWidget",
            input: true,
            selectedComponent: "Ventilator", // Компонент по умолчанию
            props: {
                isActive: false, // Дефолтные значения
                waterLevel: 50, // Дефолтные значения
                selectedComponent: "Ventilator",
            },
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

    renderElement(): string {
        // const { isActive, waterLevel } = this.component;
        const {
            width = "100%",
            height = "auto",
            position = "Left",
            padding = "0px 0px 0px 0px",
            margin = "0px 0px 0px 0px",
        } = this.component;
        const containerId = `widget-container-${this.component.key}`;

        return `
        <div class="custom-widget" style="display: flex; ${positionToFlex(position)}; margin: ${margin}; padding: ${padding}">
            <div id="${containerId}" style="max-width: ${width}; height: ${height}"></div>
        </div>
        `;
    }

    attach(element: HTMLElement) {
        super.attach(element);
        this.renderComponent(element); // Вызываем метод для отрисовки компонента
        // this.redraw();
    }

    renderComponent(element: HTMLElement) {
        const containerId = `widget-container-${this.component.key}`;
        const container = element.querySelector(`#${containerId}`);

        if (container) {
            const root = createRoot(container); // Создаем корень для рендеринга
            const { selectedComponent, isActive, waterLevel } = this.component;
            this.component.props = {
                ...this.component.props,
                isActive,
                waterLevel,
            };

            const customProps = { isActive, waterLevel };

            // Определяем, какой компонент рендерить
            let ComponentToRender;
            switch (selectedComponent) {
                case "WaterFlow":
                    ComponentToRender = WaterFlow;
                    break;
                case "WaterTank":
                    ComponentToRender = WaterTank;
                    break;
                case "Ventilator":
                default:
                    ComponentToRender = Ventilator;
                    break;
            }

            root.render(<ComponentToRender {...customProps} />); // Отрисовка с пропсами
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
                            { label: "WaterFlow", value: "WaterFlow" },
                            { label: "WaterTank", value: "WaterTank" },
                        ],
                    },
                    defaultValue: "Ventilator",
                    weight: 0,
                },
                {
                    type: "checkbox",
                    input: true,
                    key: "isActive",
                    label: "Активировать анимацию",
                    weight: 20,
                    conditional: {
                        json: {
                            or: [
                                {
                                    "===": [
                                        { var: "data.selectedComponent" },
                                        "Ventilator",
                                    ],
                                },
                                {
                                    "===": [
                                        { var: "data.selectedComponent" },
                                        "WaterFlow",
                                    ],
                                },
                            ],
                        },
                    },
                },
                {
                    type: "number",
                    input: true,
                    key: "waterLevel",
                    label: "Уровень воды (для WaterTank)",
                    placeholder: "Введите уровень воды от 0 до 100",
                    weight: 30,
                    conditional: {
                        json: {
                            "===": [
                                { var: "data.selectedComponent" },
                                "WaterTank",
                            ],
                        },
                    },
                },
                {
                    type: "textfield",
                    input: true,
                    key: "width",
                    label: "Width",
                    placeholder: "Enter width (e.g., 100%, 300px)",
                    weight: 40,
                },
                {
                    type: "textfield",
                    input: true,
                    key: "height",
                    label: "Height",
                    placeholder: "Enter height (e.g., auto, 200px)",
                    weight: 50,
                },
                {
                    type: "select",
                    input: true,
                    key: "position",
                    label: "Position",
                    dataSrc: "values",
                    data: {
                        values: [
                            { value: "Left", label: "Left" },
                            { value: "Center", label: "Center" },
                            { value: "Right", label: "Right" },
                        ],
                    },
                    defaultValue: "Left",
                    weight: 60,
                },
                {
                    type: "textfield",
                    input: true,
                    key: "margin",
                    label: "External indentation(margin)",
                    placeholder: "0px 0px 0px 0px",
                    weight: 70,
                },
                {
                    type: "textfield",
                    input: true,
                    key: "padding",
                    label: "Internal indentation(padding)",
                    placeholder: "0px 0px 0px 0px",
                    weight: 80,
                },
            ],
        };
    }
}

// Регистрируем кастомный виджет
Components.addComponent("customwidget", CustomWidget);

import { createRoot } from "react-dom/client"; // Импортируем createRoot
import { Components } from "@formio/react";
import { positionToFlex } from "../../utils/utils";
import { CustomBar } from "../../assets/Charts/CustomBar";
import { CustomBarStacked } from "../../assets/Charts/CustomBarStacked";
import { CustomDoughunt } from "../../assets/Charts/CustomDoughunt";
import CustomLine from "../../assets/Charts/CustomLine";
import { CustomLineAxis } from "../../assets/Charts/CustomLineAxis";
import { CustomLineArea } from "../../assets/Charts/CustomLineArea";

// Описание схемы для нашего компонента
interface CustomWidgetSchema {
    label: string;
    type: string;
    key: string;
    input: boolean;
    selectedComponent: string;
    props: CustomChartProps;
}

// Описание типов для пропсов
interface CustomChartProps {
    customProp?: string;
    chartData?: number[]; // Данные для графика
    labelsX?: number[]; // Метки оси X
}

export class CustomChart extends Components.components.textfield {
    static schema(...extend: Partial<CustomWidgetSchema>[]) {
        return Components.components.textfield.schema({
            label: "",
            type: "customchart",
            key: "customChart",
            input: true,
            selectedComponent: "CustomLine", // Компонент по умолчанию
            props: {
                selectedComponent: "CustomLine",
                chartData: [10, 20, 30, 25, 15], // Данные по умолчанию
                labelsX: [0, 1, 2, 3, 4], // Метки оси X по умолчанию
            },
            ...extend,
        });
    }

    static get builderInfo() {
        return {
            title: "Custom Chart",
            group: "basic",
            icon: "cog",
            weight: 60,
            schema: CustomChart.schema(),
        };
    }

    renderElement(): string {
        const {
            width = "100%",
            height = "auto",
            position = "Left",
            padding = "0px 0px 0px 0px",
            margin = "0px 0px 0px 0px",
        } = this.component;
        const containerId = `chart-container-${this.component.key}`;

        return `
        <div class="custom-chart" style="display: flex; ${positionToFlex(position)}; margin: ${margin}; padding: ${padding}">
            <div id="${containerId}" style="max-width: ${width}; height: ${height}"></div>
        </div>
        `;
    }

    attach(element: HTMLElement) {
        super.attach(element);
        this.renderComponent(element); // Вызываем метод для отрисовки компонента
    }

    renderComponent(element: HTMLElement) {
        const containerId = `chart-container-${this.component.key}`;
        const container = element.querySelector(`#${containerId}`);

        if (container) {
            const root = createRoot(container); // Создаем корень для рендеринга
            // const { selectedComponent, props } = this.component;
            this.component.props = {
                ...this.component.props,
            };
            const {
                props,
                selectedComponent,
                labelsX,
                titleOsX,
                titleOsY,
                titleChart,
                legendPosition,
                showTitle,
                isXTitleDisplay,
                isYTitleDisplay,
                isYBeginAtZero,
            } = this.component;
            this.component.props = {
                ...this.component.props,
                selectedComponent,
                labelsX,
                titleOsX,
                titleOsY,
                titleChart,
                legendPosition,
                showTitle,
                isXTitleDisplay,
                isYTitleDisplay,
                isYBeginAtZero,
            };
            const customProps = {
                selectedComponent,
                labelsX,
                titleOsX,
                titleOsY,
                titleChart,
                legendPosition,
                showTitle,
                isXTitleDisplay,
                isYTitleDisplay,
                isYBeginAtZero,
            };
            // Логируем, чтобы убедиться, что пропсы передаются корректно
            console.log("Selected component:", selectedComponent);
            console.log("Props to pass:", props);
            console.log("props", customProps);
            // Определяем, какой компонент рендерить
            let ComponentToRender;
            switch (selectedComponent) {
                case "CustomBar":
                    ComponentToRender = CustomBar;
                    break;
                case "CustomBarStacked":
                    ComponentToRender = CustomBarStacked;
                    break;
                case "CustomDoughunt":
                    ComponentToRender = CustomDoughunt;
                    break;
                case "CustomLineAxis":
                    ComponentToRender = CustomLineAxis;
                    break;
                case "CustomLineArea":
                    ComponentToRender = CustomLineArea;
                    break;
                case "CustomLine":
                default:
                    ComponentToRender = CustomLine;
                    break;
            }

            root.render(<ComponentToRender {...props} />); // Отрисовка с пропсами
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
                            { label: "CustomBar", value: "CustomBar" },
                            {
                                label: "CustomBarStacked",
                                value: "CustomBarStacked",
                            },
                            {
                                label: "CustomDoughunt",
                                value: "CustomDoughunt",
                            },
                            {
                                label: "CustomLineAxis",
                                value: "CustomLineAxis",
                            },
                            {
                                label: "CustomLineArea",
                                value: "CustomLineArea",
                            },
                            { label: "CustomLine", value: "CustomLine" },
                        ],
                    },
                    defaultValue: "CustomLine",
                    weight: 0,
                    onChange: (event: any) => {
                        const selectedComponent = event.target.value;
                        this.component.selectedComponent = selectedComponent;
                        this.renderComponent(this.element);
                    },
                },
                {
                    type: "textfield",
                    input: true,
                    key: "width",
                    label: "Width",
                    placeholder: "Enter width (e.g., 100%, 300px)",
                    weight: 40, // Порядок отображения
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
                {
                    type: "textarea",
                    input: true,
                    key: "chartData",
                    label: "Chart Data",
                    placeholder:
                        "Enter chart data as JSON (e.g., [10, 20, 30])",
                    weight: 90,
                    defaultValue: "[10, 20, 30, 25, 15]",
                    onChange: (event: any) => {
                        const chartData = JSON.parse(event.target.value);
                        this.component.chartData = chartData;
                        this.renderComponent(this.element);
                    },
                },
                {
                    type: "textarea",
                    input: true,
                    key: "labelsX",
                    label: "Labels for X Axis",
                    placeholder: "Enter labels as JSON (e.g., [0, 1, 2, 3])",
                    weight: 100,
                    defaultValue: "[0, 1, 2, 3, 4]",
                    validate: {
                        required: true,
                    },
                    onChange: (event: any) => {
                        const labelsX = JSON.parse(event.target.value);
                        this.component.labelsX = labelsX;
                        this.renderComponent(this.element);
                    },
                },
                {
                    type: "textfield",
                    input: true,
                    key: "titleChart",
                    label: "Chart Title",
                    placeholder: "Enter chart title",
                    weight: 20,
                    onChange: (event: any) => {
                        this.component.titleChart = event.target.value;
                        this.renderComponent(this.element);
                    },
                },
                {
                    type: "textfield",
                    input: true,
                    key: "titleOsX",
                    label: "X Axis Title",
                    placeholder: "Enter X Axis title",
                    weight: 30,
                    onChange: (event: any) => {
                        this.component.titleOsX = event.target.value;
                        this.renderComponent(this.element);
                    },
                },
                {
                    type: "textfield",
                    input: true,
                    key: "titleOsY",
                    label: "Y Axis Title",
                    placeholder: "Enter Y Axis title",
                    weight: 40,
                    onChange: (event: any) => {
                        this.component.titleOsY = event.target.value;
                        this.renderComponent(this.element);
                    },
                },
                {
                    type: "select",
                    input: true,
                    key: "legendPosition",
                    label: "Legend Position",
                    dataSrc: "values",
                    data: {
                        values: [
                            { value: "top", label: "Top" },
                            { value: "bottom", label: "Bottom" },
                            { value: "left", label: "Left" },
                            { value: "right", label: "Right" },
                            { value: "chartArea", label: "Chart Area" },
                        ],
                    },
                    defaultValue: "bottom",
                    weight: 50,
                    onChange: (event: any) => {
                        this.component.legendPosition = event.target.value;
                        this.renderComponent(this.element);
                    },
                },
                {
                    type: "checkbox",
                    input: true,
                    key: "showTitle",
                    label: "Show Chart Title",
                    defaultValue: true,
                    weight: 60,
                    onChange: (event: any) => {
                        this.component.showTitle = event.target.checked;
                        this.renderComponent(this.element);
                    },
                },
                {
                    type: "checkbox",
                    input: true,
                    key: "xTitleDisplay",
                    label: "Display X Axis Title",
                    defaultValue: true,
                    weight: 70,
                    onChange: (event: any) => {
                        this.component.xTitleDisplay = event.target.checked;
                        this.renderComponent(this.element);
                    },
                },
                {
                    type: "checkbox",
                    input: true,
                    key: "yTitleDisplay",
                    label: "Display Y Axis Title",
                    defaultValue: true,
                    weight: 80,
                    onChange: (event: any) => {
                        this.component.yTitleDisplay = event.target.checked;
                        this.renderComponent(this.element);
                    },
                },
                {
                    type: "checkbox",
                    input: true,
                    key: "yBeginAtZero",
                    label: "Y Axis Begins at Zero",
                    defaultValue: true,
                    weight: 90,
                    onChange: (event: any) => {
                        this.component.yBeginAtZero = event.target.checked;
                        this.renderComponent(this.element);
                    },
                },
            ],
        };
    }
}

// Регистрируем кастомный виджет
Components.addComponent("customwidget", CustomChart);

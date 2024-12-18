import { createRoot } from "react-dom/client"; // Импортируем createRoot
import { Components } from "@formio/react";
import { positionToFlex, strToArray } from "../../utils/utils";
import CustomLine from "../../assets/Charts/CustomLine";
import CustomBar from "../../assets/Charts/CustomBar";
import CustomBarStacked from "../../assets/Charts/CustomBarStacked";
import CustomDoughnut from "../../assets/Charts/CustomDoughunt";
import CustomLineAxis from "../../assets/Charts/CustomLineAxis";
import CustomLineArea from "../../assets/Charts/CustomLineArea";

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

const convertDataInArray = (arr: any) => {
    return arr === undefined
        ? undefined
        : [
              ...arr.map((el: any) => ({
                  ...el,
                  data: strToArray(el.data),
              })),
          ];
};

export class CustomChart extends Components.components.textfield {
    static schema(...extend: Partial<CustomWidgetSchema>[]) {
        return Components.components.textfield.schema({
            label: "",
            type: "customchart",
            key: "customChart",
            input: true,
            selectedComponent: "CustomLine", // Компонент по умолчанию
            props: {
                isShowTitle: true,
                isXTitleDisplay: true,
                isYTitleDisplay: true,
                isYBeginAtZero: true,
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
        // this.renderElement();
        // this.redraw();
    }

    renderComponent(element: HTMLElement) {
        const containerId = `chart-container-${this.component.key}`;
        const container = element.querySelector(`#${containerId}`);

        if (container) {
            const root = createRoot(container); // Создаем корень для рендеринга
            // const { selectedComponent, props } = this.component;
            const {
                props,
                selectedComponent,
                labelsX,
                titleOsX,
                titleOsY,
                titleChart,
                legendPosition,
                isShowTitle,
                isXTitleDisplay,
                isYTitleDisplay,
                isYBeginAtZero,
                datasets,
                showPoints,
                pointRadius,
                pointBackgroundColor,
                showXGrid,
                showYGrid,
                gridColor,
                tension,
                animationDuration,
                animationEasing,
                showTooltips,
                tooltipBackgroundColor,
                tooltipMode,
                lineWidth,
                borderDash,
                axisColor,
                labelColor,
            } = this.component;

            this.component.props = {
                ...this.component.props,
                selectedComponent,
                labelsX: strToArray(labelsX),
                titleOsX,
                titleOsY,
                titleChart,
                legendPosition,
                isShowTitle,
                isXTitleDisplay,
                isYTitleDisplay,
                isYBeginAtZero,
                datasets: convertDataInArray(datasets) as number[],
                showPoints,
                pointRadius,
                pointBackgroundColor,
                showXGrid,
                showYGrid,
                gridColor,
                tension,
                animationDuration,
                animationEasing,
                showTooltips,
                tooltipBackgroundColor,
                tooltipMode,
                lineWidth,
                borderDash: strToArray(borderDash) as number[],
                axisColor,
                labelColor,
            };

            const customProps = {
                ...props,
                selectedComponent,
                labelsX: strToArray(labelsX),
                titleOsX,
                titleOsY,
                titleChart,
                legendPosition,
                isShowTitle,
                isXTitleDisplay,
                isYTitleDisplay,
                isYBeginAtZero,
                datasets: convertDataInArray(datasets) as number[],
                showPoints,
                pointRadius,
                pointBackgroundColor,
                showXGrid,
                showYGrid,
                gridColor,
                tension,
                animationDuration,
                animationEasing,
                showTooltips,
                tooltipBackgroundColor,
                tooltipMode,
                lineWidth,
                borderDash: strToArray(borderDash) as number[],
                axisColor,
                labelColor,
            };

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
                    ComponentToRender = CustomDoughnut;
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

            root.render(<ComponentToRender {...customProps} />); // Отрисовка с пропсами
            // this.redraw();
        }
    }

    /// Настройка полей в настройках
    static editForm() {
        return {
            components: [
                {
                    type: "tabs",
                    key: "chartSettings",
                    components: [
                        {
                            label: "Chart Settings",
                            key: "chartSettingsTab",
                            components: [
                                {
                                    type: "select",
                                    input: true,
                                    label: "Выберите компонент",
                                    key: "selectedComponent",
                                    dataSrc: "values",
                                    data: {
                                        values: [
                                            {
                                                label: "CustomLine",
                                                value: "CustomLine",
                                            },
                                            {
                                                label: "CustomBar",
                                                value: "CustomBar",
                                            },
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
                                        ],
                                    },
                                    defaultValue: "CustomLine",
                                    weight: 0,
                                },
                                {
                                    type: "checkbox",
                                    input: true,
                                    key: "isShowTitle",
                                    label: "Show Chart Title",
                                    defaultValue: true,
                                    weight: 20,
                                },
                                {
                                    type: "checkbox",
                                    input: true,
                                    key: "isXTitleDisplay",
                                    label: "Display X Axis Title",
                                    defaultValue: true,
                                    weight: 30,
                                },
                                {
                                    type: "checkbox",
                                    input: true,
                                    key: "isYTitleDisplay",
                                    label: "Display Y Axis Title",
                                    defaultValue: true,
                                    weight: 40,
                                },
                                {
                                    type: "checkbox",
                                    input: true,
                                    key: "isYBeginAtZero",
                                    label: "Y Axis Begins at Zero",
                                    defaultValue: true,
                                    weight: 50,
                                },
                                {
                                    type: "textfield",
                                    input: true,
                                    key: "labelsX",
                                    label: "Labels for X Axis",
                                    placeholder:
                                        "Enter labels as JSON (e.g., [0, 1, 2, 3])",
                                    weight: 100,
                                    defaultValue: "[0, 1, 2, 3, 4]",
                                    validate: {
                                        required: true,
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
                                            {
                                                value: "bottom",
                                                label: "Bottom",
                                            },
                                            { value: "left", label: "Left" },
                                            { value: "right", label: "Right" },
                                            {
                                                value: "chartArea",
                                                label: "Chart Area",
                                            },
                                        ],
                                    },
                                    defaultValue: "bottom",
                                    weight: 50,
                                },
                                {
                                    type: "textfield",
                                    input: true,
                                    key: "titleChart",
                                    label: "Chart Title",
                                    placeholder: "Enter chart title",
                                    weight: 20,
                                },
                                {
                                    type: "textfield",
                                    input: true,
                                    key: "titleOsX",
                                    label: "X Axis Title",
                                    placeholder: "Enter X Axis title",
                                    weight: 30,
                                },
                                {
                                    type: "textfield",
                                    input: true,
                                    key: "titleOsY",
                                    label: "Y Axis Title",
                                    placeholder: "Enter Y Axis title",
                                    weight: 40,
                                },
                                {
                                    type: "checkbox",
                                    input: true,
                                    key: "showPoints",
                                    label: "Show Points",
                                    defaultValue: true,
                                    weight: 20,
                                },
                                {
                                    type: "number",
                                    input: true,
                                    key: "pointRadius",
                                    label: "Point Radius",
                                    defaultValue: 3,
                                    weight: 30,
                                },
                                {
                                    type: "customColorSelect",
                                    input: true,
                                    key: "pointBackgroundColor",
                                    label: "Point Background Color",
                                    defaultValue: "white",
                                    weight: 40,
                                },
                                {
                                    type: "checkbox",
                                    input: true,
                                    key: "showXGrid",
                                    label: "Show X Grid",
                                    defaultValue: true,
                                    weight: 50,
                                },
                                {
                                    type: "checkbox",
                                    input: true,
                                    key: "showYGrid",
                                    label: "Show Y Grid",
                                    defaultValue: true,
                                    weight: 60,
                                },
                                {
                                    type: "customColorSelect",
                                    input: true,
                                    key: "gridColor",
                                    label: "Grid Color",
                                    weight: 70,
                                    defaultValue: "rgba(0, 0, 0, 0.1)",
                                },
                                {
                                    type: "number",
                                    input: true,
                                    key: "tension",
                                    label: "Tension",
                                    defaultValue: 0.4,
                                    weight: 80,
                                },
                                {
                                    type: "number",
                                    input: true,
                                    key: "animationDuration",
                                    label: "Animation Duration (ms)",
                                    defaultValue: 1000,
                                    weight: 90,
                                },
                                {
                                    type: "select",
                                    input: true,
                                    key: "animationEasing",
                                    label: "Animation Easing",
                                    dataSrc: "values",
                                    data: {
                                        values: [
                                            {
                                                value: "easeOutBounce",
                                                label: "Ease Out Bounce",
                                            },
                                            {
                                                value: "linear",
                                                label: "Linear",
                                            },
                                            {
                                                value: "easeInQuad",
                                                label: "Ease In Quad",
                                            },
                                        ],
                                    },
                                    defaultValue: "easeOutBounce",
                                    weight: 100,
                                },
                                {
                                    type: "checkbox",
                                    input: true,
                                    key: "showTooltips",
                                    label: "Show Tooltips",
                                    defaultValue: true,
                                    weight: 110,
                                },
                                {
                                    type: "customColorSelect",
                                    input: true,
                                    key: "tooltipBackgroundColor",
                                    label: "Tooltip Background Color",
                                    defaultValue: "rgba(0, 0, 0, 0.8)",
                                    weight: 120,
                                },
                                {
                                    type: "select",
                                    input: true,
                                    key: "tooltipMode",
                                    label: "Tooltip Mode",
                                    dataSrc: "values",
                                    data: {
                                        values: [
                                            {
                                                value: "nearest",
                                                label: "Nearest",
                                            },
                                            { value: "index", label: "Index" },
                                            {
                                                value: "dataset",
                                                label: "Dataset",
                                            },
                                        ],
                                    },
                                    defaultValue: "nearest",
                                    weight: 130,
                                },
                                {
                                    type: "number",
                                    input: true,
                                    key: "lineWidth",
                                    label: "Line Width",
                                    defaultValue: 2,
                                    weight: 140,
                                },
                                {
                                    type: "textfield",
                                    input: true,
                                    key: "borderDash",
                                    label: "Border Dash",
                                    placeholder: "[0, 0]",
                                    defaultValue: "[0, 0]",
                                    weight: 150,
                                },
                                {
                                    type: "customColorSelect",
                                    input: true,
                                    key: "axisColor",
                                    label: "Axis Color",
                                    defaultValue: "rgba(0, 0, 0, 0.5)",
                                    weight: 160,
                                },
                                {
                                    type: "customColorSelect",
                                    input: true,
                                    key: "labelColor",
                                    label: "Label Color",
                                    defaultValue: "rgba(0, 0, 0, 0.7)",
                                    weight: 170,
                                },
                            ],
                        },
                        {
                            label: "Datasets",
                            input: true,
                            key: "datasetes",
                            components: [
                                {
                                    type: "datagrid",
                                    input: true,
                                    key: "datasets",
                                    label: "Datasets",
                                    components: [
                                        {
                                            type: "textfield",
                                            key: "label",
                                            label: "Label",
                                            input: true,
                                            defaultValue: "label 1",
                                        },
                                        {
                                            type: "textfield",
                                            key: "data",
                                            label: "Data",
                                            placeholder: "[10, 20, 30]",
                                            defaultValue:
                                                "[10, 20, 30, 25, 15]",
                                            input: true,
                                        },
                                        {
                                            type: "customColorSelect",
                                            key: "borderColor",
                                            label: "Border Color",
                                            input: true,
                                        },
                                        {
                                            type: "customColorSelect",
                                            key: "backgroundColor",
                                            label: "Background Color",
                                            input: true,
                                        },
                                        {
                                            type: "checkbox",
                                            key: "fill",
                                            label: "isFill",
                                            input: true,
                                        },
                                    ],
                                    weight: 10,
                                },
                            ],
                            weight: 100,
                        },

                        {
                            label: "Layout Settings",
                            key: "layoutSettingsTab",
                            components: [
                                {
                                    type: "textfield",
                                    input: true,
                                    key: "width",
                                    label: "Width",
                                    placeholder:
                                        "Enter width (e.g., 100%, 300px)",
                                    weight: 40,
                                },
                                {
                                    type: "textfield",
                                    input: true,
                                    key: "height",
                                    label: "Height",
                                    placeholder:
                                        "Enter height (e.g., auto, 200px)",
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
                                            {
                                                value: "Center",
                                                label: "Center",
                                            },
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
                        },
                    ],
                },
            ],
        };
    }
}

// Регистрируем кастомный виджет
Components.addComponent("customwidget", CustomChart);

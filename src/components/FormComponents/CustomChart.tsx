import { createRoot } from "react-dom/client"; // Импортируем createRoot
import { Components } from "@formio/react";
import { positionToFlex, strToArray } from "../../utils/utils";
import { CustomBar } from "../../assets/Charts/CustomBar";
import { CustomBarStacked } from "../../assets/Charts/CustomBarStacked";
import { CustomDoughunt } from "../../assets/Charts/CustomDoughunt";
import CustomLine from "../../assets/Charts/CustomLine";
import { CustomLineAxis } from "../../assets/Charts/CustomLineAxis";
import { CustomLineArea } from "../../assets/Charts/CustomLineArea";
import CustomColorSelect from "../../assets/Widjet/CustomColorSelect";
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
                                    onChange: (event: any) => {
                                        const selectedComponent =
                                            event.target.value;
                                        this.component.selectedComponent =
                                            selectedComponent;
                                        this.renderComponent(this.element);
                                    },
                                },
                                {
                                    type: "checkbox",
                                    input: true,
                                    key: "isShowTitle",
                                    label: "Show Chart Title",
                                    defaultValue: true,
                                    weight: 20,
                                    onChange: (event: any) => {
                                        console.log(event.target.checked);
                                        this.component.showTitle =
                                            event.target.checked;
                                        this.renderComponent(this.element);
                                    },
                                },
                                {
                                    type: "checkbox",
                                    input: true,
                                    key: "isXTitleDisplay",
                                    label: "Display X Axis Title",
                                    defaultValue: true,
                                    weight: 30,
                                    onChange: (event: any) => {
                                        this.component.xTitleDisplay =
                                            event.target.checked;
                                        this.renderComponent(this.element);
                                    },
                                },
                                {
                                    type: "checkbox",
                                    input: true,
                                    key: "isYTitleDisplay",
                                    label: "Display Y Axis Title",
                                    defaultValue: true,
                                    weight: 40,
                                    onChange: (event: any) => {
                                        this.component.yTitleDisplay =
                                            event.target.checked;
                                        this.renderComponent(this.element);
                                    },
                                },
                                {
                                    type: "checkbox",
                                    input: true,
                                    key: "isYBeginAtZero",
                                    label: "Y Axis Begins at Zero",
                                    defaultValue: true,
                                    weight: 50,
                                    onChange: (event: any) => {
                                        this.component.yBeginAtZero =
                                            event.target.checked;
                                        this.renderComponent(this.element);
                                    },
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
                                    onChange: (event: any) => {
                                        const labelsX = JSON.parse(
                                            event.target.value,
                                        );
                                        this.component.labelsX = labelsX;
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
                                    onChange: (event: any) => {
                                        this.component.legendPosition =
                                            event.target.value;
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
                                        this.component.titleChart =
                                            event.target.value;
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
                                        this.component.titleOsX =
                                            event.target.value;
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
                                        this.component.titleOsY =
                                            event.target.value;
                                        this.renderComponent(this.element);
                                    },
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
                                    type: "textfield",
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
                                    type: "textfield",
                                    input: true,
                                    key: "gridColor",
                                    label: "Grid Color",
                                    defaultValue: "rgba(0, 0, 0, 0.1)",
                                    weight: 70,
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
                                    type: "textfield",
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
                                    type: "textfield",
                                    input: true,
                                    key: "axisColor",
                                    label: "Axis Color",
                                    defaultValue: "rgba(0, 0, 0, 0.5)",
                                    weight: 160,
                                },
                                {
                                    type: "textfield",
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
                                        },
                                        {
                                            type: "textfield",
                                            key: "data",
                                            label: "Data",
                                            placeholder: "[10, 20, 30]",
                                            input: true,
                                        },
                                        {
                                            type: "textfield",
                                            key: "borderColor",
                                            label: "Border Color",
                                            input: true,
                                        },
                                        // {
                                        //     type: "textfield",
                                        //     key: "backgroundColor",
                                        //     label: "Background Color",
                                        //     input: true,
                                        // },
                                        {
                                            type: "custom", // Указываем тип кастомного компонента
                                            key: "colorSelect", // Уникальный ключ
                                            label: "Select Color", // Название
                                            weight: 100,
                                            components: [
                                                {
                                                    type: "customColorSelect", // Используем ваш кастомный компонент
                                                    key: "selectedColor", // Уникальный ключ для настройки цвета
                                                    label: "Choose Color",
                                                    placeholder:
                                                        "Select a color",
                                                    defaultValue: "#000000", // Установите значение по умолчанию
                                                    onChange: (event: any) => {
                                                        this.component.selectedColor =
                                                            event.target.value; // Сохраните выбранный цвет в компонент
                                                        this.renderComponent(
                                                            this.element,
                                                        ); // Перерисуйте компонент
                                                    },
                                                },
                                            ],
                                        },

                                        {
                                            type: "checkbox",
                                            key: "fill",
                                            label: "isFill",
                                            input: true,
                                        },
                                    ],
                                    weight: 100,
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

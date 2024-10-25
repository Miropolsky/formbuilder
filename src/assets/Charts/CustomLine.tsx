import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
    Scriptable,
    EasingFunction,
    ScriptableContext,
    ChartType,
} from "chart.js";

// Регистрация компонентов для Chart.js
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
);

// Интерфейс для данных графика
interface LineChartProps {
    titleChart?: string;
    titleOsX?: string;
    titleOsY?: string;
    labelsX?: number[];
    datasets?: IDataSet[];
    legendPosition?: "top" | "bottom" | "left" | "right" | "chartArea";
    isShowTitle?: boolean;
    isXTitleDisplay?: boolean;
    isYTitleDisplay?: boolean;
    isYBeginAtZero?: boolean;

    // Дополнительные параметры
    showPoints?: boolean;
    pointRadius?: number;
    pointBackgroundColor?: string;
    showXGrid?: boolean;
    showYGrid?: boolean;
    gridColor?: string;
    tension?: number;
    animationDuration?: number;
    animationEasing?: Scriptable<EasingFunction, ScriptableContext<ChartType>>;
    showTooltips?: boolean;
    tooltipBackgroundColor?: string;
    tooltipMode?: "nearest" | "index" | "dataset" | "point";
    lineWidth?: number;
    borderDash?: [number, number];
    axisColor?: string;
    labelColor?: string;
    yAxisFormat?: (value: number) => string;
}

// Интерфейс для каждого набора данных (datasets)
interface IDataSet {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
}

const CustomLine: React.FC<LineChartProps> = ({
    // Основные параметры
    titleChart = "Sample Line Chart",
    titleOsX = "X Axis",
    titleOsY = "Y Axis",
    labelsX = [0, 1, 2, 3, 4],
    datasets = [
        {
            label: "Series 1",
            data: [10, 20, 30, 25, 15],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
        },
        {
            label: "Series 2",
            data: [5, 15, 20, 10, 25],
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            fill: true,
        },
    ],
    legendPosition = "top",
    isShowTitle = true,
    isXTitleDisplay = true,
    isYTitleDisplay = true,
    isYBeginAtZero = true,

    // Дополнительные параметры
    showPoints = true,
    pointRadius = 3,
    showXGrid = true,
    showYGrid = true,
    gridColor = "rgba(0, 0, 0, 0.1)",
    tension = 0.4,
    showTooltips = true,
    tooltipMode = "nearest",
    lineWidth = 2,
    borderDash = [0, 0], // Сплошная линия
    labelColor = "rgba(0, 0, 0, 0.7)",
}) => {
    // Данные для графика
    const data: ChartData<"line"> = {
        labels: labelsX,
        datasets: datasets,
    };

    // Настройки графика
    const options: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: {
                position: legendPosition,
            },
            title: {
                display: isShowTitle,
                text: titleChart,
            },
            tooltip: {
                enabled: showTooltips,
                mode: tooltipMode,
            },
        },
        elements: {
            point: {
                radius: showPoints ? pointRadius : 0, // Показывать или скрывать точки
            },
            line: {
                tension: tension, // Управляем натяжением линии
                borderWidth: lineWidth, // Толщина линии
                borderDash: borderDash, // Стиль линии (пунктир или сплошная)
            },
        },
        scales: {
            x: {
                grid: {
                    display: showXGrid,
                    color: gridColor,
                },
                title: {
                    display: isXTitleDisplay,
                    text: titleOsX,
                },
                ticks: {
                    color: labelColor,
                },
            },
            y: {
                grid: {
                    display: showYGrid,
                    color: gridColor,
                },
                title: {
                    display: isYTitleDisplay,
                    text: titleOsY,
                },
                beginAtZero: isYBeginAtZero,
                ticks: {
                    color: labelColor,
                },
            },
        },
    };

    return (
        <div style={{ width: "600px", height: "400px" }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default CustomLine;

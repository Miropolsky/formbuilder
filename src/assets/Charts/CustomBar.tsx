import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { randomNumber } from "../../utils/utils";

// Регистрация компонентов для Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

// Интерфейс для данных графика
interface BarChartProps {
    height?: string;
    width?: string;
    titleChart?: string;
    legendPosition?: "top" | "bottom" | "left" | "right" | "chartArea";
    isShowTitle?: boolean;
    indexAxis?: "x" | "y"; // Ось для графика
    datasets?: IDataSet[]; // Наборы данных
    barBorderWidth?: number; // Ширина границы для столбцов
    barBackgroundColor?: string; // Цвет фона для столбцов
    labelsX?: [];
}

// Интерфейс для каждого набора данных (datasets)
interface IDataSet {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
}

const CustomBar: React.FC<BarChartProps> = ({
    height = "300px",
    width = "600px",
    titleChart = "Chart.js Horizontal Bar Chart",
    legendPosition = "right",
    isShowTitle = true,
    indexAxis = "y",
    datasets = [
        {
            label: "Dataset 1",
            data: Array(7)
                .fill(0)
                .map(() => randomNumber(-1000, 1000)), // Пример данных
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: Array(7)
                .fill(0)
                .map(() => randomNumber(-1000, 1000)), // Пример данных
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
    barBorderWidth = 2,
    barBackgroundColor = "rgba(0, 0, 0, 0.1)",
    labelsX: labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
    ],
}) => {
    const data = {
        labels,
        datasets,
    };

    const options = {
        indexAxis,
        elements: {
            bar: {
                borderWidth: barBorderWidth,
                backgroundColor: barBackgroundColor,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: legendPosition,
            },
            title: {
                display: isShowTitle,
                text: titleChart,
            },
        },
    };

    return <Bar options={options} data={data} width={width} height={height} />;
};

export default CustomBar;

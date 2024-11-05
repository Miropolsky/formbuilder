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
interface StackedBarChartProps {
    height?: string;
    width?: string;
    titleChart?: string;
    legendPosition?: "top" | "bottom" | "left" | "right" | "chartArea";
    isShowTitle?: boolean;
    labelsX?: string[];
    datasets?: {
        label: string;
        backgroundColor: string;
        borderColor?: string;
        borderWidth?: number;
    }[];
}

// Компонент для стекового столбчатого графика
const CustomBarStacked: React.FC<StackedBarChartProps> = ({
    height = "300px",
    width = "600px",
    titleChart = "Chart.js Bar Chart - Stacked",
    legendPosition = "right",
    isShowTitle = true,
    labelsX = ["January", "February", "March", "April", "May", "June", "July"],
    datasets = [
        {
            label: "Dataset 1",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
        },
        {
            label: "Dataset 2",
            backgroundColor: "rgb(75, 192, 192)",
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1,
        },
        {
            label: "Dataset 3",
            backgroundColor: "rgb(53, 162, 235)",
            borderColor: "rgb(53, 162, 235)",
            borderWidth: 1,
        },
    ],
}) => {
    const data = {
        labels: labelsX,
        datasets: datasets.map((dataset) => ({
            ...dataset,
            data: labelsX.map(() => randomNumber(-1000, 1000)), // Генерация случайных данных для каждого набора
        })),
    };

    const options = {
        plugins: {
            legend: {
                position: legendPosition,
            },
            title: {
                display: isShowTitle,
                text: titleChart,
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    return <Bar options={options} data={data} width={width} height={height} />;
};

export default CustomBarStacked;

import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { randomNumber } from "../../utils/utils";

// Регистрация компонентов для Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

// Интерфейс для данных графика
interface LineChartProps {
    title?: string; // Заголовок графика
    labels?: string[]; // Метки по оси X
    datasets?: {
        label: string; // Название набора данных
        data: number[]; // Данные для графика
        borderColor: string; // Цвет линии
        backgroundColor: string; // Цвет фона
        yAxisID: string; // Идентификатор оси Y
    }[]; // Массив наборов данных
    stacked?: boolean; // Стековые данные
    showTitle?: boolean; // Показать заголовок или нет
    height: string;
    width: string;
}

// Компонент для графика в виде линейной диаграммы
const CustomLineAxis: React.FC<LineChartProps> = ({
    height = "300px",
    width = "600px",
    title = "Chart.js Line Chart - Multi Axis",
    labels = ["January", "February", "March", "April", "May", "June", "July"],
    datasets = [
        {
            label: "Dataset 1",
            data: labels.map(() => randomNumber(-1000, 1000)),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            yAxisID: "y",
        },
        {
            label: "Dataset 2",
            data: labels.map(() => randomNumber(-1000, 1000)),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            yAxisID: "y1",
        },
    ],
    stacked = false,
    showTitle = true,
}) => {
    const options = {
        responsive: true,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        stacked,
        plugins: {
            title: {
                display: showTitle,
                text: title,
            },
        },
        scales: {
            y: {
                type: "linear" as const,
                display: true,
                position: "left" as const,
            },
            y1: {
                type: "linear" as const,
                display: true,
                position: "right" as const,
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    const data = {
        labels,
        datasets,
    };

    return <Line width={width} height={height} options={options} data={data} />;
};

export default CustomLineAxis;

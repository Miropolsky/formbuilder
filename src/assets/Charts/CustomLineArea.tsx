import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
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
    Filler,
    Legend,
);

// Интерфейс для данных графика
interface LineAreaChartProps {
    height?: string;
    width?: string;
    title?: string; // Заголовок графика
    labels?: string[]; // Метки по оси X
    datasets?: {
        fill?: boolean; // Использовать ли заливку
        label: string; // Название набора данных
        data: number[]; // Данные для графика
        borderColor: string; // Цвет линии
        backgroundColor: string; // Цвет фона
    }[]; // Массив наборов данных
}

// Компонент для графика в виде линейной диаграммы с заливкой
const CustomLineArea: React.FC<LineAreaChartProps> = ({
    height = "300px",
    width = "600px",
    title = "Chart.js Line Chart",
    labels = ["January", "February", "March", "April", "May", "June", "July"],
    datasets = [
        {
            fill: true,
            label: "Dataset 1",
            data: labels.map(() => randomNumber(0, 1000)),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
}) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    const data = {
        labels,
        datasets,
    };

    return <Line width={width} height={height} options={options} data={data} />;
};

export default CustomLineArea;

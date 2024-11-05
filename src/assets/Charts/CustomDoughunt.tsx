import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Регистрация компонентов для Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Интерфейс для данных графика
interface DoughnutChartProps {
    title?: string; // Заголовок графика
    labels?: string[]; // Метки для секторов
    dataValues?: number[]; // Данные для графика
    backgroundColors?: string[]; // Цвета фона для секторов
    borderColors?: string[]; // Цвета границ для секторов
    borderWidth?: number; // Ширина границ для секторов
    isShowTitle?: boolean; // Показать заголовок или нет
    height: string;
    width: string;
}

// Компонент для графика в виде круговой диаграммы
const CustomDoughnut: React.FC<DoughnutChartProps> = ({
    height = "500px",
    width = "500px",
    title = "My Doughnut Chart",
    labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    dataValues = [12, 19, 3, 5, 2, 3],
    backgroundColors = [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
    ],
    borderColors = [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
    ],
    borderWidth = 1,
    isShowTitle = true,
}) => {
    const data = {
        labels,
        datasets: [
            {
                label: title,
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: isShowTitle,
                text: title,
            },
        },
    };

    return (
        <Doughnut width={width} height={height} data={data} options={options} />
    );
};

export default CustomDoughnut;

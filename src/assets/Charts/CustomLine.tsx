import { Line } from "react-chartjs-2";
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
export default function CustomLine() {
    return (
        <Line
            datasetIdKey="id"
            data={{
                labels: ["Jun", "Jul", "Aug"],
                datasets: [
                    {
                        id: 1,
                        label: "",
                        data: [5, 6, 7],
                    },
                    {
                        id: 2,
                        label: "",
                        data: [3, 2, 1],
                    },
                ],
            }}
        />
    );
}

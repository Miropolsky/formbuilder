import { useState } from "react";
import Ventilator from "../assets/Widjet/Ventilator";
import WaterTank from "../assets/Widjet/WaterTank";
import WaterFlow from "../assets/Widjet/WaterFlow";
import CustomLine from "../assets/Charts/CustomLine";
import { CustomBarStacked } from "../assets/Charts/CustomBarStacked";
import { CustomDoughunt } from "../assets/Charts/CustomDoughunt";
import { CustomLineArea } from "../assets/Charts/CustomLineArea";
import { CustomLineAxis } from "../assets/Charts/CustomLineAxis";
import CustomBar from "../assets/Charts/CustomBar";

export default function TestPage() {
    const [waterLevel, setWaterLevel] = useState(50);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWaterLevel(Number(event.target.value));
    };
    return (
        <div>
            <h1>Test</h1>
            <div className="200px">
                <Ventilator isActive={true} />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={waterLevel}
                    onChange={handleChange}
                    className="mt-4 w-1/2"
                />
                <WaterTank waterLevel={waterLevel} />
            </div>
            <div>
                <WaterFlow isActive={true} />
            </div>
            <div className="w-[600px]">
                <CustomLine titleChart="Line Chart" titleOsX="x" titleOsY="y" />
            </div>
            <div className="w-[900px]">
                <CustomBar />
            </div>
            <div className="w-[900px]">
                <CustomBarStacked />
            </div>
            <div className="w-[900px]">
                <CustomDoughunt />
            </div>
            <div className="w-[900px]">
                <CustomLineArea />
            </div>
            <div className="w-[900px]">
                <CustomLineAxis />
            </div>
        </div>
    );
}

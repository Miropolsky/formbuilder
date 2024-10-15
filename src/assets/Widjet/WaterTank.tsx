interface WaterTankProps {
    waterLevel: number;
}

const WaterTank: React.FC<WaterTankProps> = ({ waterLevel }) => {
    const clipPathHeight = 100 - waterLevel;

    return (
        <svg
            width="200"
            height="400"
            viewBox="0 0 200 400"
            xmlns="http://www.w3.org/2000/svg"
            className="border-2 border-gray-400"
        >
            <rect width="200" height="400" fill="white" />
            <rect
                width="200"
                height="400"
                fill="#82c8df"
                style={{
                    transform: `translateY(${clipPathHeight}%)`,
                    transformOrigin: "top",
                    transition: "transform 0.5s ease-in-out",
                }}
            />
        </svg>
    );
};

export default WaterTank;

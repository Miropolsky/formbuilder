import "./WaterFlow.css";

interface Props {
    isActive: boolean;
}

const WaterFlow = ({ isActive }: Props) => {
    return (
        <div className="svg-container">
            <svg
                width="600"
                height="100"
                viewBox="0 0 600 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="0" y="30" width="600" height="40" fill={"#048DE9"} />
                <g className={isActive ? "arrows" : ""}>
                    {[...Array(6)].map((_, i) => (
                        <path
                            key={i}
                            className="arrow"
                            d="M 0,50 L -10,40 L -10,45 L -30,45 L -30,55 L -10,55 L -10,60 L 0,50"
                            fill={"#3AD3D8"}
                            style={{ animationDelay: `${i * 0.333}s` }}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default WaterFlow;

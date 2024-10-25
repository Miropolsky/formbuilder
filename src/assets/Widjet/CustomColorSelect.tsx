import { CSSProperties, useState } from "react";
import styles from "./SelectColor.module.scss";
import { randomColors } from "../../utils/utils";

interface Props {
    value?: string;
    onChange?: (el: string) => void;
    style?: CSSProperties;
}

export default function CustomColorSelect({
    value = randomColors(),
    onChange,
    style,
}: Props) {
    const [selectedColor, setSelectedColor] = useState(value);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };
    return (
        <div className={styles.container}>
            <input
                type="color"
                className={styles.customInput}
                style={style}
                value={selectedColor}
                onChange={handleChange}
                id="style"
            />
        </div>
    );
}

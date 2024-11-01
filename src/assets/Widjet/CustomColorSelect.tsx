import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import { Components } from "@formio/react";
import styles from "./SelectColor.module.scss";
import { randomColors } from "../../utils/utils";

interface CustomColorSelectSchema {
    label: string;
    type: string;
    key: string;
    input: boolean;
    defaultValue: string;
    selectorColor: string;
}

export class CustomColorSelect extends Components.components.textfield {
    static schema(...extend: Partial<CustomColorSelectSchema>[]) {
        return Components.components.textfield.schema({
            label: "Выбор цвета",
            type: "customColorSelect",
            key: "customColorSelect",
            input: true,
            defaultValue: randomColors(),
            selectedColor: "black",
            ...extend,
        });
    }

    static get builderInfo() {
        return {
            title: "Color Picker",
            group: "basic",
            icon: "palette",
            weight: 70,
            schema: CustomColorSelect.schema(),
        };
    }

    constructor(component: any, options: any, data: any) {
        super(component, options, data);
        this.component.selectedColor = this.dataValue;
        this.updateColor = this.updateColor.bind(this);
    }

    updateColor(newColor: string) {
        if (newColor) {
            this.component.selectedColor = newColor;
            this.dataValue = newColor; // Обновляем значение для Form.io
            this.triggerChange(); // Сообщаем об изменении
        } else {
            console.error("newColor is undefined or null");
        }
    }

    renderInput(): HTMLElement {
        const container = document.createElement("div");
        container.className = styles.container;

        const ColorInput = () => {
            const [color, setColor] = useState(this.component.selectedColor);

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const newColor = e.target.value;
                setColor(newColor);
                this.updateColor(newColor);
            };

            return (
                <input
                    type="color"
                    className={styles.customInput}
                    value={color}
                    onChange={handleChange}
                    style={this.component.style || {}}
                />
            );
        };

        const root = createRoot(container);
        root.render(<ColorInput />);

        return container;
    }

    renderElement(): string {
        return "";
    }

    attach(element: HTMLElement) {
        super.attach(element);
        const inputElement = this.renderInput();
        element.appendChild(inputElement);
        return element;
    }
}

Components.addComponent("customColorSelect", CustomColorSelect);

export default CustomColorSelect;

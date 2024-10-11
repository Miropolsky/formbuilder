import { Components } from "@formio/react";
import Ventilator from "../../assets/Widjet/Ventilator";

export class CustomWidget extends Components.components.field {
    static schema(...extend) {
        return Components.components.field.schema({
            label: "Custom Widget",
            type: "customwidget",
            key: "customWidget",
            input: true,
            ...extend,
        });
    }

    static get builderInfo() {
        return {
            title: "Custom Widget",
            group: "basic",
            icon: "cog",
            weight: 60,
            schema: CustomWidget.schema(),
        };
    }

    renderElement(value) {
        return (
            <div>
                <label>${this.component.label}</label>$
                <Ventilator isActive={true} />
            </div>
        );
    }

    attach(element) {
        super.attach(element);
        this.element
            .querySelector("input")
            .addEventListener("input", (event) => {
                this.setValue(event.target.value);
            });
    }
}

// Регистрируем виджет
Components.addComponent("customwidget", CustomWidget);

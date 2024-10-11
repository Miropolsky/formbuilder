import { Components } from "@formio/react";

// Определяем типы для нашего компонента
interface CustomImageSchema extends Components.components.textfield.schema {
    imageSrc: string;
    fileBlob: Blob | null;
}

const positionToFlex = (position: "Left" | "Right" | "Center") => {
    switch (position) {
        case "Left":
            return `justify-content: start`;
        case "Right":
            return `justify-content: end`;
        case "Center":
            return `justify-content: center`;
        default:
            return `justify-content: start`; // Значение по умолчанию
    }
};

// Создаем новый компонент с использованием TypeScript
export class ImageComponent extends Components.components.textfield {
    // Определяем схему для кастомного компонента
    static schema(...extend: Partial<CustomImageSchema>[]): CustomImageSchema {
        return Components.components.textfield.schema({
            label: "", // Скрываем метку
            type: "customimage",
            key: "customImage",
            imageSrc: "",
            fileBlob: null,
            input: true,
            ...extend,
        });
    }

    // Настройки для добавления компонента в FormBuilder
    static get builderInfo() {
        return {
            title: "Custom Image",
            group: "basic",
            icon: "image",
            weight: 70,
            schema: ImageComponent.schema(),
        };
    }

    // Рендерим HTML для кастомного компонента
    renderElement(value: any): string {
        const {
            imageSrc,
            width = "100%",
            height = "auto",
            position = "Left",
            alt = "Custom Image",
            padding = "0px 0px 0px 0px",
            margin = "0px 0px 0px 0px",
            rounding = "0px",
        } = this.component;
        return `
            <div class="custom-image" style="display: flex; ${positionToFlex(position)}; margin: ${margin}; padding: ${padding}">
                <img src="${imageSrc}" alt="${alt}" style="max-width: ${width}; height: ${height}; border-radius: ${rounding}" />
            </div>
        `;
    }

    // Метод attach для привязки событий
    attach(element: HTMLElement): void {
        super.attach(element);

        // Обработчик изменения URL (если вручную вводится URL изображения)
        const inputUrl = element.querySelector("input[name='imageSrc']");
        if (inputUrl) {
            inputUrl.addEventListener("input", (event: any) => {
                this.component.imageSrc = event.target.value;
                this.redraw(); // Перерисовываем компонент после изменения
            });
        }

        // Обработчик изменения файла (Blob)
        const fileInput = element.querySelector("#fileInput");
        if (fileInput) {
            fileInput.addEventListener("change", (event: any) => {
                const file = event.target.files[0];
                if (file) {
                    // Создаем Blob и сохраняем его
                    const blob = new Blob([file], { type: file.type });
                    this.component.fileBlob = blob;

                    // Создаем URL для отображения изображения
                    const imageURL = URL.createObjectURL(blob);
                    this.component.imageSrc = imageURL;

                    // Перерисовываем компонент после изменения
                    this.redraw();
                }
            });
        }
    }
}

// Регистрируем компонент в Form.io
Components.addComponent("customimage", ImageComponent);

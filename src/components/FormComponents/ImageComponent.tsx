import { Components } from "@formio/react";
import { positionToFlex } from "../../utils/utils";
// Определяем типы для нашего компонента
interface CustomImageSchema extends Components.components.textfield.schema {
    imageSrc: string;
    fileBlob: Blob | null;
}

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
    renderElement(): string {
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
        const fileInput = element.querySelector("input[name='fileImg']");
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
    static editForm() {
        return {
            components: [
                {
                    type: "textfield",
                    input: true,
                    key: "imageSrc",
                    label: "Image URL",
                    placeholder: "Enter image URL",
                    weight: 0, // Порядок отображения
                },
                {
                    type: "file",
                    input: true,
                    key: "fileImg",
                    label: "Upload Image",
                    weight: 10, // Порядок отображения
                    // customConditional: "show = true;", // Настройка для отображения только в настройках
                },
                {
                    type: "textfield",
                    input: true,
                    key: "width",
                    label: "Image Width",
                    placeholder: "Enter width (e.g., 100%, 300px)",
                    weight: 20, // Порядок отображения
                },
                {
                    type: "textfield",
                    input: true,
                    key: "height",
                    label: "Image Height",
                    placeholder: "Enter height (e.g., auto, 200px)",
                    weight: 30,
                },
                {
                    type: "select",
                    input: true,
                    key: "position",
                    label: "Position Image",
                    dataSrc: "values",
                    data: {
                        values: [
                            { value: "Left", label: "Left" },
                            { value: "Center", label: "Center" },
                            { value: "Right", label: "Right" },
                        ],
                    },
                    defaultValue: "Left",
                    weight: 40,
                },
                {
                    type: "textfield",
                    input: true,
                    key: "alt",
                    label: "Alt attribute",
                    placeholder: "Custom Image",
                    weight: 50,
                },
                {
                    type: "textfield",
                    input: true,
                    key: "margin",
                    label: "External indentation(margin)",
                    placeholder: "0px 0px 0px 0px",
                    weight: 60,
                },
                {
                    type: "textfield",
                    input: true,
                    key: "padding",
                    label: "Internal indentation(padding)",
                    placeholder: "0px 0px 0px 0px",
                    weight: 70,
                },
                {
                    type: "textfield",
                    input: true,
                    key: "rounding",
                    label: "Rounding",
                    placeholder: "Enter rounding(10%, 12px)",
                    weight: 80,
                },
            ],
        };
    }
}

// Регистрируем компонент в Form.io
Components.addComponent("customimage", ImageComponent);

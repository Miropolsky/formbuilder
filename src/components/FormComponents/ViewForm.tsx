import { Form, FormType } from "@formio/react";
import { Button, Card } from "react-bootstrap";
import { useStoreSelector } from "../../redux/store";
import { useState } from "react";

export default function ViewForm() {
    const schema = useStoreSelector((state) => state.builder.schema);
    const [isShow, setIsShow] = useState(false);
    return (
        <div className="flex flex-col items-center">
            <Button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                onClick={() => setIsShow((prev) => !prev)}
            >
                {isShow ? "Скрыть форму" : "Показать форму"}
            </Button>

            {isShow && schema.components && (
                <Card className="my-6 w-full p-3 bg-white shadow-lg rounded-lg transition-opacity duration-300 ease-in-out">
                    <Form src={schema as FormType} />
                </Card>
            )}
        </div>
    );
}

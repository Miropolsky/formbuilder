import ReactJson from "@microlink/react-json-view";
import { Button, Card } from "react-bootstrap";
import { useStoreSelector } from "../../redux/store";
import { useState } from "react";

export default function SchemaJSON() {
    const schema = useStoreSelector((state) => state.builder.schema);
    const [isShow, setIsShow] = useState(false);
    return (
        <div className="flex flex-col items-center">
            <Button
                className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                onClick={() => setIsShow((prev) => !prev)}
            >
                {isShow ? "Скрыть JSON" : "Показать JSON"}
            </Button>
            {isShow && (
                <Card className="my-6 w-full max-w-4xl bg-white shadow-lg rounded-lg transition-opacity duration-300 ease-in-out">
                    <Card.Body className="p-6">
                        {schema && (
                            <ReactJson
                                src={schema}
                                name={null}
                                collapsed={false}
                                theme="rjv-default"
                                style={{
                                    backgroundColor: "#f9f9f9",
                                    padding: "20px",
                                    borderRadius: "10px",
                                }}
                            />
                        )}
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}

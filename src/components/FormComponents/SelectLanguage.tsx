import { Form } from "react-bootstrap";
import { useStoreDispatch, useStoreSelector } from "../../redux/store";
import { changeLanguage } from "../../redux/builder";
import { isLanguage } from "../../utils/utils";

export default function SelectLanguage() {
    const dispatch = useStoreDispatch();
    const language = useStoreSelector((state) => state.builder.language);
    const changeEvent = (lang: string) => {
        if (isLanguage(lang)) dispatch(changeLanguage(lang));
    };
    return (
        <Form.Select
            aria-label="Выберите язык"
            value={language}
            className="w-[80px] bg-gray-100 text-gray-700 border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
            onChange={(event) => changeEvent(event.target.value)}
        >
            <option value="ru">RU</option>
            <option value="en">EN</option>
        </Form.Select>
    );
}

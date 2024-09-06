import ViewForm from "../components/FormComponents/ViewForm";
import SchemaJSON from "../components/FormComponents/SchemaJSON";
import SelectLanguage from "../components/FormComponents/SelectLanguage";
import BuildForm from "../components/FormComponents/BuildForm";
import LoadedForm from "../components/FormComponents/LoadedForm";

export default function BuilderPage() {
    return (
        <>
            <div className="p-4 bg-white shadow-lg rounded-lg">
                {/* Select language */}
                <div className="flex justify-end mb-4">
                    <SelectLanguage />
                </div>

                {/* Loaded Form */}
                <div className="mb-6">
                    <LoadedForm />
                </div>

                {/* Build Form */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold mb-3 text-gray-700">
                        Конструктор Форм
                    </h2>
                    <BuildForm />
                </div>

                {/* View Form and JSON Schema */}
                <div className="flex flex-col gap-y-6">
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-2 text-gray-700">
                            Предварительный просмотр формы
                        </h2>
                        <ViewForm />
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-2 text-gray-700">
                            JSON схема формы
                        </h2>
                        <SchemaJSON />
                    </div>
                </div>
            </div>
        </>
    );
}
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import "./index.css";
import BuilderPage from "./pages/BuilderPage";
import ShowForm from "./pages/ShowForm";
import ErrorPage from "./pages/ErrorPage";
import ValueSaveForm from "./pages/ValueSaveForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BuilderPage />,
    },
    {
        path: "/showForm",
        element: <ShowForm />,
    },
    {
        path: "/valueSaveForm",
        element: <ValueSaveForm />,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

function App() {
    return (
        <div>
            <Header />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;

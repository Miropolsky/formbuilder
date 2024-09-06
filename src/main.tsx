import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const el = document.getElementById("root");
if (!el) {
    throw new Error("Cannot find root element.");
}
const root = ReactDOM.createRoot(el);
const router = createHashRouter([
    {
        path: "/*",
        element: <App />,
    },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const el = document.getElementById("root");
if (!el) {
    throw new Error("Cannot find root element.");
}
const root = ReactDOM.createRoot(el);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);

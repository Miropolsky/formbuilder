import { configureStore } from "@reduxjs/toolkit";
import builder from "./builder";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        builder: builder,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export const useStoreDispatch = () => useDispatch<typeof store.dispatch>();
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;

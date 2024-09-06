import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    FormOptionsType,
    IloadSchema,
    LanguagesType,
    formOptions,
} from "../utils/utils";
import { FormType } from "@formio/react";

interface InitialType {
    language: LanguagesType;
    schema: FormType;
    option: FormOptionsType;
    loadSchems: IloadSchema[];
    curNameSchema: string;
}

const initialState: InitialType = {
    language: "ru",
    schema: {
        display: "form",
        components: [],
    },
    option: formOptions("ru"),
    loadSchems: [],
    curNameSchema: "",
};

const builderSlice = createSlice({
    name: "builder",
    initialState: initialState,
    reducers: {
        setOption: (state, action: PayloadAction<FormOptionsType>) => {
            state.option = action.payload;
        },
        setSchema: (state, action: PayloadAction<FormType>) => {
            state.schema = action.payload;
        },
        changeLanguage: (state, action: PayloadAction<LanguagesType>) => {
            state.language = action.payload;
            state.option = formOptions(action.payload);
        },
        addLoadSchema: (state, action: PayloadAction<IloadSchema>) => {
            state.loadSchems.push(action.payload);
        },
        deleteLoadSchema: (state, action: PayloadAction<string>) => {
            state.loadSchems = state.loadSchems.filter(
                (el) => el.name !== action.payload,
            );
        },
        setCurNameSchema: (state, action: PayloadAction<string>) => {
            state.curNameSchema = action.payload;
        },
    },
});

export const {
    changeLanguage,
    setSchema,
    setOption,
    addLoadSchema,
    deleteLoadSchema,
    setCurNameSchema,
} = builderSlice.actions;
export default builderSlice.reducer;

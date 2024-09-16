import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    FormOptionsType,
    IloadSchema,
    LanguagesType,
    formOptions,
} from "../utils/utils";
import { FormType } from "@formio/react";
import { apiForms } from "../api/apiForm";

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

export const getAllForms = createAsyncThunk("getAllForms", async () => {
    const response = await apiForms.getAllForms();
    return response.data;
});

export const addForm = createAsyncThunk(
    "addForm",
    async (schema: IloadSchema) => {
        const response = await apiForms.addForm(schema);
        return response.data;
    },
);
export const deleteForm = createAsyncThunk("addForm", async (id: number) => {
    const response = await apiForms.deleteForm(id);
    return response.data;
});

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
        editLoadSchema: (
            state,
            action: PayloadAction<{ schema: FormType; name: string }>,
        ) => {
            const { schema, name } = action.payload;
            const curInd = state.loadSchems.findIndex(
                (form) => form.name === name,
            );
            state.loadSchems[curInd] = { schema, name };
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
    extraReducers: (builder) => {
        builder.addCase(getAllForms.fulfilled, (state, action) => {
            state.loadSchems = action.payload;
            console.log(action.payload);
        });
        // builder.addCase(deleteForm.fulfilled, (state, action) => {
        //     getAllForms();
        // });
        // builder.addCase(addForm.fulfilled, (state, action) => {
        //     getAllForms();
        // });
    },
});

export const {
    changeLanguage,
    setSchema,
    setOption,
    addLoadSchema,
    deleteLoadSchema,
    editLoadSchema,
    setCurNameSchema,
} = builderSlice.actions;
export default builderSlice.reducer;

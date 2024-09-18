import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    CustomSchemaType,
    FormOptionsType,
    IloadSchema,
    LanguagesType,
    formOptions,
} from "../utils/utils";
import { apiForms } from "../api/apiForm";

interface InitialType {
    language: LanguagesType;
    schema: CustomSchemaType | null;
    option: FormOptionsType;
    loadSchems: IloadSchema[];
    curNameSchema: string;
}

const initialState: InitialType = {
    language: "ru",
    schema: null,
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
export const editForm = createAsyncThunk(
    "editForm",
    async (schema: IloadSchema) => {
        const response = await apiForms.editForm(schema);
        return response.data;
    },
);
export const deleteForm = createAsyncThunk("deleteForm", async (id: string) => {
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
        setSchema: (state, action: PayloadAction<CustomSchemaType>) => {
            state.schema = action.payload;
        },
        changeLanguage: (state, action: PayloadAction<LanguagesType>) => {
            state.language = action.payload;
            state.option = formOptions(action.payload);
        },
        setCurNameSchema: (state, action: PayloadAction<string>) => {
            state.curNameSchema = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllForms.fulfilled, (state, action) => {
                state.loadSchems = action.payload;
            })
            .addCase(deleteForm.fulfilled, (state, action) => {
                state.loadSchems = state.loadSchems.filter(
                    (form) => form.id !== action.meta.arg,
                );
            })
            .addCase(addForm.fulfilled, (state, action) => {
                state.loadSchems.push(action.meta.arg);
            })
            .addCase(editForm.fulfilled, (state, action) => {
                const index = state.loadSchems.findIndex(
                    (form) => form.id === action.meta.arg.id,
                );
                if (index !== -1) {
                    state.loadSchems[index] = {
                        ...state.loadSchems[index],
                        ...action.meta.arg,
                    }; // Используйте action.payload, чтобы заменить форму
                }
            });
    },
});

export const { changeLanguage, setSchema, setOption, setCurNameSchema } =
    builderSlice.actions;
export default builderSlice.reducer;

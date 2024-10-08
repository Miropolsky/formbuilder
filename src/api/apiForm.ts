import axios from "axios";
import { CustomSchemaType, LoadValues } from "../utils/utils";

const instance = axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
        "Content-Type": "application/json",
    },
});

interface ApiResponse<T> {
    data: T;
}

export const apiForms = {
    async getAllForms(): Promise<ApiResponse<CustomSchemaType[]>> {
        return await instance.get("/forms");
    },
    async addForm(
        schema: CustomSchemaType,
    ): Promise<ApiResponse<CustomSchemaType>> {
        return await instance.post("/addForm", schema);
    },
    async deleteForm(id: string): Promise<ApiResponse<null>> {
        return await instance.delete(`/deleteForm/${id}`);
    },
    async editForm(schema: CustomSchemaType): Promise<ApiResponse<null>> {
        return await instance.put(`/editForm/${schema.id}`, schema);
    },
    async addValue(
        value: Record<string, any>,
    ): Promise<ApiResponse<LoadValues>> {
        return await instance.post("/saveData", value);
    },
    async getAllValue(): Promise<ApiResponse<LoadValues[]>> {
        return await instance.get("/getData");
    },
};

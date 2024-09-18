import axios from "axios";
import { IloadSchema } from "../utils/utils";

const instance = axios.create({
    baseURL: "http://localhost:5000/", // Замените на ваш API URL
    headers: {
        "Content-Type": "application/json",
    },
});

interface ApiResponse<T> {
    data: T;
}

export const apiForms = {
    async getAllForms(): Promise<ApiResponse<IloadSchema[]>> {
        return await instance.get("/forms");
    },
    async addForm(schema: IloadSchema): Promise<ApiResponse<IloadSchema>> {
        return await instance.post("/addForm", schema);
    },
    async deleteForm(id: string): Promise<ApiResponse<null>> {
        return await instance.delete(`/deleteForm/${id}`);
    },
    async editForm(schema: IloadSchema): Promise<ApiResponse<null>> {
        return await instance.put(`/editForm/${schema.id}`, schema);
    },
};

import type { Employee } from "@/types/employee";
import api from "./api";

interface ApiResponse<T> {
    users: T;
}

export const getEmployees = async (): Promise<Employee[]> => {
    // try {
    const response = await api.get<ApiResponse<Employee[]>>("/users");
    return response.data.users;
    // } catch (error: unknown) {
    //     if (error instanceof Error) {
    //         throw new Error(error.message);
    //     }
    //     throw new Error("An unknown error occurred while getting employees.");
    // }
};

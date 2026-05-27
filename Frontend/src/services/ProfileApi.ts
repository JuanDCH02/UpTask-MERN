import type { UpdateProfilePassword, UserProfileForm } from "../types"
import api from "@/lib/axios"
import { ensureResponseData, throwApiError } from "./apiError"



export async function updateProfile(formData : UserProfileForm) {

    try {
        const {data} = await api.put<string>(`/auth/profile`, formData)
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida.")
    } catch (error) {
        throwApiError(error)
    }
}
export async function changeProfilePassword(formData : UpdateProfilePassword) {

    try {
        const {data} = await api.post<string>(`/auth/password`, formData)
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida.")
    } catch (error) {
        throwApiError(error)
    }
}

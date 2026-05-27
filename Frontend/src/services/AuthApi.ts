import api from "@/lib/axios";
import { type ForgotPasswordForm, type NewPasswordForm, type UserLoginForm, type UserRegistrationForm, userSchema } from "../types";
import { ensureResponseData, throwApiError } from "./apiError";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = "/auth/create-account"
        const { data } = await api.post<string>(url, formData)
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida al crear la cuenta.")
    } catch (error) {
        throwApiError(error)
    }
}

export async function login(formData: UserLoginForm) {
    try {
        const url = "/auth/login"
        const { data } = await api.post<string>(url, formData)
        const token = ensureResponseData(data, "El servidor no devolvio un token de autenticacion.")
        localStorage.setItem("AUTH_TOKEN", token)
        return token
    } catch (error) {
        throwApiError(error)
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = "/auth/forgot-password"
        const { data } = await api.post<string>(url, formData)
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida.")
    } catch (error) {
        throwApiError(error)
    }
}

export async function validateToken(token: string) {
    try {
        const url = "/auth/validate-token"
        const { data } = await api.post<string>(url, { token })
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida.")
    } catch (error) {
        throwApiError(error)
    }
}

export async function updatePasswordWithToken({ formData, token }: { formData: NewPasswordForm, token: string }) {
    try {
        const url = `/auth/update-password/${token}`
        const { data } = await api.post<string>(url, formData)
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida.")
    } catch (error) {
        throwApiError(error)
    }
}

export async function getUser() {
    try {
        const { data } = await api("/auth/user")
        const res = userSchema.safeParse(data)
        if (res.success) {
            return res.data
        }
        throw new Error("La respuesta del perfil no tiene el formato esperado.")
    } catch (error) {
        throwApiError(error)
    }
}

export async function checkPassword(formData: string) {
    try {
        const { data } = await api.post<string>("/auth/check-password", formData)
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida.")
    } catch (error) {
        throwApiError(error)
    }
}

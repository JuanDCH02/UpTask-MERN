import { isAxiosError } from "axios";

type ApiErrorResponse = {
    error?: string
}

const DEFAULT_NETWORK_ERROR = "No se pudo conectar con el servidor. Revisa VITE_API_URL en Vercel, FRONTEND_URL en Render y que el backend este en linea."
const DEFAULT_UNEXPECTED_ERROR = "Ocurrio un error inesperado. Intenta nuevamente."

export function getApiErrorMessage(error: unknown): string {
    if (isAxiosError<ApiErrorResponse>(error)) {
        const serverMessage = error.response?.data?.error

        if (typeof serverMessage === "string" && serverMessage.trim()) {
            return serverMessage
        }

        if (error.request) {
            return DEFAULT_NETWORK_ERROR
        }
    }

    if (error instanceof Error && error.message.trim()) {
        return error.message
    }

    return DEFAULT_UNEXPECTED_ERROR
}

export function throwApiError(error: unknown): never {
    throw new Error(getApiErrorMessage(error))
}

export function ensureResponseData<T>(data: T | null | undefined, fallbackMessage: string): T {
    if (data === null || data === undefined) {
        throw new Error(fallbackMessage)
    }

    return data
}

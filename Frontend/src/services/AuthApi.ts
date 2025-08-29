import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { UserLoginForm, UserRegistrationForm, ForgotPasswordForm, RequestConfirmationCodeForm, NewPasswordForm } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = '/auth/create-account'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function confirmAccount(token: string) {
    try {
        const url = '/auth/confirm-account'
        const {data} = await api.post<string>(url, {token})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = '/auth/request-code'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function login(formData: UserLoginForm) {
    try {
        const url = '/auth/login'
        const {data} = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = '/auth/forgot-password'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function validateToken(token: string) {
    try {
        const url = '/auth/validate-token'
        const {data} = await api.post<string>(url, {token})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function updatePasswordWithToken({formData, token}: {formData:NewPasswordForm, token:string}) {
    try {
        const url = `/auth/update-password/${token}`
        const {data} = await api.post<string>(url, formData)
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
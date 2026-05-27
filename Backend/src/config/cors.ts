import {CorsOptions} from 'cors'

const normalizeOrigin = (origin: string) => origin.replace(/\/$/, "").toLowerCase()

const getAllowedOrigins = () => {
    const configuredOrigins = process.env.FRONTEND_URL
        ?.split(",")
        .map(origin => origin.trim())
        .filter(Boolean)
        .map(normalizeOrigin) ?? []

    return [
        ...configuredOrigins,
        normalizeOrigin("http://localhost:5173")
    ]
}

export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        const whitelist = getAllowedOrigins()
        const normalizedOrigin = origin ? normalizeOrigin(origin) : origin

        if (!normalizedOrigin || whitelist.includes(normalizedOrigin)) {
            callback(null, true)
        } else {
            callback(new Error('error de cors'))
        }
    }
}

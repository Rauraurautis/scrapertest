import {TypeOf, object, string} from "zod"

export const createTokenSchema = object({
    body: object({
        token: string({required_error: "Token is required!"}),
        userAgent: string({required_error: "Useragent is required!"}),
    })
})

export type CreateTokenInput = TypeOf<typeof createTokenSchema>
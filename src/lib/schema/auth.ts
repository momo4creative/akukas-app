import { z } from "zod";
import type { TypeZodError } from "./parce-zod";

export const loginSchema = z.object({
    username: z.string().min(4, 'Minimal 4 karakter !').trim().toUpperCase(),
    password: z.string().min(4, 'Minimal 4 karakter !').trim()
})

export const registerSchema = loginSchema.merge(z.object({
    confirmPassword: z.string().trim()
})).superRefine((v, c) => {
    if (v.password != v.confirmPassword) {
        c.addIssue({
            message: 'Confirm Password harus sama dengan Password !',
            code: 'custom',
            path: ['confirmPassword']
        })
    }
})
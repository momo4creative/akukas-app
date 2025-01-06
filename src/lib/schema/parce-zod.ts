import { z } from "zod";

export type TypeZodError<T extends z.ZodType = z.ZodAny> = {
    errors?: z.inferFlattenedErrors<T>['fieldErrors']
    status?: number
    message: string
}

export default async function <T extends z.ZodType>(request: Request, schema: T) {
    const form = Object.fromEntries(await request.formData())
    const res = schema.safeParse(form)
    if (!res.success) {
        const errors: z.inferFlattenedErrors<T> = res.error.flatten()
        return {
            error: {
                message: "Kesalahan input form !",
                errors: errors.fieldErrors,
                status: 400
            },
        }
    }

    return {
        data: res.data as z.infer<T>
    }
}
import { goto } from "$app/navigation";
import type { TypeZodError } from "$lib/schema/parce-zod";
import { toast } from "$lib/stores/toast";
import type { ActionResult } from "@sveltejs/kit";
import { z } from "zod";

type Params = { formElement?: HTMLFormElement, result: ActionResult }

export type CallbackSubmit<T extends Record<string, unknown> | undefined = Record<string, any>, TypeZod extends z.ZodType = z.ZodAny> = {
    loading?: (arg: boolean) => void
    result?: (arg: {
        success: false
        error: TypeZodError<TypeZod>
    } | {
        success: true
        data: T
    }) => void
}

function handleSubmit<T extends Record<string, unknown> | undefined, TypeZod extends z.ZodType = z.ZodAny>(title: string, callback: CallbackSubmit<T, TypeZod>) {
    // 
    callback.loading?.(true)
    const toastId = toast.load("Proses ! " + title)
    // 
    return async ({ result, formElement }: Params) => {
        // 
        console.log({ result });
        callback.loading?.(false)
        toast.delete(toastId)

        if (result.type == 'success') {
            formElement?.reset()
            toast.add('success', "Berhasil ! " + title)
            return callback.result?.({ success: true, data: result.data as T })
        }

        if (result.type == 'failure') {
            toast.add('error', "Gagal ! " + title)
            if (result.status == 401) return goto('/auth/login?msg=Silakan login kembali !')
            return callback.result?.({ success: false, error: result.data as TypeZodError<TypeZod> })
        }

        if (result.type == 'redirect') {
            toast.add('success', "Berhasil ! " + title)
            return goto(result.location)
        }

        if (result.type == 'error') {
            console.log(result.error);

        }
        // 
    }
}

export default handleSubmit

// export default (callback: Callback = undefined) => {
//     //
//     callback && callback({ loading: true })
//     //
//     return async ({ result }: Params) => {
//         //
//         console.log({ result });

//         if (result.type == 'failure' || result.type == "success") {
//             if (result.status == 401) return goto('/auth/login?msg=Silakan login kembali !')
//             callback && callback({ data: result.data, status: result.status })
//         }

//         if (result.type == 'error') {
//             console.log("Error:", result.error);

//         }

//         if (result.type == 'redirect') {
//             goto(result.location)
//         }
//     }
// }
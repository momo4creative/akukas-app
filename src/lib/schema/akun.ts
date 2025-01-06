import { z } from "zod";

export const akunSchema = z.object({
    kode: z.string().min(4, 'Wajib diisi !').pipe(z.coerce.number()),
    uraian: z.string().min(2, 'Minimal 2 karakter !'),
    batas: z.string().optional().pipe(z.coerce.number()),
})
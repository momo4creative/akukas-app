import { z } from "zod";
import { idSchema } from "./id";

export const transaksiCreateSchema = z.object({
    akun_id0: z.string().uuid(),
    akun_id1: z.string().uuid(),
    tanggal: z.string().pipe(z.coerce.date()),
    kode: z.string().min(1, 'Wajib diisi !').trim(),
    uraian: z.string().min(1, 'Wajib diisi !').trim(),
    nilai: z.string().min(1, 'Wajib diisi !').pipe(z.coerce.number()),
})

export const transaksiUpdateSchema = transaksiCreateSchema.merge(idSchema)

export const transform = <T extends Record<string, any>>(v: T) => {
    const { akun_id0, akun_id1, ...rest } = v
    let data = []
    data.push({
        ...rest,
        akun_id: akun_id0,
        nilai: -rest.nilai
    })
    data.push({
        ...rest,
        akun_id: akun_id1,
    })

    return data as unknown as Transaksi[]
}
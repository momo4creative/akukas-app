import type { TypeZodError } from "$lib/schema/parce-zod"

export const akunState: {
    loading?: boolean
    error?: TypeZodError
    result?: DbRead<SummaryAkun[]>
} = $state({})

export const transaksiState: {
    loading?: boolean
    error?: TypeZodError
    result?: DbRead<SummaryTransaksi[]>
} = $state({})
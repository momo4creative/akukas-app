import { PRIVATE_GS_URL } from "$env/static/private"
import type { TypeZodError } from "$lib/schema/parce-zod"
import { error } from "@sveltejs/kit"
import { App } from "./App"
import { Auth } from "./Auth"

type ReturnFetching<T> = {
    success: false
    error: TypeZodError
} | {
    success: true
    result: T
}

export class Database {
    params: DbParameters
    session?: string
    auth: Auth<User>
    akun: App<Akun, SummaryAkun>
    transaksi: App<Transaksi, SummaryTransaksi>

    constructor() {
        this.params = {}
        this.auth = new Auth(this)
        this.akun = new App('akun', this)
        this.transaksi = new App('transaksi', this)
    }

    async fetching<T>(): Promise<ReturnFetching<T>> {
        const t = new Date().getMinutes().toString()
        const query = { ...this.params, session: this.session }
        // console.log("Fetch:", t, JSON.stringify(query, null, 2));

        const time = new Date().getTime()
        const respon = await fetch(PRIVATE_GS_URL + "?q=" + JSON.stringify(query) + "&t=" + time)
        if (!respon.ok) return {
            success: false,
            error: {
                message: "Gagal fetch !",
                status: 500
            }
        }
        const [result, err] = await respon.json() as [T, TypeZodError | null]
        if (err) {
            return { success: false, error: err }
        }
        return { success: true, result }

    }
}

const db = new Database()
export default db
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import parceZod from '$lib/schema/parce-zod';
import { fail } from '@sveltejs/kit';
import db from '$lib/server/db';
import { transaksiCreateSchema, transaksiUpdateSchema, transform } from '$lib/schema/transaksi';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    create: async ({ request }) => {
        const form = await parceZod(request, transaksiCreateSchema)
        if (form.error) return fail(form.error.status, form.error)

        const data = transform(form.data)
        console.log({ data });

        const res = await db.transaksi.create(data)
        if (!res.success) {
            return fail(res.error.status ?? 400, { ...res.error })
        }
        return { data: res.result }
    },

    update: async ({ request }) => {
        const form = await parceZod(request, transaksiUpdateSchema)
        if (form.error) return fail(form.error.status, form.error)

        const data = transform(form.data)
        const res = await db.transaksi.update(data)
        if (!res.success) {
            return fail(res.error.status ?? 400, { ...res.error })
        }
        return { data: res.result }
    },

    delete: async ({ url }) => {
        const id = url.searchParams.getAll('id')
        if (!id) return fail(400, { message: "Id is required !" })

        const res = await db.transaksi.delete(id)
        if (!res.success) {
            return fail(res.error.status ?? 400, { ...res.error })
        }
        return { data: res.result }
    },
} satisfies Actions
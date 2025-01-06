import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import parceZod from '$lib/schema/parce-zod';
import { fail } from '@sveltejs/kit';
import { akunSchema } from '$lib/schema/akun';
import { idSchema } from '$lib/schema/id';
import db from '$lib/server/db';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;


export const actions = {
    create: async ({ request }) => {
        await new Promise(r => setTimeout(r, 3000))
        const form = await parceZod(request, akunSchema)
        if (form.error) return fail(form.error.status, form.error)

        const res = await db.akun.create([form.data])
        if (!res.success) {
            return fail(res.error.status ?? 400, { ...res.error })
        }
        return res.result[0]
    },

    update: async ({ request }) => {
        await new Promise(r => setTimeout(r, 3000))

        const form = await parceZod(request, akunSchema.merge(idSchema))
        if (form.error) return fail(form.error.status, form.error)

        const res = await db.akun.update([form.data])
        if (!res.success) {
            return fail(res.error.status ?? 400, { ...res.error })
        }
        return res.result[0]
    },

    delete: async ({ url }) => {
        await new Promise(r => setTimeout(r, 3000))

        const id = url.searchParams.getAll('id')
        if (!id) return fail(400, { message: "Id is required !" })

        const res = await db.akun.delete(id)
        if (!res.success) {
            return fail(res.error.status ?? 400, { ...res.error })
        }
        return { id }
    },
} satisfies Actions
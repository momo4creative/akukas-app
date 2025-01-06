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
        const form = await parceZod(request, akunSchema)
        if (form.error) return fail(form.error.status, form.error)

        const res = await db.akun.create([form.data])
        if (!res.success) {
            return fail(res.error.status ?? 400, { ...res.error })
        }
        return res.result[0]
    },

    update: async ({ request }) => {
        const form = await parceZod(request, akunSchema.merge(idSchema))
        if (form.error) return fail(form.error.status, form.error)

        const res = await db.akun.update([form.data])
        if (!res.success) {
            return fail(res.error.status ?? 400, { ...res.error })
        }
        return res.result[0]
    },

    delete: async ({ url }) => {
        const id = url.searchParams.getAll('id')
        if (!id) return fail(400, { message: "Id is required !" })

        const res = await db.akun.delete(id)
        if (!res.success) {
            return fail(res.error.status ?? 400, { ...res.error })
        }
        return { data: res.result }
    },
} satisfies Actions
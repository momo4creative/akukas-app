import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import parceZod from '$lib/schema/parce-zod';
import { loginSchema, registerSchema } from '$lib/schema/auth';
import { hash, jwt } from '$lib/server/secure';
import db from '$lib/server/db';

export const load = (async ({ url, cookies }) => {
    const logout = url.searchParams.has('logout')
    if (logout) {
        cookies.delete('sessionId', { path: '/' })
        db.auth.logout()
        return redirect(307, '/auth/login?msg=Anda udah logout. Silakan login kembali !')
    }
    return {};
}) satisfies PageServerLoad;


export const actions = {
    login: async ({ request, cookies }) => {
        const form = await parceZod(request, loginSchema)
        if (form.error) return fail(form.error.status, form.error)

        const { username: usernameX, password } = form.data

        // check user
        const user = await db.auth.login(usernameX)
        if (!user.success) {
            return fail(user.error.status ?? 400, { ...user.error })
        }

        // check password
        const { password: hashPassword, username, session } = user.result
        const validPassword = hash.isValid(password, hashPassword)
        if (!validPassword)
            return fail(400, {
                message: "Periksa username dan password !",
                errors: undefined
            })

        db.session = session
        const token = jwt.get({ username, session })
        cookies.set('sessionId', token, { path: '/', maxAge: 60 * 60 * 24 * 5 })

        return redirect(303, '/?msg=Berhasil login')
    },

    register: async ({ request }) => {
        const form = await parceZod(request, registerSchema)
        if (form.error) return fail(form.error.status, form.error)

        const { username } = form.data
        const password = hash.get(form.data.password)

        const user = await db.auth.register({ username, password })
        if (!user.success) {
            return fail(user.error.status ?? 400, { ...user.error })
        }

        return redirect(303, '/auth/login?msg=Berhasil register. Silakan login !')
    },
} satisfies Actions
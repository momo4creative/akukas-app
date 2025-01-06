import db from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { user }, depends }) => {
    depends("app:layout")
    return {
        user,
        promise_summary_akun: db.akun.summary({
            akun: {
                _sort: { kode: 'asc' }
            },
            transaksi: {
                _select: ['kode', 'uraian', 'nilai'],
                _sort: { created_at: 'desc' },
                _order: [0, 5]
            }
        }),
        promise_summary_transaksi: db.transaksi.summary({
            transaksi: {
                _sort: { created_at: 'desc' },
                _order: [0, 10]
            },
            akun: {
                _select: ['kode', 'uraian']
            }
        })
    };
}) satisfies LayoutServerLoad;

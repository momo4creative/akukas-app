import db from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { user }, depends, url }) => {
    depends("app:layout")

    const monthNow = url.searchParams.get('bulan') ?? new Date().getMonth() + 1
    const yearNow = url.searchParams.get('bulan') ?? new Date().getFullYear()

    return {
        user,
        promise_summary_akun: db.akun.summary({
            akun: {
                _sort: { kode: 'asc' }
            },
            transaksi: {
                _select: ['kode', 'uraian', 'nilai'],
                _sort: { created_at: 'desc' },
                _order: [0, 5],
                _date: {
                    name: 'tanggal',
                    month: Number(monthNow),
                    year: Number(yearNow),
                }
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
        }),

        promise_count_transaksi: db.transaksi.count()
    };
}) satisfies LayoutServerLoad;

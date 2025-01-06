<script lang="ts">
	import Input from '@ui/input/input.svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import Rupiah from '@ui/input/rupiah.svelte';
	import type { TypeZodError } from '$lib/schema/parce-zod';
	import type { transaksiCreateSchema } from '$lib/schema/transaksi';
	import Select from '@ui/input/select.svelte';
	import { formatDateInput } from '$lib/utils/format';
	import { akunState, transaksiState } from '$lib/share/summary.svelte';

	interface Props extends HTMLBaseAttributes {
		errors?: TypeZodError<typeof transaksiCreateSchema>['errors'];
		values?: Transaksi[];
	}
	let { values, errors }: Props = $props();

	let tanggal = $state(formatDateInput(values?.[0].tanggal ?? new Date()));
	let noUrutTransaksi = $derived(!transaksiState.result ? 1 : transaksiState.result.count / 2 + 1);
	const kode = $derived(
		'T' + Number(tanggal.toString().replaceAll('-', '')) * 1000 + noUrutTransaksi
	);

	const optionsAkun = $derived(
		akunState.result?.data.map((d) => {
			return [d.kode + ' - ' + d.uraian, d.id];
		})
	);

	const positip = $state(values && values[0].nilai > 0);
</script>

<div class="grid gap-2">
	<input type="hidden" name="id" value={values?.[0].id} />
	<Input bind:value={tanggal} errors={errors?.tanggal} name="tanggal" label="Tanggal" type="date" />
	<Select
		value={values?.[positip ? 1 : 0].akun_id}
		errors={errors?.akun_id0}
		name="akun_id0"
		label="Debit"
		options={optionsAkun}
	/>
	<Select
		value={values?.[positip ? 0 : 1].akun_id}
		errors={errors?.akun_id1}
		name="akun_id1"
		label="Kredit"
		options={optionsAkun}
	/>
	<Input value={values?.[0].kode ?? kode} errors={errors?.kode} name="kode" label="Kode" readonly />
	<Input value={values?.[0].uraian} errors={errors?.uraian} name="uraian" label="Uraian" />
	<Rupiah
		value={values?.[positip ? 0 : 1].nilai}
		errors={errors?.nilai}
		name="nilai"
		label="Nilai"
	/>
</div>

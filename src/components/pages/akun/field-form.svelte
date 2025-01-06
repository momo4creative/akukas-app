<script lang="ts">
	import type { akunSchema } from '$lib/schema/akun';
	import Input from '@ui/input/input.svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import Rupiah from '@ui/input/rupiah.svelte';
	import type { TypeZodError } from '$lib/schema/parce-zod';

	interface Props extends HTMLBaseAttributes {
		errors?: TypeZodError<typeof akunSchema>['errors'];
		values?: Akun;
	}
	let { values, errors }: Props = $props();
</script>

<div class="grid gap-2">
	<input type="hidden" name="id" value={values?.id} />
	<Input value={values?.kode} errors={errors?.kode} name="kode" label="Kode" type="number" />
	<Input value={values?.uraian} errors={errors?.uraian} name="uraian" label="Uraian" />
	<Rupiah value={values?.batas} errors={errors?.batas} name="batas" label="Batas Anggaran" />
</div>

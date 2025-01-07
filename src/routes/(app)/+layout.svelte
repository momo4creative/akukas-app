<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Nav from '@pages/layout/nav.svelte';
	import Profile from '@pages/layout/profile.svelte';
	import { akunState, countTransaksi } from '$lib/share/summary.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	akunState.loading = true;

	$effect(() => {
		data.promise_summary_akun
			.then((res) => {
				akunState.loading = false;

				if (!res.success) {
					akunState.error = res.error;
					return;
				}
				akunState.result = res.result;
			})
			.catch((e) => {
				akunState.error = e;
			});

		data.promise_count_transaksi.then((res) => {
			if (res.success) countTransaksi.value = res.result;
		});
	});
</script>

<Nav class="my-2 px-4" />

<Profile name={data.user?.username} class="my-2 px-4" />

{@render children()}

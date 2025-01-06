<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Nav from '@pages/layout/nav.svelte';
	import Profile from '@pages/layout/profile.svelte';
	import { akunState } from '$lib/share/summary.svelte';

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
	});
</script>

<Nav class="m-2" />

<Profile name={data.user?.username} class="m-2" />

{@render children()}

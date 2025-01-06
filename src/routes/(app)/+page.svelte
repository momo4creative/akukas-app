<script lang="ts">
	import ListSummaryAkun from '@pages/beranda/list-summary-akun.svelte';
	import type { PageData } from './$types';
	import { akunState } from '$lib/share/summary.svelte';
	import LoadingData from '@ui/loading/loading-data.svelte';
	import FlashMessage from '@ui/message/flash-message.svelte';

	let { data }: { data: PageData } = $props();
</script>

<LoadingData loading={akunState.loading} />
<FlashMessage error={akunState.error} />

{#if akunState.result?.data}
	<ListSummaryAkun
		title="Biaya"
		values={akunState.result?.data.filter((d) => d.kode.toString().startsWith('5'))}
	/>

	<hr class="my-4 border-gray-700" />

	<ListSummaryAkun
		title="Kas Lain"
		values={akunState.result?.data.filter((d) => !d.kode.toString().startsWith('5'))}
	/>
{/if}

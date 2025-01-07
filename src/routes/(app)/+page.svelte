<script lang="ts">
	import ListSummaryAkun from '@pages/beranda/list-summary-akun.svelte';
	import type { PageData } from './$types';
	import { akunState } from '$lib/share/summary.svelte';
	import LoadAndMessage from '@pages/layout/load-and-message.svelte';
	import ModalAdd from '@pages/transaksi/modal-add.svelte';
	import Button from '@ui/button/button.svelte';

	let { data }: { data: PageData } = $props();
</script>

<ModalAdd>
	{#snippet snippetChild(openModal)}
		<div class="px-4">
			<Button onclick={openModal} icon="plus-thick" class="w-full">Transaksi Baru</Button>
		</div>
	{/snippet}
</ModalAdd>

<LoadAndMessage loading={akunState.loading} error={akunState.error} />

{#if akunState.result?.data}
	<ListSummaryAkun
		title="Biaya"
		values={akunState.result?.data.filter((d) => d.kode.toString().startsWith('5'))}
	/>

	<hr class="my-4 border-gray-700" />

	<ListSummaryAkun
		title="Kas"
		values={akunState.result?.data.filter((d) => d.kode.toString().startsWith('1'))}
	/>

	<hr class="my-4 border-gray-700" />

	<ListSummaryAkun
		title="Modal"
		values={akunState.result?.data.filter((d) => d.kode.toString().startsWith('3'))}
	/>
{/if}

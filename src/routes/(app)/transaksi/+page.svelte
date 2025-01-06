<script lang="ts">
	import List from '@pages/transaksi/list.svelte';
	import type { PageData } from './$types';
	import ModalEdit from '@pages/transaksi/modal-edit.svelte';
	import ModalDelete from '@pages/transaksi/modal-delete.svelte';
	import ModalAdd from '@pages/transaksi/modal-add.svelte';
	import { invalidate } from '$app/navigation';
	import { transaksiState } from '$lib/share/summary.svelte';
	import FlashMessage from '@ui/message/flash-message.svelte';
	import LoadingData from '@ui/loading/loading-data.svelte';

	let { data }: { data: PageData } = $props();

	let isEdit = $state<{ value: boolean; data?: Transaksi[] }>({ value: false });
	let isDelete = $state<{ value: boolean; data?: Transaksi[] }>({ value: false });

	transaksiState.loading = true;

	$effect(() => {
		data.promise_summary_transaksi.then((res) => {
			transaksiState.loading = false;

			if (!res.success) {
				transaksiState.error = res.error;
				return;
			}
			transaksiState.result = res.result;
		});
	});
</script>

<header class="m-4 flex justify-between">
	<h1 class="text-4xl">Transaksi</h1>
	<ModalAdd onSuccess={() => invalidate('app:layout')} />
</header>

<LoadingData loading={transaksiState.loading} />
<FlashMessage message={transaksiState.error?.message} success={!!transaksiState.error} />

{#if transaksiState.result?.data}
	<List
		values={transaksiState.result.data}
		onEdit={(v) => (isEdit = { value: true, data: v })}
		onDelete={(v) => (isDelete = { value: true, data: v })}
	/>
{/if}

<ModalDelete
	bind:open={isDelete.value}
	action="/transaksi?/delete&id={isDelete.data?.[0].id}&id={isDelete.data?.[1].id}"
	onSuccess={() => invalidate('app:layout')}
/>
<ModalEdit
	values={isEdit.data}
	bind:open={isEdit.value}
	onSuccess={() => invalidate('app:layout')}
/>

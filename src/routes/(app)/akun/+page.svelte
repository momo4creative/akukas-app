<script lang="ts">
	import ModalAdd from '@pages/akun/modal-add.svelte';
	import List from '@pages/akun/list.svelte';
	import ModalEdit from '@pages/akun/modal-edit.svelte';
	import { invalidate } from '$app/navigation';
	import { akunState } from '$lib/share/summary.svelte';
	import LoadingData from '@ui/loading/loading-data.svelte';
	import FlashMessage from '@ui/message/flash-message.svelte';
	import ModalDelete from '@pages/layout/modal-delete.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let isEdit = $state<{ value: boolean; data?: Akun }>({ value: false });
	let isDelete = $state<{ value: boolean; data?: Akun }>({ value: false });
</script>

<header class="m-4 flex justify-between">
	<h1 class="text-4xl">Akun</h1>
	<ModalAdd onSuccess={() => invalidate('app:layout')} />
</header>

<LoadingData loading={akunState.loading} />
{#if akunState.error}
	<FlashMessage message={akunState.error?.message} />
{/if}

{#if akunState.result?.data}
	<List
		onEdit={(v) => (isEdit = { value: true, data: v })}
		onDelete={(v) => (isDelete = { value: true, data: v })}
		values={akunState.result.data}
	/>
{/if}

<ModalDelete
	bind:open={isDelete.value}
	title="Hapus akun"
	action="/akun?/delete&id={isDelete.data?.id}"
	onSuccess={() => invalidate('app:layout')}
/>
<ModalEdit
	values={isEdit.data}
	bind:open={isEdit.value}
	onSuccess={() => invalidate('app:layout')}
/>

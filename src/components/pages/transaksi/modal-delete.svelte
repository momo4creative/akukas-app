<script lang="ts">
	import { enhance } from '$app/forms';
	import submitHandle, { type CallbackSubmit } from '$lib/utils/submit-handle';
	import Button from '@ui/button/button.svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import { scale } from 'svelte/transition';

	interface Props extends HTMLFormAttributes {
		open?: boolean;
		onSuccess?: () => void;
	}
	let { open = $bindable(), onSuccess, ...props }: Props = $props();

	const title = 'Hapus transaksi';
	const callback: CallbackSubmit = {
		loading: (val) => {
			if (val) {
				open = false;
			}
		},
		result: (val) => {
			if (val.success) return onSuccess?.();
		}
	};
</script>

{#if open}
	<div transition:scale class="fixed inset-0 z-40 flex flex-col bg-black/20 px-4 py-12">
		<form
			action=""
			method="post"
			{...props}
			use:enhance={() => submitHandle(title, callback)}
			class="grid gap-6 rounded-md bg-slate-800 p-4"
		>
			<h1 class="text-center text-2xl font-bold">Apakah yakin menghapus ?</h1>

			<footer class="flex items-center justify-center gap-3">
				<Button icon="check-thick" type="submit">Ya</Button>
				<Button onclick={() => (open = false)} color="red" icon="close-thick">Tidak</Button>
			</footer>
		</form>
	</div>
{/if}

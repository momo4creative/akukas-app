<script lang="ts">
	import Button from '@ui/button/button.svelte';
	import Modal from '@ui/modal/modal.svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import FieldForm from './field-form.svelte';
	import { enhance } from '$app/forms';
	import submitHandle, { type CallbackSubmit } from '$lib/utils/submit-handle';
	import type { TypeZodError } from '$lib/schema/parce-zod';
	import FlashMessage from '@ui/message/flash-message.svelte';
	import type { transaksiUpdateSchema } from '$lib/schema/transaksi';

	interface Props extends HTMLBaseAttributes {
		values?: Transaksi[];
		open?: boolean;
		onSuccess?: (arg: Transaksi[]) => void;
	}
	let { values, open = $bindable(), onSuccess }: Props = $props();

	function closeModal() {
		error = undefined;
		open = false;
	}

	let error = $state<TypeZodError<typeof transaksiUpdateSchema>>();
	const title = 'Ubah transaksi';
	const callback: CallbackSubmit<{ data: Transaksi[] }> = {
		loading: (val) => {
			if (val) {
				open = false;
			}
		},
		result: (val) => {
			if (!val.success) {
				error = val.error;
				open = true;
				return;
			}
			onSuccess?.(val.data.data);
		}
	};
</script>

<Modal bind:open>
	<form
		action="/transaksi?/update"
		method="post"
		class="grid gap-4 p-4"
		use:enhance={() => submitHandle(title, callback)}
	>
		<h1 class="text-2xl font-medium">Ubah Transaksi</h1>

		{#if error}
			<FlashMessage {error} />
		{/if}

		<FieldForm errors={error?.errors} {values} />

		<footer class="grid gap-2">
			<Button icon="send" type="submit">Ubah</Button>
			<Button icon="square" color="yellow" type="reset">Reset</Button>
			<Button onclick={() => (open = false)} icon="arrow-left" color="red">Batal</Button>
		</footer>
	</form>
</Modal>

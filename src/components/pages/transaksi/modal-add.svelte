<script lang="ts">
	import Button from '@ui/button/button.svelte';
	import Modal from '@ui/modal/modal.svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import FieldForm from './field-form.svelte';
	import { enhance } from '$app/forms';
	import submitHandle, { type CallbackSubmit } from '$lib/utils/submit-handle';
	import FlashMessage from '@ui/message/flash-message.svelte';
	import type { TypeZodError } from '$lib/schema/parce-zod';
	import type { transaksiCreateSchema } from '$lib/schema/transaksi';

	interface Props extends HTMLBaseAttributes {
		onSuccess?: (arg: Transaksi[]) => void;
	}
	let { onSuccess }: Props = $props();

	let isOpen = $state<boolean>(false);
	let error = $state<TypeZodError<typeof transaksiCreateSchema>>();

	function closeModal() {
		error = undefined;
		isOpen = false;
	}

	const title = 'Buat transaksi baru';
	const callback: CallbackSubmit<{ data: Transaksi[] }, typeof transaksiCreateSchema> = {
		loading: (val) => {
			if (val) {
				isOpen = false;
			}
		},
		result: (val) => {
			if (!val.success) {
				error = val.error;
				isOpen = true;
				return;
			}
			onSuccess?.(val.data.data);
		}
	};
</script>

<Button onclick={() => (isOpen = true)} icon="plus-thick">Buat</Button>

<Modal bind:open={isOpen}>
	<form
		action="/transaksi?/create"
		method="post"
		class="grid gap-4 p-4"
		use:enhance={() => submitHandle(title, callback)}
	>
		<h1 class="text-2xl font-medium">Buat Transaksi Baru</h1>

		{#if error}
			<FlashMessage {error} />
		{/if}

		<FieldForm errors={error?.errors} />

		<footer class="grid gap-2">
			<Button icon="send" type="submit">Buat</Button>
			<Button icon="square" color="yellow" type="reset">Reset</Button>
			<Button onclick={closeModal} icon="arrow-left" color="red">Batal</Button>
		</footer>
	</form>
</Modal>

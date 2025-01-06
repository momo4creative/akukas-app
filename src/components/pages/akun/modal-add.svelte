<script lang="ts">
	import Button from '@ui/button/button.svelte';
	import Modal from '@ui/modal/modal.svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import FieldForm from './field-form.svelte';
	import { enhance } from '$app/forms';
	import submitHandle, { type CallbackSubmit } from '$lib/utils/submit-handle';
	import type { akunSchema } from '$lib/schema/akun';
	import FlashMessage from '@ui/message/flash-message.svelte';
	import type { TypeZodError } from '$lib/schema/parce-zod';

	interface Props extends HTMLBaseAttributes {
		onSuccess?: (arg: Akun) => void;
	}
	let { onSuccess }: Props = $props();

	let isOpen = $state<boolean>(false);
	let error = $state<TypeZodError<typeof akunSchema>>();

	const title = 'buat akun baru';
	const callback: CallbackSubmit<Akun, typeof akunSchema> = {
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
			onSuccess?.(val.data);
		}
	};
</script>

<Button onclick={() => (isOpen = true)} icon="plus-thick">Buat</Button>

<Modal bind:open={isOpen}>
	<form
		action="/akun?/create"
		method="post"
		class="grid gap-4 p-4"
		use:enhance={() => submitHandle(title, callback)}
	>
		<h1 class="text-2xl font-medium">Buat Akun Baru</h1>

		<FlashMessage message={error?.message} />

		<FieldForm errors={error?.errors} />

		<footer class="grid gap-2">
			<Button icon="send" type="submit">Buat</Button>
			<Button icon="square" color="yellow" type="reset">Reset</Button>
			<Button onclick={() => (isOpen = false)} icon="arrow-left" color="red">Batal</Button>
		</footer>
	</form>
</Modal>

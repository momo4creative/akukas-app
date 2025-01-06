<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import type { registerSchema } from '$lib/schema/auth';
	import type { TypeZodError } from '$lib/schema/parce-zod';
	import { toast } from '$lib/stores/toast';
	import submitHandle, { type CallbackSubmit } from '$lib/utils/submit-handle';
	import Button from '@ui/button/button.svelte';
	import Input from '@ui/input/input.svelte';
	import FlashMessage from '@ui/message/flash-message.svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';

	interface Props extends HTMLFormAttributes {
		onSubmit: () => void;
		isLogin?: boolean;
		error?: TypeZodError<typeof registerSchema>;
		isLoading?: boolean;
	}
	let { onSubmit, error, isLogin, isLoading, ...props }: Props = $props();
	const title = isLogin ? 'login' : 'register';

	const callback: CallbackSubmit<User> = {
		loading: (val) => {
			isLoading = val;
		},
		result: (val) => {
			if (!val.success) {
				error = val.error;
				return;
			}
		}
	};
</script>

<form
	action="/auth?/{isLogin ? 'login' : 'register'}"
	method="post"
	{...props}
	use:enhance={() => submitHandle(title, callback)}
	class="grid gap-6 px-4 py-8"
>
	<h1 class="text-center text-4xl font-bold tracking-wider">{isLogin ? 'Login' : 'Register'}</h1>

	<FlashMessage message={error?.message} />

	<div class="grid gap-2">
		<Input
			errors={error?.errors?.username}
			icon="user"
			name="username"
			label="Username"
			autocomplete="username"
		/>
		<Input
			errors={error?.errors?.password}
			icon="key"
			name="password"
			label="Password"
			type="password"
		/>
		{#if !isLogin}
			<Input
				errors={error?.errors?.confirmPassword}
				icon="key"
				name="confirmPassword"
				label="Confirm Password"
				type="password"
			/>
		{/if}
	</div>

	<Button {isLoading} icon="send" type="submit">{isLogin ? 'Login' : 'Register'}</Button>

	<a href="/auth/{isLogin ? 'register' : 'login'}" class="text-center"
		>{isLogin ? 'Register' : 'Login'} here !</a
	>
</form>

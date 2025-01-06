<script lang="ts">
	import { goto } from '$app/navigation';
	import type { TypeZodError } from '$lib/schema/parce-zod';
	import cn from '$lib/utils/cn';
	import { onDestroy } from 'svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface Props extends HTMLBaseAttributes {
		message?: string;
		success?: boolean;
		error?: TypeZodError;
	}
	let { message, success, error }: Props = $props();

	if (error) {
		if (error?.status == 401) goto('/auth/login?msg=Session habis. Silakan login !');
		message = error.message;
		success = false;
	}
</script>

<div
	class={cn('m-4 rounded bg-red-700 py-2 text-red-100', {
		'bg-green-700 text-green-100': success
	})}
>
	<span class="px-4">{message}</span>
</div>

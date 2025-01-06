<script lang="ts">
	import cn from '$lib/utils/cn';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface Props extends HTMLBaseAttributes {
		message?: string;
		success?: boolean;
	}
	let { message, success, ...props }: Props = $props();
</script>

{#if message}
	<div
		class={cn('rounded bg-red-700 py-2 text-red-100', { 'bg-green-700 text-green-100': success })}
	>
		<span class="px-4">{message}</span>
	</div>
{/if}

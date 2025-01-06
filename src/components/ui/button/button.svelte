<script lang="ts">
	import Icon from '@iconify/svelte';
	import cn from '$lib/utils/cn';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Spinner from '@ui/loading/spinner.svelte';

	interface Props extends HTMLButtonAttributes {
		icon?: string;
		isLoading?: boolean;
		color?: 'blue' | 'red' | 'yellow';
	}
	let { icon, isLoading, children, color = 'blue', ...props }: Props = $props();
</script>

{#snippet main()}
	{#if icon}
		<Icon icon="mdi:{icon}" class="" />
	{/if}

	{#if children}
		<span class="flex-1 px-2">{@render children()}</span>
	{/if}
{/snippet}

<button
	type="button"
	disabled={isLoading}
	{...props}
	class={cn(
		'relative rounded font-medium tracking-wide',
		'inline-flex min-h-9 items-center px-3',
		'text-white',
		'outline-2 outline-offset-2',
		'focus:outline',
		{
			'bg-blue-700 outline-blue-700': color == 'blue',
			'bg-yellow-600 outline-yellow-700': color == 'yellow',
			'bg-red-700 outline-red-700': color == 'red'
		},
		props.class
	)}
>
	{@render main()}

	{#if isLoading}
		<Spinner />
	{/if}
</button>

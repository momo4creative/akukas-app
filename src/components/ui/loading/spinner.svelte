<script lang="ts">
	import cn from '$lib/utils/cn';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { scale } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		size?: number;
	}
	let { size = 1, ...props }: Props = $props();
</script>

<div
	style="zoom: {size};"
	class={cn(
		'absolute inset-0 z-10 flex max-h-dvh items-center justify-center bg-black/50',
		props.class
	)}
>
	<div transition:scale={{ delay: 500 }} class="relative flex items-center justify-center p-1">
		<span
			style="animation-timing-function: ease-in-out;aspect-ratio: 1/1;"
			class="h-7 animate-spin rounded-full border-4 border-b-transparent border-t-transparent"
		></span>
	</div>
</div>

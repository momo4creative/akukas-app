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
	transition:scale={{ delay: 500 }}
	style="zoom: {size};"
	class={cn('relative inline-flex items-center justify-center p-1', props.class)}
>
	<span
		style="animation-timing-function: ease-in-out;aspect-ratio: 1/1;"
		class="absolute h-7 animate-spin rounded-full border-4 border-slate-500 border-b-transparent border-t-transparent"
	></span>
	<span
		style="animation-timing-function: ease-in-out;aspect-ratio: 1/1; animation-direction: reverse;"
		class="absolute h-5 animate-spin rounded-full border-4 border-slate-400 border-b-transparent border-t-transparent"
	></span>
</div>

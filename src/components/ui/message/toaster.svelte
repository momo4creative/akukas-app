<script lang="ts">
	import { toast } from '$lib/stores/toast';
	import cn from '$lib/utils/cn';
	import Icon from '@iconify/svelte';
	import Spinner from '@ui/loading/spinner.svelte';
	import { flip } from 'svelte/animate';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {}
	let {}: Props = $props();
</script>

<ul class="fixed inset-x-0 top-0 flex flex-col items-center px-4">
	{#each $toast as { type, message, id }, i (id)}
		<li
			animate:flip
			in:fly={{ y: -20, opacity: 0 }}
			out:fly={{ y: 20, opacity: 0 }}
			class={cn('relative my-3 flex items-center rounded bg-slate-700 px-2 py-1 shadow', {
				'bg-red-700': type == 'error',
				'bg-green-700': type == 'success'
			})}
		>
			{#if type == 'load'}
				<Spinner class="relative h-6 w-6 rounded-full" />
			{:else}
				<span class="rounded-full bg-black/20 p-1">
					<Icon icon="mdi:{type == 'error' ? 'close-thick' : 'check-thick'}" width="18" />
				</span>
			{/if}
			<span class="px-2 font-medium">{message}</span>
		</li>
	{/each}
</ul>

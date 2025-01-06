<script lang="ts">
	import Icon from '@iconify/svelte';
	import cn from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import MsgError from './msg-error.svelte';

	interface Props extends HTMLInputAttributes {
		label: string;
		icon?: string;
		errors?: string[];
		options?: string[][];
	}
	let { label, options, errors, icon, value = $bindable(), ...props }: Props = $props();

	let open = $state(false);
	let tempValue = $state(!value ? undefined : options?.filter(([_, v]) => v == value)?.[0][0]);
</script>

{#snippet opts()}
	<div
		transition:fly={{ y: -20, opacity: 0 }}
		class="absolute inset-x-0 top-full z-10 mt-1 grid max-h-40 divide-y divide-black overflow-y-auto overflow-x-hidden rounded-md border border-slate-500 shadow"
	>
		{#each options ?? [] as [label, val]}
			<button
				onclick={() => {
					tempValue = label;
					value = val;
				}}
				type="button"
				class={cn('bg-slate-800 px-4 py-2 text-left hover:bg-slate-700', {
					'bg-slate-600': val == value
				})}>{label}</button
			>
		{/each}
	</div>
{/snippet}

<label class="grid">
	<span class="mb-1 font-medium">{label}</span>
	<div class="relative flex items-center">
		{#if icon}
			<Icon icon="mdi:{icon}" class="absolute mx-2" />
		{/if}
		<input
			type="text"
			{...props}
			onclick={() => ((open = !open), (errors = undefined))}
			onblur={() => setTimeout(() => (open = false), 200)}
			name="_"
			value={tempValue ?? 'Pilih !'}
			readonly
			spellcheck="false"
			class={cn(
				'cursor-pointer rounded',
				'block min-h-9 w-full px-2',
				'bg-gray-800',
				'focus:outline focus:outline-offset-2 focus:outline-blue-700',
				{
					'ps-8': !!icon
				}
			)}
		/>
		{#if open}
			{@render opts()}
		{/if}
	</div>
	<MsgError {errors} />
</label>
<input type="text" name={props.name} {value} hidden />

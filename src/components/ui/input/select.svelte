<script lang="ts">
	import Icon from '@iconify/svelte';
	import cn from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';

	interface Props extends HTMLInputAttributes {
		label: string;
		icon?: string;
		errors?: string[];
		options?: string[][];
	}
	let { label, options, errors, icon, value = $bindable(), ...props }: Props = $props();

	let open = $state(false);
	let tempValue = $state(value);
</script>

{#snippet opts()}
	<div
		transition:fly={{ y: -20, opacity: 0 }}
		class="absolute inset-x-0 top-full z-10 mt-1 grid max-h-40 divide-y divide-slate-600 overflow-y-auto overflow-x-hidden rounded-md border bg-slate-500 shadow"
	>
		{#each options ?? [] as [label, val]}
			<button
				onclick={() => {
					tempValue = label;
					value = val;
				}}
				type="button"
				class="px-4 py-2 text-left hover:bg-slate-600">{label}</button
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
			onclick={() => (open = !open)}
			onblur={() => setTimeout(() => (open = false), 200)}
			name="_"
			value={tempValue ?? 'Pilih !'}
			readonly
			spellcheck="false"
			class={cn('cursor-pointer rounded', 'block min-h-9 w-full px-2', 'bg-slate-700', {
				'ps-8': !!icon
			})}
		/>
		{#if open}
			{@render opts()}
		{/if}
	</div>
	<div class="text-red-500">{errors}</div>
</label>
<input type="text" name={props.name} {value} hidden />

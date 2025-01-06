<script lang="ts">
	import Icon from '@iconify/svelte';
	import cn from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label: string;
		icon?: string;
		errors?: string[];
	}
	let { label, errors, icon, value = $bindable(), ...props }: Props = $props();
</script>

<label class="grid">
	<span class="mb-1 font-medium">{label}</span>
	<div class="relative flex items-center">
		{#if icon}
			<Icon icon="mdi:{icon}" class="absolute mx-2" />
		{/if}
		<input
			type="text"
			bind:value
			{...props}
			spellcheck="false"
			class={cn('rounded', 'block min-h-9 w-full px-2', 'bg-slate-700', {
				'ps-8': !!icon
			})}
		/>
	</div>
	<div class="text-red-500">{errors}</div>
</label>

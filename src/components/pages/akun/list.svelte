<script lang="ts">
	import cn from '$lib/utils/cn';
	import { formatNumberToRupiah } from '$lib/utils/format';
	import Button from '@ui/button/button.svelte';
	import { flip } from 'svelte/animate';
	import type { HTMLHtmlAttributes } from 'svelte/elements';
	import { fade, fly } from 'svelte/transition';

	interface Props extends HTMLHtmlAttributes {
		values: SummaryAkun[];
		onEdit?: (arg: Akun) => void;
		onDelete?: (arg: Akun) => void;
	}
	let { values, onEdit, onDelete }: Props = $props();

	const temp = values;
	values = [];
	setTimeout(() => (values = temp), 100);
</script>

<ul class="space-y-0.5">
	{#each values as v, i (v)}
		<li animate:flip in:fade={{ delay: i * 200 }} out:fly={{ y: 50 }} class="bg-gray-900 px-4 py-2">
			<div class="float-right">
				<Button
					onclick={() => onEdit && onEdit(v)}
					color="yellow"
					icon="pencil"
					class="min-h-fit p-1.5"
				></Button>
				<Button
					onclick={() => onDelete && onDelete(v)}
					color="red"
					icon="trash"
					class="min-h-fit p-1.5"
				></Button>
			</div>

			<h1 class="text-xl font-medium">{v.kode} - {v.uraian}</h1>
			<div class={cn('text-gray-400', { 'opacity-50': !v.batas })}>
				{formatNumberToRupiah(v.batas ?? 0)}
			</div>
		</li>
	{/each}
</ul>

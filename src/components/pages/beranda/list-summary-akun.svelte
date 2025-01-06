<script lang="ts">
	import cn from '$lib/utils/cn';
	import { formatNumberToRupiah } from '$lib/utils/format';
	import Icon from '@iconify/svelte';
	import { flip } from 'svelte/animate';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fade, fly } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		values?: SummaryAkun[];
		title: string;
	}
	let { values, title }: Props = $props();

	let openTransaksi: number | null = $state(null);

	const handleClickDropdownTransaksi = (v: number) => {
		openTransaksi = openTransaksi === v ? null : v;
	};

	const temp = values;
	values = [];
	setTimeout(() => (values = temp), 100);
	// $inspect(openTransaksi);
</script>

{#snippet transaksi(values: Transaksi[])}
	<ul transition:fade class="divide-y divide-black text-gray-400">
		{#each values as t}
			<li class="flex gap-1 bg-slate-800 px-2 py-1">
				<span>{t.kode}</span>
				<span>{t.uraian}</span>
				<span class="ms-auto">{formatNumberToRupiah(t.nilai)}</span>
			</li>
		{/each}
	</ul>
{/snippet}

<h1 class="mx-4 my-2 text-2xl font-medium text-gray-400">{title}</h1>

<ul class="space-y-0.5">
	{#each values ?? [] as v, i (v.id)}
		<li animate:flip in:fade={{ delay: i * 200 }} out:fly={{ x: 50 }} class="bg-gray-900 px-4 py-2">
			<h1 class="text-xl font-medium">{v.kode} - {v.uraian}</h1>
			<div class="text-gray-400">
				<span class={cn({ 'text-red-500': v.nilai <= 0 })}
					>{formatNumberToRupiah(v.nilai ?? 0)}</span
				>
				{#if v.batas}
					<span>/</span>
					<span>{formatNumberToRupiah(v.batas)}</span>
				{/if}
			</div>

			<button
				onclick={() => handleClickDropdownTransaksi(i)}
				type="button"
				class="absolute -mt-2 flex w-full justify-center rounded-full"
			>
				<span
					class={cn('rounded-full border border-black bg-slate-800 p-1 transition-transform', {
						'rotate-180': openTransaksi == i
					})}
				>
					<Icon icon="mdi:chevron-down" />
				</span>
			</button>

			{#if openTransaksi == i}
				{@render transaksi(v.transaksi)}
			{/if}
		</li>
	{/each}
</ul>

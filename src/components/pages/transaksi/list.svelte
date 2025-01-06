<script lang="ts">
	import { formatDateIndo, formatNumberToRupiah } from '$lib/utils/format';
	import Icon from '@iconify/svelte';
	import Button from '@ui/button/button.svelte';
	import { flip } from 'svelte/animate';
	import type { HTMLHtmlAttributes } from 'svelte/elements';
	import { fade, fly } from 'svelte/transition';

	interface Props extends HTMLHtmlAttributes {
		values: SummaryTransaksi[];
		onEdit?: (arg: Transaksi[]) => void;
		onDelete?: (arg: Transaksi[]) => void;
	}
	let { onEdit, onDelete, values }: Props = $props();

	const positip = (data: SummaryTransaksi['data'], val: boolean) => {
		return data.filter((d) => (val ? d.nilai > 0 : d.nilai < 0))[0];
	};

	const temp = values;
	values = [];
	setTimeout(() => (values = temp), 100);
</script>

{#snippet action(v: Transaksi[])}
	<div class="float-right">
		<Button onclick={() => onEdit && onEdit(v)} color="yellow" icon="pencil" class="min-h-fit p-1.5"
		></Button>
		<Button onclick={() => onDelete && onDelete(v)} color="red" icon="trash" class="min-h-fit p-1.5"
		></Button>
	</div>
{/snippet}

<ul class="space-y-0.5">
	{#each values as { kode, data }, i (kode)}
		<li animate:flip in:fade={{ delay: i * 200 }} out:fly={{ y: 50 }} class="bg-gray-900 px-4 py-2">
			{@render action(data)}

			<div>
				<span class="text-gray-300">{kode}</span>
				<small class="text-gray-400">{formatDateIndo(positip(data, true).tanggal)}</small>
			</div>

			<div class="flex items-center gap-3">
				<h1 class="text-xl">{positip(data, true).uraian}</h1>
				<span class="ms-auto">{formatNumberToRupiah(positip(data, true).nilai)}</span>
			</div>
			<div class="flex items-center text-gray-400">
				<span>{positip(data, false).akun.kode}-{positip(data, false).akun.uraian}</span>
				<span class="pt-1"><Icon icon="mdi:chevron-double-right" /></span>
				<span>{positip(data, true).akun.kode}-{positip(data, true).akun.uraian}</span>
			</div>
		</li>
	{/each}
</ul>

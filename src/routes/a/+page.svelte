<script lang="ts">
	import { flip } from 'svelte/animate';
	import type { PageData } from './$types';
	import { fly } from 'svelte/transition';

	let { data }: { data: PageData } = $props();

	let initValues = $state([
		{ text: 'abc' },
		{ text: 'afaf' },
		{ text: 'akdogpkogk' },
		{ text: 'feftd' }
	]);

	let values: {
		text: string;
	}[] = $state([]);

	setTimeout(() => {
		values = initValues;
	}, 100);
</script>

<ul>
	{#each values as v, i (v)}
		<li animate:flip in:fly={{ y: -20, delay: i * 200 }} out:fly={{ x: 50 }}>{v.text}</li>
	{/each}
</ul>

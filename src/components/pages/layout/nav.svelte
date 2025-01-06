<script lang="ts">
	import cn from '$lib/utils/cn';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface Props extends HTMLBaseAttributes {}
	let { ...props }: Props = $props();

	type Menus = [string, string, boolean];
	const menus: Menus[] = [
		['Beranda', '/', true],
		['Akun', '/akun', false],
		['Transaksi', '/transaksi', false]
	];
</script>

<nav class={cn('flex gap-1', props.class)}>
	{#each menus as [label, href, active]}
		<a {href}>{label}</a>
	{/each}
</nav>

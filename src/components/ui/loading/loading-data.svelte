<script lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import Spinner from './spinner.svelte';
	import SpinAni from './spin-ani.svelte';
	import { scale } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		loading?: boolean;
	}
	let { loading }: Props = $props();
</script>

{#if loading}
	<div transition:scale class="absolute inset-x-0 z-10 grid justify-center gap-3 bg-black p-4">
		<SpinAni />
		<span class="text-gray-400">Loading..</span>
	</div>
{/if}

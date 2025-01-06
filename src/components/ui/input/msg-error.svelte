<script lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fade, fly } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		errors?: string[];
	}
	let { errors }: Props = $props();
</script>

{#if errors}
	<div transition:fly={{ y: -20 }} class="text-red-500">{errors.join(' ')}</div>
{/if}

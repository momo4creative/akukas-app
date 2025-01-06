<script lang="ts">
	import Spinner from '@ui/loading/spinner.svelte';
	import '../app.css';
	import Toaster from '@ui/message/toaster.svelte';
	import { navigating } from '$app/state';
	let { children } = $props();
</script>

<svelte:head>
	<title>AKUKAS-APP</title>
</svelte:head>

{@render children()}

{#if navigating.from}
	<Spinner class="bg-transparent" size={1.5} />
{/if}

<Toaster />

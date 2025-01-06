<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

{#snippet welcome()}
	<div class="flex flex-1 flex-col items-center justify-center">
		<h2 class="text-xl">Welcome</h2>
		<h1 class="text-4xl">AKUKAS APP</h1>
	</div>
{/snippet}

<div class="flex h-dvh flex-col justify-end">
	{@render welcome()}
	{@render children()}
</div>

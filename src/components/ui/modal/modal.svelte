<script lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fade, fly } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		open?: boolean;
	}
	let { open = $bindable(), children }: Props = $props();
</script>

{#if open}
	<div transition:fade class="fixed inset-0 z-40 bg-black/50">
		<div
			transition:fly={{ y: 100 }}
			class="absolute inset-x-0 bottom-0 max-h-[80%] overflow-y-auto bg-black"
		>
			{@render children?.()}
		</div>
	</div>
{/if}

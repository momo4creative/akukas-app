<script lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface Props extends HTMLBaseAttributes {}
	let { ...props }: Props = $props();
</script>

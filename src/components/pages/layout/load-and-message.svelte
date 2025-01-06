<script lang="ts">
	import type { TypeZodError } from '$lib/schema/parce-zod';
	import LoadingData from '@ui/loading/loading-data.svelte';
	import FlashMessage from '@ui/message/flash-message.svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface Props extends HTMLBaseAttributes {
		loading?: boolean;
		error?: TypeZodError;
	}
	let { loading, error }: Props = $props();
</script>

<LoadingData {loading} />
{#if error}
	<FlashMessage {error} />
{/if}

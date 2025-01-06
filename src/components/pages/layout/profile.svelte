<script lang="ts">
	import cn from '$lib/utils/cn';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface Props extends HTMLBaseAttributes {
		name?: string;
	}
	let { name, ...props }: Props = $props();
</script>

<div class={cn('', props.class)}>
	<span>{name ?? 'Guest'}</span>
	<a href="/auth?logout" class="text-red-500">Logout</a>
</div>

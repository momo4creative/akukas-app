<script lang="ts">
	import Form from '@pages/auth/form.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function onSubmit() {}
</script>

<Form {onSubmit} isLogin />

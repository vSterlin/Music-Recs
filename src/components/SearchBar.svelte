<script lang="ts">
	export let value = '';
</script>

<input
	type="text"
	placeholder="Search for a song..."
	class="input input-bordered input-primary w-full max-w-xs"
	bind:value
/>

<script lang="ts">
	export let isSelected = false;
	export let onSelect = () => {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="badge badge-lg"
	class:badge-outline={!isSelected}
	class:font-extralight={!isSelected}
	class:badge-primary={isSelected}
	on:click={onSelect}
>
	<slot />
</div>

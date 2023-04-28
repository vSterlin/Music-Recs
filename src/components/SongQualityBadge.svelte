<script lang="ts">
	export let selected = false;
</script>

<div
	class="badge badge-lg"
	class:badge-outline={!selected}
	class:font-extralight={!selected}
	class:badge-primary={selected}
>
	<slot />
</div>

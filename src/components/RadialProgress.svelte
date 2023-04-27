<script lang="ts">
	export let value: number | undefined = undefined;
</script>

<div class="radial-progress" style={`--value:${value ?? 30};`}>
	{#if value}
		{value}
	{/if}
</div>

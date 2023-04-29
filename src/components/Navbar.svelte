<script lang="ts">
	import SearchBar from "./SearchBar.svelte";
	export let searchValue = "";
</script>

<nav class="navbar px-24 py-4">
	<div>
		<SearchBar bind:value={searchValue} />
		<div class="ml-2">
			<slot />
		</div>
	</div>
</nav>

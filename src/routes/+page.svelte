<script lang="ts">
	import SearchBar from '../components/SearchBar.svelte';
	import { debounce } from 'lodash';
	let searchValue = '';

	const debouncedSearch = debounce((value) => {
		console.log(value);
	}, 500);

	$: debouncedSearch(searchValue);
</script>

<div class="flex w-full justify-center items-center">
	<SearchBar bind:value={searchValue} />
</div>

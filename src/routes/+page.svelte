<script lang="ts">
	import SearchBar from "../components/SearchBar.svelte";
	import { debounce } from "lodash";

	import SongDetails from "../components/SongDetails.svelte";
	import type { Song } from "../lib/services/spotify/schema/song";
	import RadialProgress from "../components/RadialProgress.svelte";

	let searchValue = "";

	let song: Song;

	let error: string | undefined;
	let loading = false;

	const fetchTrackDetails = async (searchValue: string) => {
		const response = await fetch(`/api/details?search=${searchValue}`);
		const data = await response.json();

		return data as Song;
	};
	const debouncedSearch = debounce(async (value) => {
		if (searchValue.length < 3) return;
		loading = true;
		try {
			const trackDetails = fetchTrackDetails(value);
			song = await trackDetails;
		} catch (e) {
			error = (e as Error).message;
		}
		loading = false;
	}, 500);

	$: debouncedSearch(searchValue);
</script>

<div class="flex w-full justify-center items-center">
	<div class="flex flex-col gap-8">
		<SearchBar bind:value={searchValue} />

		<RadialProgress />
		<div>
			{#if searchValue.length >= 3}
				{#if song}
					<SongDetails {song} />
				{:else if loading}
					<RadialProgress />
				{:else if error}
					<div>{error}</div>
				{/if}
			{/if}
		</div>
	</div>
</div>

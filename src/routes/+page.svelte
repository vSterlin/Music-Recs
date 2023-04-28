<script lang="ts">
	import SearchBar from "../components/SearchBar.svelte";
	import { debounce } from "lodash";

	import SongDetails from "../components/SongDetails.svelte";
	import type { Song } from "../lib/services/spotify/schema/song";
	import { get } from "$lib/api/api";
	import ErrorToast from "../components/ErrorToast.svelte";
	import { placeholderSong } from "$lib/utils/placeholder-song";

	let searchValue = "";

	let song: Song = placeholderSong;

	let error: string | undefined;
	let loading = false;

	const fetchTrackDetails = async (searchValue: string) => {
		const response = await get(`/api/details?search=${searchValue}`);

		return response as Song;
	};
	const debouncedSearch = debounce(async (value) => {
		if (searchValue.length < 3) return;
		loading = true;
		try {
			const trackDetails = await fetchTrackDetails(value);
			song = trackDetails;
		} catch (e) {
			error = "error";
		}
		loading = false;
	}, 500);

	$: debouncedSearch(searchValue);
	$: error &&
		debounce(() => {
			error = undefined;
		}, 3000)();
</script>

<nav class="navbar px-24 py-4">
	<div>
		<SearchBar bind:value={searchValue} />
	</div>
</nav>
<div class="flex w-full px-24 py-8">
	<div class="flex flex-col gap-8 w-full">
		<div>
			{#if searchValue.length >= 3 || song}
				{#if song}
					<SongDetails {song} />
					<!-- {:else if loading}
					<RadialProgress /> -->
				{:else if error}
					<ErrorToast>{error}</ErrorToast>
				{/if}
			{/if}
		</div>
	</div>
</div>

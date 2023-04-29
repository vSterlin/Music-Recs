<script lang="ts">
	import { debounce } from "lodash";

	import SongDetails from "../components/SongDetails.svelte";
	import type { Song } from "../lib/services/spotify/schema/song";
	import { get } from "$lib/api/api";
	import ErrorToast from "../components/ErrorToast.svelte";
	import { placeholderSong } from "$lib/utils/placeholder-song";
	import Navbar from "../components/Navbar.svelte";
	import songSelectionStore from "$lib/stores/song-selection-store";

	let searchValue = "";
	let accessToken = "";
	let song: Song = placeholderSong;

	let error: string | undefined;

	let loading = false;

	const fetchTrackDetails = async (searchValue: string) => {
		const response = await get(`/api/details?search=${searchValue}`, accessToken);

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

	$: if (accessToken) debouncedSearch(searchValue);
	$: error &&
		debounce(() => {
			error = undefined;
		}, 3000)();

	$: songSelectionStore.initialize(song);
</script>

<Navbar bind:searchValue>
	<!-- totally temporary -->

	<div class="flex">
		<input
			class="input input-bordered max-w-xs"
			type="text"
			bind:value={accessToken}
			placeholder="Spotify access token ..."
			class:input-error={!accessToken}
		/>
		{#if loading}
			<div class="radial-progress self-center animate-spin ml-2" style="--value:30; --size:2rem" />
		{/if}
	</div>
</Navbar>

<div class="w-full px-24 py-8">
	<div class="flex">
		<div class="flex flex-col gap-8 w-full">
			<div>
				{#if searchValue.length >= 3 || song}
					{#if song}
						<SongDetails {song} />
					{:else if error}
						<ErrorToast>{error}</ErrorToast>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</div>

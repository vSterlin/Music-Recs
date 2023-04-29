<script lang="ts">
	import songSelectionStore from "$lib/stores/song-selection-store";
	import type { Song } from "../lib/services/spotify/schema/song";

	import SongQualityBadge from "./SongQualityBadge.svelte";

	export let song: Song;

	const { toggleQuality } = songSelectionStore;
</script>

<div>
	<div class="flex flex-row items-center gap-12">
		<img class="shadow-2xl" src={song.album.images[1].url} alt={song.album.name} />

		<div>
			<div class="text-9xl text-primary">{song.name}</div>
			<div class="text-7xl font-light">by{" "}{song.artists[0].name}</div>
		</div>
	</div>
	<div class="divider" />
	<!--  -->

	<div class="flex gap-8">
		<section>
			<div class="text-3xl mb-2">Instruments</div>
			<div class="flex gap-2">
				{#each song.instruments as instrument}
					<SongQualityBadge
						onSelect={() => toggleQuality("instruments", instrument)}
						isSelected={$songSelectionStore?.instruments.includes(instrument)}
					>
						{instrument}
					</SongQualityBadge>
				{/each}
			</div>
		</section>
		<!--  -->

		<section>
			<div class="text-3xl mb-2">Moods</div>
			<div class="flex gap-2">
				{#each song.moods as mood}
					<SongQualityBadge
						onSelect={() => toggleQuality("moods", mood)}
						isSelected={$songSelectionStore?.moods.includes(mood)}>{mood}</SongQualityBadge
					>
				{/each}
			</div>
		</section>

		<section>
			<div class="text-3xl mb-2">Themes</div>
			<div class="flex gap-2">
				{#each song.themes as theme}
					<SongQualityBadge
						onSelect={() => toggleQuality("themes", theme)}
						isSelected={$songSelectionStore?.themes.includes(theme)}>{theme}</SongQualityBadge
					>
				{/each}
			</div>
		</section>

		<section>
			<div class="text-3xl mb-2">Genres</div>
			<div class="flex gap-2">
				{#each song.genres as genre}
					<SongQualityBadge
						onSelect={() => toggleQuality("genres", genre)}
						isSelected={$songSelectionStore?.genres.includes(genre)}>{genre}</SongQualityBadge
					>
				{/each}
			</div>
		</section>
	</div>
</div>

import type { Song } from "$lib/services/spotify/schema/song";
import { writable } from "svelte/store";

type Category = keyof Pick<Song, "instruments" | "genres" | "themes" | "moods">;

const pickRandomItem = (items: string[]) => {
	const randomIndex = Math.floor(Math.random() * items.length);
	return items[randomIndex];
};

const filterOutRandomItem = (items: string[]) => {
	const randomItem = pickRandomItem(items);
	return items.filter((item) => item !== randomItem);
};

const createSongSelectionStore = () => {
	const { subscribe, set, update } = writable<Song | null>(null);

	const toggleQuality = (category: Category, quality: string) => {
		update((song) => {
			console.log("SONG", song);
			if (!song) {
				return null;
			}
			const instrumentIndex = song[category].indexOf(quality);
			if (instrumentIndex === -1) {
				return {
					...song,
					[category]: [...song[category], quality]
				};
			}
			const newItems = [...song[category]];
			newItems.splice(instrumentIndex, 1);
			return {
				...song,
				[category]: newItems
			};
		});
	};

	const initialize = (song: Song) => {
		const songWithEmptyQualities = {
			...song,
			instruments: filterOutRandomItem(song.instruments),
			genres: filterOutRandomItem(song.genres),
			themes: filterOutRandomItem(song.themes),
			moods: filterOutRandomItem(song.moods)
		};
		set(songWithEmptyQualities);
	};
	return {
		subscribe,
		initialize,
		toggleQuality
	};
};

const songSelectionStore = createSongSelectionStore();

export default songSelectionStore;

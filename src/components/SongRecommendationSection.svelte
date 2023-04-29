<script lang="ts">
	import songSelectionStore from "$lib/stores/song-selection-store";

	const join = (arr: string[]) => {
		if (!arr.length) return "";
		if (arr.length === 1) return arr[0];

		const arrClone = [...arr];
		const lastItem = arrClone.pop();
		return `${arrClone.join(", ")} and ${lastItem}`;
	};

	$: moods = join($songSelectionStore?.moods || []);
	$: themes = join($songSelectionStore?.themes || []);
	$: instruments = join($songSelectionStore?.instruments || []);
	$: genres = join($songSelectionStore?.genres || []);
</script>

<div>
	<div class="text-2xl">
		I will recommend you a few songs that sound similar to <span class="text-primary"
			>{$songSelectionStore?.name}</span
		>
		by <span class="text-primary">{$songSelectionStore?.artists[0].name}</span>. They will be about
		<span class="text-primary">{themes}</span>
		and will be <span class="text-primary">{moods}</span>. The songs will include
		<span class="text-primary">
			{instruments}
		</span>
		and will belong to
		<span class="text-primary">
			{genres}
		</span>
		genres.
	</div>

	<button class="btn btn-primary mt-8">Get Recommendations</button>
</div>

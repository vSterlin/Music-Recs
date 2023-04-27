<script lang="ts">
	import type { Song } from "../lib/services/spotify/schema/song";

	export let song: Song;
</script>

<div>
	<h1>{song.name}</h1>
	<h2>{song.artists[0].name}</h2>
	<img src={song.album.images[2].url} alt={song.album.name} />
</div>

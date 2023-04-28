<script>
	import Alert from "./Alert.svelte";
	import Toast from "./Toast.svelte";
</script>

<Toast type="bottom start">
	<Alert type="error">
		<slot />
	</Alert>
</Toast>

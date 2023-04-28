<script lang="ts">
	import clsx from "clsx";

	const alertTypeClasses = {
		info: "alert-info",
		success: "alert-success",
		warning: "alert-warning",
		error: "alert-error",
		default: ""
	};
	type AlertType = keyof typeof alertTypeClasses;

	export let type: AlertType = "default";

	const classes = clsx("alert", alertTypeClasses[type]);
</script>

<div class={classes}>
	<div>
		<span><slot /></span>
	</div>
</div>

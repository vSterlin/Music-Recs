<script lang="ts">
	import clsx from "clsx";

	const toastTypeClasses: Record<string, string> = {
		start: "toast-start",
		center: "toast-center",
		end: "toast-end",
		top: "toast-top",
		middle: "toast-middle",
		bottom: "toast-bottom",
		default: ""
	};

	// type ToastType = keyof typeof toastTypeClasses;
	export let type: string = "default";

	const typeClasses = type.split(" ").map((t) => toastTypeClasses[t] || "");

	console.log(typeClasses);

	const classes = clsx("toast", ...typeClasses);
</script>

<div class={classes}>
	<slot />
</div>

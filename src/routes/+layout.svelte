<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import Navbar from '$lib/components/Navbar.svelte';
	import { FALLBACK_THEME } from '$lib/constants/themes';
	
	// TODO: Consolidate theme initialization logic - this is duplicated in app.html, ThemeSwitcher.svelte, and LightSwitch.svelte
	// Initialize theme and mode on layout load
	if (browser) {
		const mode = localStorage.getItem('mode') || 'dark';
		document.documentElement.setAttribute('data-mode', mode);
		
		const theme = localStorage.getItem('theme') || FALLBACK_THEME;
		document.documentElement.setAttribute('data-theme', theme);
	}

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/SKSFAVICON.svg" type="image/svg+xml" />
</svelte:head>

<Navbar />

<main class="min-h-screen bg-surface-50 dark:bg-surface-900">
	{@render children?.()}
</main>

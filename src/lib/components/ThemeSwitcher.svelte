<script lang="ts">
	import { browser } from '$app/environment';
	import { themes, FALLBACK_THEME } from '$lib/constants/themes';
	import { Palette, ExternalLink, Sun } from '@lucide/svelte';

	let selectedTheme = $state<string>(FALLBACK_THEME);
	let isOpen = $state(false);

	$effect(() => {
		if (!browser) return;
		
		// Initialize theme from localStorage
		const storedTheme = localStorage.getItem('theme');
		const theme = storedTheme ?? FALLBACK_THEME;
		selectedTheme = theme;
		document.documentElement.setAttribute('data-theme', theme);
	});

	function selectTheme(themeName: string) {
		if (!browser) return;
		
		selectedTheme = themeName;
		document.documentElement.setAttribute('data-theme', themeName);
		localStorage.setItem('theme', themeName);
		isOpen = false;
	}

	function toggleOpen() {
		isOpen = !isOpen;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.theme-switcher-container')) {
			isOpen = false;
		}
	}

	$effect(() => {
		if (!browser) return;
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});
</script>

<svelte:head>
	<!-- TODO: Remove duplicated theme initialization - consolidate with app.html and +layout.svelte -->
	<script>
		if (typeof window !== 'undefined') {
			const FALLBACK_THEME = 'mint';
			const storedTheme = localStorage.getItem('theme');
			const theme = storedTheme ?? FALLBACK_THEME;
			document.documentElement.setAttribute('data-theme', theme);
		}
	</script>
</svelte:head>

<div class="theme-switcher-container relative">
	<button
		class="btn-icon preset-tonal hover:preset-filled border border-surface-300-700 {isOpen ? 'preset-filled ring-2 ring-primary-500' : ''} transition-all flex items-center justify-center"
		title="Select theme"
		aria-label="Select theme"
		type="button"
		onclick={toggleOpen}
		style="min-width: 2.5rem; min-height: 2.5rem;"
	>
		<Palette size={20} class="text-primary-500" />
	</button>

	{#if isOpen}
		<div
			class="absolute right-0 top-full mt-2 w-96 max-h-[80vh] overflow-y-auto p-4 bg-surface-50-950 shadow-xl rounded-lg border border-surface-200-800 z-50"
			role="dialog"
			aria-label="Theme selector"
		>
			<div class="space-y-4">
				<!-- Header -->
				<div class="flex items-center justify-between">
					<h3 class="h5">Select Theme</h3>
					<a
						href="https://themes.skeleton.dev/themes/create"
						target="_blank"
						rel="noopener noreferrer"
						class="btn preset-outlined text-sm"
					>
						Create a Theme
						<ExternalLink size="16" />
					</a>
				</div>

				<!-- Theme Grid -->
				<div class="grid grid-cols-3 gap-3">
					{#each themes as theme (theme.name)}
						<button
							data-theme={theme.name}
							class="p-3 preset-outlined-surface-200-800 hover:preset-outlined-surface-800-200 rounded-md flex flex-col items-center gap-2 transition-all {selectedTheme === theme.name ? 'ring-2 ring-primary-500' : ''}"
							onclick={() => selectTheme(theme.name)}
							type="button"
						>
							<span class="text-2xl">{theme.emoji}</span>
							<span class="text-xs capitalize">{theme.name}</span>
							<!-- Color preview -->
							<div class="flex justify-center items-center -space-x-1 mt-1">
								<div class="aspect-square w-3 bg-primary-500 border-[1px] border-black/10 rounded-full"></div>
								<div class="aspect-square w-3 bg-secondary-500 border-[1px] border-black/10 rounded-full"></div>
								<div class="aspect-square w-3 bg-tertiary-500 border-[1px] border-black/10 rounded-full"></div>
							</div>
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

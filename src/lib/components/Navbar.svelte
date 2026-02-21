<script lang="ts">
	import WalletStatus from './WalletStatus.svelte';
	import LightSwitch from './LightSwitch.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import { Github } from '@lucide/svelte';

	const GITHUB_URL = 'https://github.com/Zaunzi/SveltekitWeb3Starter';
</script>

<nav class="navbar bg-surface-50 dark:bg-surface-900 shadow-sm">
	<div class="container mx-auto px-2 md:px-4">
		<div class="flex items-center justify-between h-16">
			<!-- Logo Section -->
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-2">
					<div class="h-8 w-8 bg-primary-500 rounded-lg flex items-center justify-center overflow-hidden">
						<img src="/SKSFAVICON.svg" alt="SKS" class="h-6 w-6 object-contain" />
					</div>
					<span class="font-aavegotchi text-xl font-bold text-surface-900 dark:text-surface-100 hidden md:block lowercase">
						sveltekit web3 starter
					</span>
				</a>
			</div>

			<!-- Right Section: GitHub + Theme Switcher + Light Switch + Wallet Status -->
			<div class="flex items-center space-x-2 md:space-x-4">
				<a
					href={GITHUB_URL}
					target="_blank"
					rel="noopener noreferrer"
					class="btn-icon preset-tonal hover:preset-filled border border-surface-300-700 flex items-center justify-center transition-all"
					title="View on GitHub"
					aria-label="View template on GitHub"
					style="min-width: 2.5rem; min-height: 2.5rem;"
				>
					<Github size={20} class="text-surface-700 dark:text-surface-300" />
				</a>
				<!-- Theme Switcher -->
				<ThemeSwitcher />
				
				<!-- Theme Switch (Light/Dark Mode) -->
				<LightSwitch />
				
				<!-- Wallet Status -->
				<WalletStatus />
			</div>
		</div>
	</div>
</nav>

<style>
/* No custom styles needed - using Skeleton's built-in surface colors */
</style>

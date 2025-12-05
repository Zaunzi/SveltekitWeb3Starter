<script lang="ts">
	import WalletStatus from './WalletStatus.svelte';
	import LightSwitch from './LightSwitch.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

<nav class="navbar bg-surface-50 dark:bg-surface-900 shadow-sm">
	<div class="container mx-auto px-2 md:px-4">
		<div class="flex items-center justify-between h-16">
			<!-- Logo Section -->
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-2">
					<div class="h-8 w-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
						SKS
					</div>
					<span class="text-xl font-bold text-surface-900 dark:text-surface-100 hidden md:block">
						SvelteKit Web3 Starter
					</span>
				</a>
			</div>

			<!-- Right Section: Theme Switcher + Light Switch + Wallet Status -->
			<div class="flex items-center space-x-2 md:space-x-4">
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

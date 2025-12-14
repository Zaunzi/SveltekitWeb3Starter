<script lang="ts">
	import WalletStatus from './WalletStatus.svelte';
	import LightSwitch from './LightSwitch.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

<nav class="navbar bg-surface-50 shadow-sm dark:bg-surface-900">
	<div class="container mx-auto px-2 md:px-4">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo Section -->
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-2">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-lg font-bold text-white"
					>
						SKS
					</div>
					<span class="hidden text-xl font-bold text-surface-900 md:block dark:text-surface-100">
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

<script lang="ts">
	import {
		account,
		network,
		walletActions,
		isChainSupported,
		getChainName,
		getChainInfo
	} from '$lib/stores/walletStore';
	import { Copy, ExternalLink, Wallet, Circle } from '@lucide/svelte';

	// Format address for display
	function formatAddress(address: string): string {
		if (!address) return '';
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	}

	// Handle network switch
	function handleNetworkSwitch() {
		if ($network.chainId && !isChainSupported($network.chainId as number)) {
			// Switch to Base Sepolia if on unsupported network
			walletActions.switchNetwork(84532); // Base Sepolia chain ID
		}
	}

	// Copy address to clipboard
	async function copyAddress() {
		if ($account.address) {
			await navigator.clipboard.writeText($account.address);
			// You could add a toast notification here
		}
	}

	// Open address in explorer
	function openInExplorer() {
		if ($account.address && ($network.chainId as number)) {
			const chainInfo = getChainInfo($network.chainId as number);
			if (chainInfo.explorer) {
				window.open(`${chainInfo.explorer}/address/${$account.address}`, '_blank');
			}
		}
	}
</script>

<div class="flex items-center space-x-3">
	{#if $account.isConnected}
		<!-- Connected State -->
		<div class="flex items-center space-x-3">
			<!-- Network Status -->
			{#if $network.chainId}
				<div class="flex items-center space-x-2">
					{#if isChainSupported($network.chainId as number)}
						<div
							class="flex items-center space-x-1 rounded-md border border-success-200 bg-success-100 px-2 py-1 dark:border-success-800 dark:bg-success-900/20"
						>
							<div class="h-2 w-2 rounded-full bg-success-500"></div>
							<span class="text-xs font-medium text-success-700 dark:text-success-300">
								{getChainName($network.chainId as number)}
							</span>
						</div>
					{:else}
						<div
							class="flex items-center space-x-1 rounded-md border border-error-200 bg-error-100 px-2 py-1 dark:border-error-800 dark:bg-error-900/20"
						>
							<Circle class="h-3 w-3 text-error-600 dark:text-error-400" />
							<button
								onclick={handleNetworkSwitch}
								class="text-xs font-medium text-error-700 transition-colors hover:text-error-800 dark:text-error-300 dark:hover:text-error-200"
							>
								Switch Network
							</button>
						</div>
					{/if}
				</div>
			{/if}

			<!-- Wallet Address -->
			<div
				class="flex items-center space-x-2 rounded-lg border border-surface-200 bg-surface-100 px-3 py-2 dark:border-surface-700 dark:bg-surface-800"
			>
				<Wallet class="h-4 w-4 text-surface-600 dark:text-surface-400" />
				<span class="font-mono text-sm text-surface-700 dark:text-surface-300">
					{formatAddress($account.address || '')}
				</span>
				<div class="flex items-center space-x-1">
					<button
						onclick={copyAddress}
						class="p-1 text-surface-500 transition-colors hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
						title="Copy address"
					>
						<Copy class="h-3 w-3" />
					</button>
					<button
						onclick={openInExplorer}
						class="p-1 text-surface-500 transition-colors hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
						title="View in explorer"
					>
						<ExternalLink class="h-3 w-3" />
					</button>
					<button
						onclick={walletActions.disconnect}
						class="rounded px-2 py-1 text-xs text-surface-600 transition-colors hover:bg-surface-200 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-700 dark:hover:text-surface-100"
					>
						Disconnect
					</button>
				</div>
			</div>
		</div>
	{:else}
		<!-- Disconnected State -->
		<button
			onclick={walletActions.open}
			class="flex items-center space-x-2 rounded-lg bg-primary-500 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-primary-600 hover:shadow-md"
		>
			<Wallet class="h-4 w-4" />
			<span>Connect Wallet</span>
		</button>
	{/if}
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import { account, network, walletActions, getChainInfo } from '$lib/stores/walletStore';
	import { ethers } from 'ethers';

	let balance = '0';
	let isLoading = true;
	let error = '';

	// Format balance for display
	function formatBalance(balance: string, decimals: number = 18): string {
		const formatted = ethers.formatEther(balance);
		const num = parseFloat(formatted);

		if (num === 0) return '0';
		if (num < 0.0001) return '< 0.0001';
		if (num < 1) return num.toFixed(4);
		if (num < 1000) return num.toFixed(2);
		return num.toLocaleString();
	}

	// Fetch balance
	async function fetchBalance() {
		if (!$account.address || (!$network.chainId as boolean)) {
			isLoading = false;
			return;
		}

		try {
			isLoading = true;
			error = '';

			const provider = walletActions.getProvider();
			if (!provider) {
				throw new Error('No provider available');
			}

			const ethersProvider = new ethers.BrowserProvider(provider);
			const balanceWei = await ethersProvider.getBalance($account.address);
			balance = balanceWei.toString();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to fetch balance';
			console.error('Error fetching balance:', err);
		} finally {
			isLoading = false;
		}
	}

	// Refetch balance when account or network changes
	$: if ($account.address && ($network.chainId as number)) {
		fetchBalance();
	}

	onMount(() => {
		fetchBalance();
	});
</script>

<div class="flex items-center space-x-2">
	{#if $account.isConnected && $network.chainId}
		<div
			class="flex items-center space-x-1 rounded-lg border border-surface-200 bg-surface-100 px-3 py-2 dark:border-surface-700 dark:bg-surface-800"
		>
			{#if isLoading}
				<div
					class="h-3 w-3 animate-spin rounded-full border-2 border-surface-300 border-t-primary-500 dark:border-surface-600"
				></div>
				<span class="text-xs text-surface-600 dark:text-surface-400">Loading...</span>
			{:else if error}
				<span class="text-xs text-error-600 dark:text-error-400">Error</span>
			{:else}
				<span class="font-mono text-xs text-surface-700 dark:text-surface-300">
					{formatBalance(balance)}
					{getChainInfo($network.chainId as number).symbol}
				</span>
			{/if}
		</div>
	{/if}
</div>

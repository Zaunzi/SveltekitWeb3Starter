<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { account, network, isChainSupported } from '$lib/stores/walletStore';
	import { walletActions } from '$lib/stores/walletStore';
	import { ethers } from 'ethers';
	import { Loader2, CheckCircle, XCircle } from '@lucide/svelte';

	let { disabled = false, loading = false, children = 'Send Transaction' } = $props();

	const dispatch = createEventDispatcher();

	let txHash = '';
	let txStatus: 'pending' | 'success' | 'error' | null = null;
	let error = '';

	// Example transaction function - customize this for your needs
	async function sendTransaction() {
		if (!$account.address || !$network.chainId || !isChainSupported($network.chainId)) {
			error = 'Please connect wallet and switch to a supported network';
			return;
		}

		try {
			loading = true;
			error = '';
			txStatus = 'pending';

			const provider = walletActions.getProvider();
			if (!provider) {
				throw new Error('No provider available');
			}

			const ethersProvider = new ethers.BrowserProvider(provider);
			const signer = await ethersProvider.getSigner();

			// Example: Send 0.001 ETH to yourself (customize this)
			const tx = await signer.sendTransaction({
				to: $account.address,
				value: ethers.parseEther('0.001'),
				gasLimit: 21000
			});

			txHash = tx.hash;
			txStatus = 'success';

			dispatch('success', { hash: txHash });

			// Wait for confirmation
			await tx.wait();
			
		} catch (err) {
			error = err instanceof Error ? err.message : 'Transaction failed';
			txStatus = 'error';
			dispatch('error', { error });
			console.error('Transaction error:', err);
		} finally {
			loading = false;
		}
	}

	// Reset status after 5 seconds
	$effect(() => {
		if (txStatus) {
			const timer = setTimeout(() => {
				txStatus = null;
				txHash = '';
			}, 5000);
			
			return () => clearTimeout(timer);
		}
	});
</script>

<div class="flex flex-col space-y-2">
	<button
		onclick={sendTransaction}
		disabled={disabled || loading || !$account.isConnected || !isChainSupported($network.chainId)}
		class="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-surface-300 dark:disabled:bg-surface-700 text-white disabled:text-surface-500 dark:disabled:text-surface-400 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md disabled:shadow-none"
	>
		{#if loading}
			<Loader2 class="w-4 h-4 animate-spin" />
			<span>Processing...</span>
		{:else if txStatus === 'success'}
			<CheckCircle class="w-4 h-4 text-success-500" />
			<span>Success!</span>
		{:else if txStatus === 'error'}
			<XCircle class="w-4 h-4 text-error-500" />
			<span>Failed</span>
		{:else}
			<span>{children}</span>
		{/if}
	</button>

	{#if error}
		<div class="text-xs text-error-600 dark:text-error-400 text-center">
			{error}
		</div>
	{/if}

	{#if txHash}
		<div class="text-xs text-surface-600 dark:text-surface-400 text-center">
			<a 
				href="{getChainInfo($network.chainId).explorer}/tx/{txHash}" 
				target="_blank" 
				class="text-primary-500 hover:text-primary-600 underline"
			>
				View Transaction
			</a>
		</div>
	{/if}
</div>
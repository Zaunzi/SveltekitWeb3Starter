<script lang="ts">
	import { account, network, walletActions, isChainSupported, getChainInfo } from '$lib/stores/walletStore';
	import { browser } from '$app/environment';
	import { ethers } from 'ethers';
	import { createEventDispatcher } from 'svelte';
	import { Loader2, CheckCircle, XCircle } from '@lucide/svelte';
	import type { ContractInteractionProps } from '../../app.d.ts';

	let { 
		contractAddress, 
		abi, 
		functionName, 
		args = [], 
		value = '0',
		disabled = false,
		children
	}: ContractInteractionProps = $props();

	const dispatch = createEventDispatcher();

	let loading = $state(false);
	let error = $state('');
	let txHash = $state('');
	let txStatus = $state<'pending' | 'success' | 'error' | null>(null);

	// Execute contract function
	async function executeContractFunction() {
		if (!$account.address || !$network.chainId || !isChainSupported($network.chainId)) {
			error = 'Please connect wallet and switch to a supported network';
			return;
		}

		if (!browser) return;
		
		loading = true;
		error = '';
		txStatus = 'pending';

		try {
			const provider = walletActions.getProvider();
			if (!provider) {
				throw new Error('No provider available');
			}

			const ethersProvider = new ethers.BrowserProvider(provider);
			const signer = await ethersProvider.getSigner();
			const contract = new ethers.Contract(contractAddress, abi, signer);
			
			const tx = await contract[functionName](...args, { value });
			txHash = tx.hash;
			txStatus = 'success';
			
			console.log('Transaction sent:', tx.hash);
			dispatch('success', { hash: txHash });
			
			// Wait for confirmation
			const receipt = await tx.wait();
			console.log('Transaction confirmed:', receipt);
			dispatch('confirmed', { receipt });
			
		} catch (err: any) {
			console.error('Contract interaction failed:', err);
			error = err.message || 'Transaction failed';
			txStatus = 'error';
			dispatch('error', { error: err });
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

<div class="space-y-4">
	<button
		onclick={executeContractFunction}
		disabled={disabled || loading || !$account.isConnected || !$network.chainId || !isChainSupported($network.chainId) || !contractAddress || !abi || !functionName}
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
			{@render children()}
		{/if}
	</button>

	{#if error}
		<div class="p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
			<p class="text-sm text-error-700 dark:text-error-300">{error}</p>
		</div>
	{/if}

	{#if txHash && $network.chainId}
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

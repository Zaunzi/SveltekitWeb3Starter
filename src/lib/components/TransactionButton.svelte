<script lang="ts">
	// TODO: replace this depreciated method with https://svelte.dev/docs/svelte/v5-migration-guide#Event-changes-Component-events
	import { createEventDispatcher } from 'svelte';
	import { account, network, isChainSupported, getChainInfo } from '$lib/stores/walletStore';
	import { walletActions } from '$lib/stores/walletStore';
	import { ethers } from 'ethers';
	import { LoaderCircle, Check, CircleOff } from '@lucide/svelte';
	import type { TxStatusEnums } from '../../app';

	let { disabled = false, loading = false, children = 'Send Transaction' } = $props();

	const dispatch = createEventDispatcher();

	let txHash: string = $state('');
	let txStatus: TxStatusEnums = $state(null);
	let error = $state('');

	// Example transaction function - customize this for your needs
	async function sendTransaction() {
		if (!$account.address || !$network.chainId || !isChainSupported($network.chainId as number)) {
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
		disabled={disabled ||
			loading ||
			!$account.isConnected ||
			!isChainSupported($network.chainId as number)}
		class="flex items-center justify-center space-x-2 rounded-lg bg-primary-500 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-primary-600 hover:shadow-md disabled:bg-surface-300 disabled:text-surface-500 disabled:shadow-none dark:disabled:bg-surface-700 dark:disabled:text-surface-400"
	>
		{#if loading}
			<LoaderCircle class="h-4 w-4 animate-spin" />
			<span>Processing...</span>
		{:else if txStatus === 'success'}
			<Check class="h-4 w-4 text-success-500" />
			<span>Success!</span>
		{:else if txStatus === 'error'}
			<CircleOff class="h-4 w-4 text-error-500" />
			<span>Failed</span>
		{:else}
			<span>{children}</span>
		{/if}
	</button>

	{#if error}
		<div class="text-center text-xs text-error-600 dark:text-error-400">
			{error}
		</div>
	{/if}

	{#if txHash}
		<div class="text-center text-xs text-surface-600 dark:text-surface-400">
			<a
				href="{getChainInfo($network.chainId as number).explorer}/tx/{txHash}"
				target="_blank"
				class="text-primary-500 underline hover:text-primary-600"
			>
				View Transaction
			</a>
		</div>
	{/if}
</div>

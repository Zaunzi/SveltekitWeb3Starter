<script lang="ts">
	import {
		account,
		network,
		walletActions,
		isChainSupported,
		getChainInfo
	} from '$lib/stores/walletStore';
	import { browser } from '$app/environment';
	import { ethers } from 'ethers';
	// TODO: replace this depreciated method with https://svelte.dev/docs/svelte/v5-migration-guide#Event-changes-Component-events
	import { createEventDispatcher } from 'svelte';
	import { LoaderCircle, Circle, CircleOff } from '@lucide/svelte';
	import type { TxStatusEnums } from '../../app';

	interface Props {
		contractAddress: string;
		abi: any[];
		functionName: string;
		args?: any[];
		value?: string;
		children: any;
	}

	let { contractAddress, abi, functionName, args = [], value = '0', children }: Props = $props();

	const dispatch = createEventDispatcher();

	let txStatus: TxStatusEnums = $state(null);
	let txHash: string = $state('');
	let loading: boolean = $state(false);
	let error: string = $state('');

	// Execute contract function
	async function executeContractFunction() {
		if (!$account.address || !$network.chainId || !isChainSupported($network.chainId as number)) {
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
		disabled={loading ||
			!$account.isConnected ||
			!isChainSupported($network.chainId as number) ||
			!contractAddress ||
			!abi ||
			!functionName}
		class="flex items-center justify-center space-x-2 rounded-lg bg-primary-500 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-primary-600 hover:shadow-md disabled:bg-surface-300 disabled:text-surface-500 disabled:shadow-none dark:disabled:bg-surface-700 dark:disabled:text-surface-400"
	>
		{#if loading}
			<LoaderCircle class="h-4 w-4 animate-spin" />
			<span>Processing...</span>
		{:else if txStatus === 'success'}
			<Circle class="h-4 w-4 text-success-500" />
			<span>Success!</span>
		{:else if txStatus === 'error'}
			<CircleOff class="h-4 w-4 text-error-500" />
			<span>Failed</span>
		{:else}
			{@render children()}
		{/if}
	</button>

	{#if error}
		<div
			class="rounded-lg border border-error-200 bg-error-50 p-3 dark:border-error-800 dark:bg-error-900/20"
		>
			<p class="text-sm text-error-700 dark:text-error-300">{error}</p>
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

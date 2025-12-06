<script lang="ts">
	import { account, network, isWalletConnected, getChainName } from '$lib/stores/walletStore';
	// Using plain HTML instead of Skeleton components to avoid SSR issues
	import ETHBalance from '$lib/components/ETHBalance.svelte';

	// Format address for display
	function formatAddress(address: string): string {
		if (!address) return '';
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	}
</script>

<svelte:head>
	<title>SvelteKit Web3 Starter</title>
	<meta name="description" content="A production-ready SvelteKit template for building Web3 dApps with Reown AppKit and Ethers" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="max-w-4xl mx-auto">
		<!-- Hero Section -->
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-6xl font-bold text-surface-900 dark:text-surface-100 mb-4">
				SvelteKit Web3 Starter
			</h1>
			<p class="text-lg text-surface-600 dark:text-surface-400 mb-8">
				A production-ready template for building Web3 dApps with SvelteKit, Reown AppKit, and Ethers
			</p>
		</div>

		<!-- Welcome Message -->
		<div class="card mb-8">
			<div class="card-header">
				<h3 class="card-title">🚀 Welcome to Your Web3 DApp</h3>
			</div>
			<div class="card-content">
				<div class="space-y-4">
					<p class="text-surface-600 dark:text-surface-400">
						This template provides everything you need to build a production-ready Web3 dApp:
					</p>
					<ul class="list-disc list-inside space-y-2 text-sm text-surface-600 dark:text-surface-400">
						<li><strong>Wallet Integration:</strong> Reown AppKit with support for 300+ wallets</li>
						<li><strong>Multi-Chain Support:</strong> Base Sepolia (testnet) and Base Mainnet</li>
						<li><strong>Modern UI:</strong> Skeleton UI with dark/light theme support</li>
						<li><strong>TypeScript:</strong> Full type safety and IntelliSense support</li>
						<li><strong>Best Practices:</strong> Proper error handling, loading states, and wallet switching</li>
						<li><strong>Production Ready:</strong> Optimized for performance and user experience</li>
					</ul>
					<p class="text-sm text-surface-500 dark:text-surface-500 mt-4">
						Connect your wallet to see your ETH balance and start building!
					</p>
				</div>
			</div>
		</div>

		<!-- Wallet Status -->
		{#if $isWalletConnected}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<!-- Connection Status -->
				<div class="card">
					<div class="card-header">
						<h3 class="card-title">Wallet Connected</h3>
					</div>
					<div class="card-content">
						<div class="space-y-2">
							<p class="text-success-600 dark:text-success-400 font-medium">✅ Connected</p>
							<p class="text-sm text-surface-600 dark:text-surface-400">
								Address: {formatAddress($account.address || '')}
							</p>
							<p class="text-sm text-surface-600 dark:text-surface-400">
								Network: {getChainName($network.chainId || 0)}
							</p>
						</div>
					</div>
				</div>

				<!-- ETH Balance -->
				<div class="card">
					<div class="card-header">
						<h3 class="card-title">ETH Balance</h3>
					</div>
					<div class="card-content">
						<ETHBalance />
					</div>
				</div>
			</div>
		{:else}
			<!-- Not Connected State -->
			<div class="card mb-8">
				<div class="card-header">
					<h3 class="card-title">Connect Your Wallet</h3>
				</div>
				<div class="card-content">
					<div class="text-center space-y-4">
						<p class="text-surface-600 dark:text-surface-400">
							Connect your wallet to interact with your Web3 dApp
						</p>
						<p class="text-sm text-surface-500 dark:text-surface-500">
							Click the "Connect Wallet" button in the navbar to get started
						</p>
					</div>
				</div>
			</div>
		{/if}

		<!-- Getting Started -->
		<div class="card mb-8">
			<div class="card-header">
				<h3 class="card-title">🛠️ Getting Started</h3>
			</div>
			<div class="card-content">
				<div class="space-y-4">
					<p class="text-surface-600 dark:text-surface-400">
						Ready to build your Web3 dApp? Here's what you need to do:
					</p>
					<ol class="list-decimal list-inside space-y-2 text-sm text-surface-600 dark:text-surface-400">
						<li>Get a Project ID from <a href="https://cloud.reown.com/" target="_blank" class="text-primary-500 hover:text-primary-600 underline">Reown Cloud</a></li>
						<li>Create a <code class="bg-surface-100 dark:bg-surface-800 px-1 py-0.5 rounded text-xs">.env</code> file with your <code class="bg-surface-100 dark:bg-surface-800 px-1 py-0.5 rounded text-xs">VITE_PROJECT_ID</code></li>
						<li>Customize the components in <code class="bg-surface-100 dark:bg-surface-800 px-1 py-0.5 rounded text-xs">src/lib/components/</code></li>
						<li>Add your smart contract interactions</li>
						<li>Deploy and share your dApp!</li>
					</ol>
					<p class="text-sm text-surface-500 dark:text-surface-500 mt-4">
						Check the README.md for detailed setup instructions and examples.
					</p>
				</div>
			</div>
		</div>

		<!-- Testnet Faucets -->
		<div class="card">
			<div class="card-header">
				<h3 class="card-title">🚰 Get Testnet ETH</h3>
			</div>
			<div class="card-content">
				<div class="space-y-4">
					<p class="text-surface-600 dark:text-surface-400">
						Need Base Sepolia testnet ETH for development? Use these faucets to get free testnet funds:
					</p>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="space-y-2">
							<h4 class="font-medium text-surface-900 dark:text-surface-100">Recommended Faucets</h4>
							<ul class="space-y-1 text-sm">
								<li>
									<a href="https://portal.cdp.coinbase.com/products/faucet" target="_blank" class="text-primary-500 hover:text-primary-600 underline">
										Coinbase Developer Platform
									</a>
									<span class="text-surface-500 dark:text-surface-500"> - 1 claim per 24h</span>
								</li>
								<li>
									<a href="https://thirdweb.com/faucet/base-sepolia" target="_blank" class="text-primary-500 hover:text-primary-600 underline">
										thirdweb Faucet
									</a>
									<span class="text-surface-500 dark:text-surface-500"> - 1 claim per 24h</span>
								</li>
								<li>
									<a href="https://superchain-faucet.vercel.app/" target="_blank" class="text-primary-500 hover:text-primary-600 underline">
										Superchain Faucet
									</a>
									<span class="text-surface-500 dark:text-surface-500"> - Higher limits with onchain identity</span>
								</li>
								<li>
									<a href="https://www.alchemy.com/faucets/base-sepolia" target="_blank" class="text-primary-500 hover:text-primary-600 underline">
										Alchemy Faucet
									</a>
									<span class="text-surface-500 dark:text-surface-500"> - 1 claim per 24h</span>
								</li>
							</ul>
						</div>
						<div class="space-y-2">
							<h4 class="font-medium text-surface-900 dark:text-surface-100">Alternative Faucets</h4>
							<ul class="space-y-1 text-sm">
								<li>
									<a href="https://faucet.bwarelabs.com/base-sepolia" target="_blank" class="text-primary-500 hover:text-primary-600 underline">
										Bware Labs
									</a>
									<span class="text-surface-500 dark:text-surface-500"> - No registration required</span>
								</li>
								<li>
									<a href="https://ponzifun.xyz/" target="_blank" class="text-primary-500 hover:text-primary-600 underline">
										Ponzifun Faucet
									</a>
									<span class="text-surface-500 dark:text-surface-500"> - 1 ETH every 48h</span>
								</li>
								<li>
									<a href="https://faucet.quicknode.com/base/sepolia" target="_blank" class="text-primary-500 hover:text-primary-600 underline">
										QuickNode Faucet
									</a>
									<span class="text-surface-500 dark:text-surface-500"> - 1 drip every 12h</span>
								</li>
								<li>
									<a href="https://learnweb3.io/faucets/base-sepolia" target="_blank" class="text-primary-500 hover:text-primary-600 underline">
										LearnWeb3 Faucet
									</a>
									<span class="text-surface-500 dark:text-surface-500"> - 1 claim per 24h</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-xs text-surface-500 dark:text-surface-500 mt-4">
						For more faucets and detailed information, visit the <a href="https://docs.base.org/base-chain/tools/network-faucets" target="_blank" class="text-primary-500 hover:text-primary-600 underline">Base Documentation</a>.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
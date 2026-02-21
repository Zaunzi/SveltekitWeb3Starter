<script lang="ts">
	import { account, network, isWalletConnected, getChainName } from '$lib/stores/walletStore';
	// Using plain HTML instead of Skeleton components to avoid SSR issues
	import ETHBalance from '$lib/components/ETHBalance.svelte';

	// Format address for display
	function formatAddress(address: string): string {
		if (!address) return '';
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	}

	// JSON-LD structured data for SEO
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareSourceCode',
		name: 'sveltekit web3 starter',
		description: 'A production-ready SvelteKit template for building Web3 dApps with Reown AppKit, Ethers, and Skeleton UI.',
		url: 'https://sveltekit-web3-starter.vercel.app/',
		codeRepository: 'https://github.com/Zaunzi/SveltekitWeb3Starter',
		programmingLanguage: 'TypeScript',
		author: { '@type': 'Organization', name: 'Zaunzi', url: 'https://github.com/Zaunzi' }
	};
</script>

<svelte:head>
	<title>sveltekit web3 starter</title>
	<meta name="description" content="A production-ready SvelteKit template for building Web3 dApps with Reown AppKit, Ethers, and Skeleton UI. Wallet integration, multi-chain support, and modern UI out of the box." />
	<meta name="keywords" content="sveltekit, web3, dapp, ethereum, reown, appkit, ethers, skeleton ui, base, wallet connect" />
	<link rel="canonical" href="https://sveltekit-web3-starter.vercel.app/" />
	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="sveltekit web3 starter" />
	<meta property="og:description" content="A production-ready SvelteKit template for building Web3 dApps with Reown AppKit, Ethers, and Skeleton UI." />
	<meta property="og:url" content="https://sveltekit-web3-starter.vercel.app/" />
	<meta property="og:site_name" content="sveltekit web3 starter" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="sveltekit web3 starter" />
	<meta name="twitter:description" content="A production-ready SvelteKit template for building Web3 dApps with Reown AppKit, Ethers, and Skeleton UI." />
	<!-- JSON-LD for rich results -->
	{@html '<script type="application/ld+json">' + JSON.stringify(jsonLd) + '</script>'}
</svelte:head>

<div class="min-h-screen bg-linear-to-b from-surface-100 to-surface-50 dark:from-surface-950 dark:to-surface-900">
	<div class="container mx-auto px-4 py-10 md:py-14">
		<div class="max-w-4xl mx-auto">
			<!-- Hero Section -->
			<section class="text-center mb-16 md:mb-20">
				<h1 class="font-aavegotchi text-4xl md:text-6xl lg:text-7xl font-bold text-surface-900 dark:text-surface-100 mb-5 lowercase tracking-tight">
					sveltekit web3 starter
				</h1>
				<p class="text-lg md:text-xl text-surface-600 dark:text-surface-400 mb-7 max-w-2xl mx-auto leading-relaxed">
					A production-ready template for building Web3 dApps with SvelteKit, Reown AppKit, and Ethers
				</p>
				<a
					href="https://github.com/Zaunzi/SveltekitWeb3Starter"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 btn preset-filled border border-primary-500 text-primary-contrast-500 hover:opacity-90 transition-opacity"
				>
					View on GitHub
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
				</a>
			</section>

			<!-- Welcome Message -->
			<section class="card mb-10 shadow-lg shadow-surface-900/5 dark:shadow-black/20 border border-surface-200-800 rounded-xl overflow-hidden transition-shadow hover:shadow-xl hover:shadow-surface-900/10">
			<div class="card-header bg-surface-100/80 dark:bg-surface-800/80 py-4 px-5">
				<h2 class="card-title font-aavegotchi text-2xl lowercase m-0">welcome to your web3 dapp</h2>
			</div>
			<div class="card-content p-5 md:p-6">
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
		</section>

		<!-- Wallet Status -->
		{#if $isWalletConnected}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
				<!-- Connection Status -->
				<div class="card shadow-lg shadow-surface-900/5 dark:shadow-black/20 border border-surface-200-800 rounded-xl overflow-hidden transition-shadow hover:shadow-xl">
					<div class="card-header bg-surface-100/80 dark:bg-surface-800/80 py-4 px-5">
						<h2 class="card-title font-aavegotchi text-xl lowercase m-0">wallet connected</h2>
					</div>
					<div class="card-content p-5 md:p-6">
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
				<div class="card shadow-lg shadow-surface-900/5 dark:shadow-black/20 border border-surface-200-800 rounded-xl overflow-hidden transition-shadow hover:shadow-xl">
					<div class="card-header bg-surface-100/80 dark:bg-surface-800/80 py-4 px-5">
						<h2 class="card-title font-aavegotchi text-xl lowercase m-0">eth balance</h2>
					</div>
					<div class="card-content p-5 md:p-6">
						<ETHBalance />
					</div>
				</div>
			</div>
		{:else}
			<!-- Not Connected State -->
			<div class="card mb-10 shadow-lg shadow-surface-900/5 dark:shadow-black/20 border border-surface-200-800 rounded-xl overflow-hidden transition-shadow hover:shadow-xl">
				<div class="card-header bg-surface-100/80 dark:bg-surface-800/80 py-4 px-5">
					<h2 class="card-title font-aavegotchi text-xl lowercase m-0">connect your wallet</h2>
				</div>
				<div class="card-content p-5 md:p-6">
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
		<section class="card mb-10 shadow-lg shadow-surface-900/5 dark:shadow-black/20 border border-surface-200-800 rounded-xl overflow-hidden transition-shadow hover:shadow-xl">
			<div class="card-header bg-surface-100/80 dark:bg-surface-800/80 py-4 px-5">
				<h2 class="card-title font-aavegotchi text-2xl lowercase m-0">getting started</h2>
			</div>
			<div class="card-content p-5 md:p-6">
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
		</section>

		<!-- Testnet Faucets -->
		<section class="card shadow-lg shadow-surface-900/5 dark:shadow-black/20 border border-surface-200-800 rounded-xl overflow-hidden transition-shadow hover:shadow-xl">
			<div class="card-header bg-surface-100/80 dark:bg-surface-800/80 py-4 px-5">
				<h2 class="card-title font-aavegotchi text-2xl lowercase m-0">get testnet eth</h2>
			</div>
			<div class="card-content p-5 md:p-6">
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
		</section>

			<!-- Footer -->
			<footer class="mt-16 pt-8 border-t border-surface-200-800 text-center">
				<p class="text-sm text-surface-500 dark:text-surface-500 mb-2">
					Template by <a href="https://github.com/Zaunzi" target="_blank" rel="noopener noreferrer" class="text-primary-500 hover:text-primary-600 underline">Zaunzi</a>
				</p>
				<a
					href="https://github.com/Zaunzi/SveltekitWeb3Starter"
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm text-primary-500 hover:text-primary-600 underline"
				>
					github.com/Zaunzi/SveltekitWeb3Starter
				</a>
			</footer>
		</div>
	</div>
</div>
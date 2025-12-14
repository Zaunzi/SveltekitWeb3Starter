import { browser } from '$app/environment';
import { createAppKit } from '@reown/appkit';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { base, baseSepolia } from '@reown/appkit/networks';

// Only initialize in browser environment
let modal: ReturnType<typeof createAppKit> | undefined = undefined;

if (browser) {
	const projectId = import.meta.env.VITE_PROJECT_ID;
	if (!projectId) {
		throw new Error('VITE_PROJECT_ID is not set. Please set it in your .env file');
	}

	// Create adapter
	const ethersAdapter = new EthersAdapter();
	// Initialize AppKit with clean configuration
	modal = createAppKit({
		adapters: [ethersAdapter],
		networks: [base, baseSepolia],
		defaultNetwork: baseSepolia,
		projectId,
		features: {
			swaps: true,
			onramp: true,
			receive: true,
			send: true,
			email: true,
			emailShowWallets: true,
			socials: ['apple', 'discord', 'facebook', 'farcaster', 'github', 'google', 'x'],
			history: true,
			analytics: true,
			allWallets: true,
			smartSessions: true,
			legalCheckbox: true,
			connectorTypeOrder: ['recent', 'recommended', 'walletConnect'],
			// connectMethodsOrder: false,
			// walletFeaturesOrder: false,
			collapseWallets: true,
			pay: true,
			reownAuthentication: true
		},
		themeMode: 'dark',
		themeVariables: {
			'--w3m-accent': '#66e985',
			'--w3m-border-radius-master': '8px'
		},
		metadata: {
			name: 'Sveltekit Ethers Template',
			description: 'A SvelteKit template for building dapps with Reown and Ethers',
			url: typeof window !== 'undefined' ? window.location.origin : 'https://localhost',
			icons: ['https://avatars.githubusercontent.com/u/179229932?s=200&v=4']
		}
	});
}

export { modal };

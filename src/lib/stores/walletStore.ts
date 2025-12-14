import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { modal } from '../config/appkit';
import { base, baseSepolia } from '@reown/appkit/networks';
import type {
	ThemeControllerState,
	UseAppKitAccountReturn,
	UseAppKitNetworkReturn
} from '@reown/appkit';

// Wallet state interface
interface WalletState {
	account: {
		address?: string;
		isConnected: boolean;
		chainId?: number;
		walletName?: string;
	};
	network: {
		chainId?: number;
		name?: string;
	};
	theme: {
		themeMode: string;
		themeVariables: Record<string, string>;
	};
	isInitialized: boolean;
	isLoading: boolean;
	error?: string;
}

// Initial state
const initialState: WalletState = {
	account: {
		isConnected: false
	},
	network: {},
	theme: {
		themeMode: 'dark',
		themeVariables: {}
	},
	isInitialized: false,
	isLoading: false
};

// Create the main wallet store
export const walletStore = writable<WalletState>(initialState);

// Derived stores for easy access
export const account = derived(walletStore, ($store) => $store.account);
export const network = derived(walletStore, ($store) => $store.network);
export const theme = derived(walletStore, ($store) => $store.theme);
export const isWalletConnected = derived(walletStore, ($store) => $store.account.isConnected);
export const isLoading = derived(walletStore, ($store) => $store.isLoading);
export const error = derived(walletStore, ($store) => $store.error);

// Initialize AppKit subscriptions once
let isInitialized = false;

function initializeWalletStore() {
	if (!browser || isInitialized || !modal) return;

	isInitialized = true;

	// Subscribe to account changes
	modal.subscribeAccount((accountState: UseAppKitAccountReturn) => {
		walletStore.update((state) => ({
			...state,
			account: {
				address: accountState.address,
				isConnected: accountState.isConnected || false,
				chainId: accountState.caipAddress
					? parseInt(accountState.caipAddress.split(':')[1])
					: undefined
				// walletName: accountState.walletName
			},
			isLoading: false,
			error: undefined
		}));
	});

	// Subscribe to network changes
	modal.subscribeNetwork((networkState: Omit<UseAppKitNetworkReturn, 'switchNetwork'>) => {
		walletStore.update((state) => ({
			...state,
			network: {
				chainId:
					typeof networkState.chainId === 'string'
						? parseInt(networkState.chainId)
						: networkState.chainId,
				name: networkState.caipNetworkId || 'Unknown'
			}
		}));
	});

	// Subscribe to theme changes
	modal.subscribeTheme((themeState: ThemeControllerState) => {
		walletStore.update((state) => ({
			...state,
			theme: {
				themeMode: themeState.themeMode || 'dark',
				themeVariables: (themeState.themeVariables as Record<string, string>) || {}
			}
		}));

		// Update document theme
		if (browser) {
			document.documentElement.setAttribute('data-mode', themeState.themeMode || 'dark');
		}
	});

	// Mark as initialized
	walletStore.update((state: WalletState) => ({
		...state,
		isInitialized: true
	}));
}

// Initialize when the store is first accessed
if (browser) {
	initializeWalletStore();
}

// Wallet actions
export const walletActions = {
	// Open wallet modal
	open: async () => {
		if (modal) {
			walletStore.update((state) => ({ ...state, isLoading: true, error: undefined }));
			modal.open();
		}
	},

	// Close wallet modal
	close: async () => {
		if (modal) modal.close();
	},

	// Switch network
	switchNetwork: async (chainId: number) => {
		if (modal) {
			const targetNetwork = [base, baseSepolia].find((net) => net.id === chainId);
			if (targetNetwork) {
				walletStore.update((state) => ({ ...state, isLoading: true, error: undefined }));
				modal.switchNetwork(targetNetwork);
			}
		}
	},

	// Disconnect wallet
	disconnect: async () => {
		if (modal) {
			walletStore.update((state) => ({ ...state, isLoading: true, error: undefined }));
			try {
				await modal.disconnect();
				// Reset to initial state
				walletStore.update((state) => ({
					...state,
					account: { isConnected: false },
					network: {},
					isLoading: false,
					error: undefined
				}));
			} catch (err) {
				walletStore.update((state) => ({
					...state,
					isLoading: false,
					error: err instanceof Error ? err.message : 'Failed to disconnect'
				}));
			}
		}
	},

	// Get wallet provider
	getProvider: (): any => {
		if (modal) {
			return modal.getWalletProvider();
		}
		return null;
	},

	// Clear error
	clearError: () => {
		walletStore.update((state) => ({ ...state, error: undefined }));
	}
};

export const getSupportedChainIds = () => [base.id, baseSepolia.id];

export const isChainSupported = (chainId: number) => {
	return getSupportedChainIds().includes(chainId as any);
};

// TODO: Remove this, in favour of the networks provided by users in appkit, utilising '@reown/appkit/networks'
export const getChainName = (chainId: number) => {
	switch (chainId) {
		case base.id:
			return 'Base';
		case baseSepolia.id:
			return 'Base Sepolia';
		default:
			return 'Unknown';
	}
};

// TODO: Remove this, in favour of the networks provided by users in appkit, utilising '@reown/appkit/networks'
export const getChainInfo = (chainId: number) => {
	switch (chainId) {
		case base.id:
			return { name: 'Base', symbol: 'ETH', decimals: 18, explorer: 'https://basescan.org' };
		case baseSepolia.id:
			return {
				name: 'Base Sepolia',
				symbol: 'ETH',
				decimals: 18,
				explorer: 'https://sepolia.basescan.org'
			};
		default:
			return { name: 'Unknown', symbol: 'ETH', decimals: 18, explorer: '' };
	}
};

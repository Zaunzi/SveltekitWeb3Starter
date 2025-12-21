// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Common type definitions used across the application

export interface WalletState {
	account: {
		address?: string;
		isConnected: boolean;
		chainId?: number;
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

export interface ChainInfo {
	name: string;
	symbol: string;
	decimals: number;
	explorer: string;
}

export interface ContractInteractionProps {
	contractAddress: string;
	abi: any[];
	functionName: string;
	args?: any[];
	value?: string;
	disabled?: boolean;
	children: any;
}

export {};

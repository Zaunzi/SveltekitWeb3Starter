import { base, baseSepolia } from '@reown/appkit/networks';

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
	// Example contract addresses - replace with your actual contracts
	EXAMPLE_CONTRACT: {
		[baseSepolia.id]: '0x0000000000000000000000000000000000000000', // Base Sepolia
		[base.id]: '0x0000000000000000000000000000000000000000' // Base Mainnet
	}
} as const;

// Common contract ABIs
export const COMMON_ABIS = {
	// ERC-20 Token ABI
	ERC20: [
		'function name() view returns (string)',
		'function symbol() view returns (string)',
		'function decimals() view returns (uint8)',
		'function totalSupply() view returns (uint256)',
		'function balanceOf(address owner) view returns (uint256)',
		'function transfer(address to, uint256 amount) returns (bool)',
		'function allowance(address owner, address spender) view returns (uint256)',
		'function approve(address spender, uint256 amount) returns (bool)',
		'function transferFrom(address from, address to, uint256 amount) returns (bool)',
		'event Transfer(address indexed from, address indexed to, uint256 value)',
		'event Approval(address indexed owner, address indexed spender, uint256 value)'
	],

	// ERC-721 NFT ABI
	ERC721: [
		'function name() view returns (string)',
		'function symbol() view returns (string)',
		'function tokenURI(uint256 tokenId) view returns (string)',
		'function ownerOf(uint256 tokenId) view returns (address)',
		'function balanceOf(address owner) view returns (uint256)',
		'function safeTransferFrom(address from, address to, uint256 tokenId)',
		'function transferFrom(address from, address to, uint256 tokenId)',
		'function approve(address to, uint256 tokenId)',
		'function setApprovalForAll(address operator, bool approved)',
		'function getApproved(uint256 tokenId) view returns (address)',
		'function isApprovedForAll(address owner, address operator) view returns (bool)',
		'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
		'event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)',
		'event ApprovalForAll(address indexed owner, address indexed operator, bool approved)'
	]
} as const;

// Helper function to get contract address for current network
export function getContractAddress(
	contractName: keyof typeof CONTRACT_ADDRESSES,
	chainId: number
): string {
	const contract = CONTRACT_ADDRESSES[contractName];
	if (!contract) {
		throw new Error(`Contract ${contractName} not found`);
	}

	const address = contract[chainId as keyof typeof contract];
	if (!address) {
		throw new Error(`Contract ${contractName} not deployed on chain ${chainId}`);
	}

	return address;
}

// Helper function to check if contract is deployed on current network
export function isContractDeployed(
	contractName: keyof typeof CONTRACT_ADDRESSES,
	chainId: number
): boolean {
	try {
		getContractAddress(contractName, chainId);
		return true;
	} catch {
		return false;
	}
}

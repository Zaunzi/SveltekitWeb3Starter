import { ethers } from 'ethers';
import { browser } from '$app/environment';
import { walletActions } from '$lib/stores/walletStore';

// Get provider instance
export function getProvider(): ethers.BrowserProvider | null {
  if (!browser) return null;
  
  const provider = walletActions.getProvider();
  if (!provider) return null;
  
  return new ethers.BrowserProvider(provider);
}

// Get signer instance
export async function getSigner(): Promise<ethers.JsonRpcSigner | null> {
  const provider = getProvider();
  if (!provider) return null;
  
  try {
    return await provider.getSigner();
  } catch (error) {
    console.error('Failed to get signer:', error);
    return null;
  }
}

// Format address for display
export function formatAddress(address: string, startLength = 6, endLength = 4): string {
  if (!address) return '';
  if (address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

// Format token amount
export function formatTokenAmount(amount: string | bigint, decimals: number, displayDecimals = 4): string {
  try {
    const formatted = ethers.formatUnits(amount, decimals);
    const num = parseFloat(formatted);
    
    if (num === 0) return '0';
    if (num < 0.0001) return '< 0.0001';
    if (num < 1) return num.toFixed(displayDecimals);
    if (num < 1000) return num.toFixed(2);
    
    return num.toLocaleString();
  } catch (error) {
    console.error('Failed to format token amount:', error);
    return '0';
  }
}

// Parse token amount
export function parseTokenAmount(amount: string, decimals: number): bigint {
  try {
    return ethers.parseUnits(amount, decimals);
  } catch (error) {
    console.error('Failed to parse token amount:', error);
    return 0n;
  }
}

// Check if address is valid
export function isValidAddress(address: string): boolean {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
}

// Get transaction explorer URL
export function getExplorerUrl(chainId: number, txHash: string): string {
  switch (chainId) {
    case 8453: // Base Mainnet
      return `https://basescan.org/tx/${txHash}`;
    case 84532: // Base Sepolia
      return `https://sepolia.basescan.org/tx/${txHash}`;
    default:
      return `https://etherscan.io/tx/${txHash}`;
  }
}

// Get address explorer URL
export function getAddressExplorerUrl(chainId: number, address: string): string {
  switch (chainId) {
    case 8453: // Base Mainnet
      return `https://basescan.org/address/${address}`;
    case 84532: // Base Sepolia
      return `https://sepolia.basescan.org/address/${address}`;
    default:
      return `https://etherscan.io/address/${address}`;
  }
}

// Wait for transaction confirmation
export async function waitForTransaction(txHash: string, confirmations = 1): Promise<ethers.TransactionReceipt | null> {
  const provider = getProvider();
  if (!provider) return null;
  
  try {
    return await provider.waitForTransaction(txHash, confirmations);
  } catch (error) {
    console.error('Failed to wait for transaction:', error);
    return null;
  }
}

// Estimate gas for transaction
export async function estimateGas(tx: ethers.TransactionRequest): Promise<bigint | null> {
  const provider = getProvider();
  if (!provider) return null;
  
  try {
    return await provider.estimateGas(tx);
  } catch (error) {
    console.error('Failed to estimate gas:', error);
    return null;
  }
}

// Get current gas price (using feeData in ethers v6)
export async function getGasPrice(): Promise<bigint | null> {
  const provider = getProvider();
  if (!provider) return null;
  
  try {
    const feeData = await provider.getFeeData();
    return feeData.gasPrice || null;
  } catch (error) {
    console.error('Failed to get gas price:', error);
    return null;
  }
}

// Convert wei to ether
export function weiToEther(wei: string | bigint): string {
  try {
    return ethers.formatEther(wei);
  } catch (error) {
    console.error('Failed to convert wei to ether:', error);
    return '0';
  }
}

// Convert ether to wei
export function etherToWei(ether: string): bigint {
  try {
    return ethers.parseEther(ether);
  } catch (error) {
    console.error('Failed to convert ether to wei:', error);
    return 0n;
  }
}

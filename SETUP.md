# SvelteKit Web3 Starter Setup Guide

This guide will help you set up and customize the SvelteKit Web3 Starter template for your project.

## Prerequisites

- Node.js ^20.19 || ^22.12 || >=24 or higher
- npm or yarn package manager
- A Reown Cloud project ID (free at [cloud.reown.com](https://cloud.reown.com/))

## Quick Setup

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo-url>
   cd template
   pnpm i
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your Reown project ID:
   ```
   VITE_PROJECT_ID=your_project_id_here
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## Getting Your Reown Project ID

1. Go to [cloud.reown.com](https://cloud.reown.com/)
2. Sign up for a free account
3. Create a new project
4. Copy your project ID from the dashboard
5. Add it to your `.env` file

## Customization

### Adding Your Contract

1. **Update contract addresses** in `src/lib/config/contracts.ts`:
   ```typescript
   export const CONTRACT_ADDRESSES = {
     MY_CONTRACT: {
       [baseSepolia.id]: '0x...', // Your contract on Base Sepolia
       [base.id]: '0x...' // Your contract on Base Mainnet
     }
   };
   ```

2. **Add your contract ABI** to the same file or create a new file:
   ```typescript
   export const MY_CONTRACT_ABI = [
     "function myFunction() external",
     "function myViewFunction() external view returns (uint256)",
     // ... your contract functions
   ];
   ```

3. **Use in components**:
   ```svelte
   <script>
     import { CONTRACT_ADDRESSES, MY_CONTRACT_ABI } from '$lib/config/contracts';
     import ContractInteraction from '$lib/components/ContractInteraction.svelte';
   </script>

   <ContractInteraction 
     contractAddress={CONTRACT_ADDRESSES.MY_CONTRACT[84532]} // Base Sepolia
     abi={MY_CONTRACT_ABI}
     functionName="myFunction"
     onSuccess={(result) => console.log('Success!', result)}
   >
     Call My Function
   </ContractInteraction>
   ```

### Adding New Networks

1. **Import the network** in `src/lib/config/appkit.ts`:
   ```typescript
   import { polygon, polygonMumbai } from '@reown/appkit/networks';
   ```

2. **Add to networks array**:
   ```typescript
   networks: [base, baseSepolia, polygon, polygonMumbai]
   ```

3. **Update wallet store** in `src/lib/stores/walletStore.ts`:
   ```typescript
   export const getSupportedChainIds = () => [base.id, baseSepolia.id, polygon.id, polygonMumbai.id];

   export const getChainName = (chainId: number) => {
     switch (chainId) {
       case base.id:
         return 'Base';
       case baseSepolia.id:
         return 'Base Sepolia';
       case polygon.id:
         return 'Polygon';
       case polygonMumbai.id:
         return 'Polygon Mumbai';
       default:
         return 'Unknown';
     }
   };
   ```

### Customizing the UI

1. **Update theme colors** in `src/lib/mint.css`
2. **Modify components** in `src/lib/components/`
3. **Change the homepage** in `src/routes/+page.svelte`
4. **Update the navbar** in `src/lib/components/Navbar.svelte`

### Adding New Pages

1. **Create a new route** in `src/routes/`:
   ```svelte
   <!-- src/routes/my-page/+page.svelte -->
   <script>
     import { account, isWalletConnected } from '$lib/stores/walletStore';
   </script>

   <h1>My Custom Page</h1>
   
   {#if $isWalletConnected}
     <p>Welcome, {account.address}!</p>
   {:else}
     <p>Please connect your wallet to continue.</p>
   {/if}
   ```

2. **Add navigation** in `src/lib/components/Navbar.svelte`:
   ```svelte
   <a href="/my-page" class="text-surface-700 dark:text-surface-300 hover:text-surface-900 dark:hover:text-surface-100">
     My Page
   </a>
   ```

## Web3 Components Reference

### WalletStatus
Complete wallet connection component with network status and disconnect functionality.

```svelte
<WalletStatus />
```

### ETHBalance
Displays ETH balance with automatic updates.

```svelte
<!-- ETH balance -->
<ETHBalance />
```

### TransactionButton
Button that validates wallet connection and network.

```svelte
<TransactionButton onClick={handleTransaction}>
  Send Transaction
</TransactionButton>
```

### ContractInteraction
Handles contract function calls with error handling.

```svelte
<ContractInteraction 
  contractAddress="0x..."
  abi={contractABI}
  functionName="transfer"
  args={[toAddress, amount]}
  value="0"
  onSuccess={handleSuccess}
  onError={handleError}
>
  Transfer Tokens
</ContractInteraction>
```

## Wallet Store Usage

```typescript
import { 
  account, 
  network, 
  isWalletConnected, 
  walletActions,
  isChainSupported,
  getChainName 
} from '$lib/stores/walletStore';

// Check wallet state
$: console.log('Connected:', $isWalletConnected);
$: console.log('Address:', $account.address);
$: console.log('Network:', $network.chainId);

// Perform actions
walletActions.open(); // Open wallet modal
walletActions.switchNetwork(84532); // Switch to Base Sepolia
walletActions.disconnect(); // Disconnect wallet

// Check network support
if ($network.chainId && isChainSupported($network.chainId)) {
  console.log('Supported network:', getChainName($network.chainId));
}
```

## Web3 Utilities

```typescript
import { 
  formatAddress, 
  formatTokenAmount, 
  getProvider, 
  getSigner,
  isValidAddress,
  getExplorerUrl 
} from '$lib/utils/web3';

// Format addresses
const shortAddress = formatAddress('0x1234...5678');

// Format token amounts
const formatted = formatTokenAmount('1000000000000000000', 18);

// Get provider and signer
const provider = getProvider();
const signer = await getSigner();

// Validate addresses
const isValid = isValidAddress('0x...');

// Get explorer URLs
const txUrl = getExplorerUrl(84532, '0x...');
```

## Deployment

### Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

### Other Platforms
This template works with any platform that supports SvelteKit. Just make sure to:
1. Set your `VITE_PROJECT_ID` environment variable
2. Build with `npm run build`
3. Serve the `build` directory

## Troubleshooting

### Common Issues

1. **"VITE_PROJECT_ID is not set"**
   - Make sure you have a `.env` file with your project ID
   - Restart your development server after adding environment variables

2. **Wallet not connecting**
   - Check that your project ID is correct
   - Make sure you're using a supported wallet (MetaMask, WalletConnect, etc.)

3. **Network not supported**
   - The template supports Base Sepolia (84532) and Base Mainnet (8453)
   - Add more networks in `src/lib/config/appkit.ts` if needed

4. **Build errors**
   - Run `npm run check` to see TypeScript errors
   - Make sure all imports are correct
   - Check that all environment variables are set

### Getting Help

- Check the [SvelteKit documentation](https://kit.svelte.dev/docs)
- Read the [Reown AppKit docs](https://docs.reown.com/appkit)
- Look at the [Ethers.js documentation](https://docs.ethers.org/)
- Review the [Skeleton UI docs](https://skeleton.dev/)

## Next Steps

1. **Add your smart contracts** and update the contract configuration
2. **Customize the UI** to match your brand
3. **Add more pages** and features
4. **Test on testnet** before deploying to mainnet
5. **Deploy and share** your dApp!

Happy building! 🚀

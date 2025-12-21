# SvelteKit Web3 Starter

A production-ready SvelteKit template for building Web3 dApps with Reown AppKit, Ethers.js, and Skeleton UI.

## Features

- 🔗 **Wallet Integration**: Built-in Reown AppKit for seamless wallet connectivity
- 🌐 **Multi-Chain Support**: Base Sepolia testnet and Base mainnet out of the box
- 🎨 **Modern UI**: Skeleton UI with dark/light theme support
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🔧 **TypeScript**: Full TypeScript support with proper type definitions
- ⚡ **SvelteKit**: Fast, modern web framework with excellent developer experience
- 🧩 **Reusable Components**: Pre-built components for common Web3 interactions
- 🔄 **Real-time Updates**: Live wallet state and network status updates
- 💰 **ETH Balance**: Automatic ETH balance fetching and display
- 📊 **Transaction Handling**: Built-in transaction status tracking and error handling
- 🚰 **Testnet Faucets**: Built-in links to Base Sepolia faucets for development
- 🌓 **Theme Switching**: Light/dark mode toggle with persistence

## Getting Started

### Prerequisites

- **Node.js 20.19.0+ or 22.12.0+** (see `.nvmrc` for recommended version)
  - We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions
  - Run `nvm use` after cloning to automatically use the correct version
- **pnpm** (strongly recommended) - see installation instructions below
- A Reown Cloud project ID

### Installing pnpm

This project uses **pnpm** as the package manager. pnpm offers significant advantages:

- 🚀 **Faster installs** - Up to 2x faster than npm
- 💾 **Disk space efficient** - Uses hard links to save disk space
- 🔒 **Strict dependency resolution** - Prevents phantom dependencies
- ✅ **Better monorepo support** - Excellent for large projects

**Install pnpm:**
```bash
# Using npm
npm install -g pnpm

# Using Homebrew (macOS)
brew install pnpm

# Using standalone script
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

> ⚠️ **Important:** While npm may work, we strongly recommend using pnpm for the best experience. The project is configured and tested with pnpm.

### Setup

1. **Clone this repository**
   ```bash
   git clone <your-repo-url>
   cd template
   ```

2. **Use the correct Node.js version**
   ```bash
   # If using nvm
   nvm use
   
   # Or manually install/use Node.js 20.19.0+
   nvm install 20.19.0
   nvm use 20.19.0
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Get your project ID from [Reown Cloud](https://cloud.reown.com/) and add it to `.env`:
   ```
   VITE_PROJECT_ID=your_project_id_here
   ```

5. **Start the development server**
   ```bash
   pnpm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── ContractInteraction.svelte  # Contract interaction component
│   │   ├── ETHBalance.svelte           # ETH balance display
│   │   ├── LightSwitch.svelte          # Theme toggle component
│   │   ├── Navbar.svelte               # Navigation with wallet connect
│   │   ├── NetworkStatus.svelte        # Network status display
│   │   ├── TransactionButton.svelte    # Transaction handling component
│   │   ├── WalletConnect.svelte        # Enhanced wallet connect component
│   │   └── WalletStatus.svelte         # Main wallet status component
│   ├── config/
│   │   ├── appkit.ts                   # Reown AppKit configuration
│   │   └── contracts.ts                # Contract configurations
│   ├── stores/
│   │   ├── walletStore.ts              # Wallet state management
│   │   └── index.ts                    # Store exports
│   ├── utils/
│   │   └── web3.ts                     # Web3 utility functions
│   └── mint.css                        # Skeleton UI theme
├── routes/
│   ├── +layout.svelte                  # Main layout with navbar
│   └── +page.svelte                    # Homepage with wallet demo
├── app.css                             # Global styles
├── app.d.ts                            # TypeScript definitions
└── app.html                            # HTML template
```

## Usage

### Wallet Connection

The template includes a complete wallet integration system:

```typescript
import { account, network, isWalletConnected, walletActions } from '$lib/stores/walletStore';

// Check if wallet is connected
if ($isWalletConnected) {
  console.log('Connected to:', $account.address);
  console.log('Network:', $network.chainId);
}

// Open wallet modal
walletActions.open();

// Switch network (async)
await walletActions.switchNetwork(8453); // Base mainnet
```

### Blockchain Interactions

Use Ethers.js for blockchain interactions:

```typescript
import { ethers } from 'ethers';
import { walletActions } from '$lib/stores/walletStore';

async function getBalance() {
  const provider = walletActions.getProvider();
  if (provider) {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const balance = await ethersProvider.getBalance(address);
    return ethers.formatEther(balance);
  }
}
```

### Theme Management

The template includes automatic theme switching:

```typescript
import { modal } from '$lib/config/appkit';

// Switch to dark mode
modal.setThemeMode('dark');

// Switch to light mode  
modal.setThemeMode('light');
```

## Available Scripts

All scripts should be run with `pnpm`:

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run check` - Run TypeScript checks (ensures zero errors/warnings)
- `pnpm run check:watch` - Run TypeScript checks in watch mode

### Code Quality

This project includes pre-commit hooks (via Husky) that automatically:
- Run TypeScript type checking (`pnpm run check`)
- Lint and format staged files with ESLint and Prettier

This ensures code quality and prevents commits with errors or warnings.

## Supported Networks

- **Base Sepolia** (Chain ID: 84532) - Testnet
- **Base** (Chain ID: 8453) - Mainnet

## Customization

### Adding New Networks

Update `src/lib/config/appkit.ts`:

```typescript
import { polygon, polygonMumbai } from '@reown/appkit/networks';

// Add to networks array
networks: [base, baseSepolia, polygon, polygonMumbai]
```

### Custom Themes

Modify `src/lib/mint.css` or create new theme files in the `src/lib/` directory.

### Adding Components

Create new components in `src/lib/components/` and import them where needed.

## Available Components

### WalletStatus.svelte
Main wallet connection component with network status, address display, and disconnect functionality.

```svelte
<WalletStatus />
```

### ETHBalance.svelte
Shows the current ETH balance for the connected wallet.

```svelte
<ETHBalance />
```

### NetworkStatus.svelte
Displays current network status and online/offline state.

```svelte
<NetworkStatus />
```

### TransactionButton.svelte
Handles transaction sending with loading states and error handling.

```svelte
<TransactionButton>
  Send Transaction
</TransactionButton>
```

### ContractInteraction.svelte
Generic component for interacting with smart contracts.

```svelte
<ContractInteraction 
  contractAddress="0x..." 
  abi={contractABI} 
  functionName="transfer"
  args={[recipient, amount]}
>
  Transfer Tokens
</ContractInteraction>
```

### LightSwitch.svelte
Theme toggle component for switching between light and dark modes.

```svelte
<LightSwitch />
```

## Development Tips

### Using pnpm Commands

Replace any `npm` commands with `pnpm`:

```bash
# Install dependencies
pnpm install

# Add a new dependency
pnpm add <package-name>

# Add a dev dependency
pnpm add -D <package-name>

# Remove a dependency
pnpm remove <package-name>
```

### Node.js Version Management

If you're using nvm, the project includes a `.nvmrc` file. Simply run:
```bash
nvm use
```

This will automatically switch to the correct Node.js version (20.19.0).

## Learn More

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Skeleton UI Documentation](https://skeleton.dev/)
- [Reown AppKit Documentation](https://docs.reown.com/appkit)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Base Network Documentation](https://docs.base.org/)
- [pnpm Documentation](https://pnpm.io/)

## License

MIT License - feel free to use this template for your projects!

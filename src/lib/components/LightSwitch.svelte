<script lang="ts">
    import { Switch } from '@skeletonlabs/skeleton-svelte';
    import { modal } from '$lib/config/appkit';
    import { browser } from '$app/environment';
    // Icons
    import IconMoon from '@lucide/svelte/icons/moon';
    import IconSun from '@lucide/svelte/icons/sun';
  
    let checked = $state(false);
    
    // Type assertion for Switch component - Skeleton v4 snippets work at runtime but type definitions may lag
    const SwitchComponent = Switch as any;
  
    $effect(() => {
      if (!browser) return;
      
      const mode = localStorage.getItem('mode') || 'dark';
      checked = mode === 'dark';
      
      // Set initial theme using Skeleton's data-mode attribute
      document.documentElement.setAttribute('data-mode', mode);
      
      // Also sync with AppKit modal if available
      if (modal) {
        modal.setThemeMode(mode as any);
      }
    });
  
    const onCheckedChange = (event: { checked: boolean }) => {
      if (!browser) return;
      
      const mode = event.checked ? 'dark' : 'light';
      
      // Update Skeleton's data-mode attribute
      document.documentElement.setAttribute('data-mode', mode);
      
      localStorage.setItem('mode', mode);
      checked = event.checked;
      
      // Sync with AppKit modal
      if (modal) {
        modal.setThemeMode(mode);
      }
    };
  </script>
  
  <svelte:head>
    <!-- TODO: Remove duplicated mode initialization - consolidate with app.html and +layout.svelte -->
    <script>
      if (typeof window !== 'undefined') {
        const mode = localStorage.getItem('mode') || 'dark';
        document.documentElement.setAttribute('data-mode', mode);
      }
    </script>
  </svelte:head>
  
  <SwitchComponent 
    name="mode"  
    checked={checked} 
    onCheckedChange={onCheckedChange}
  >
    {#snippet inactiveChild()}<IconSun size="14" />{/snippet}
    {#snippet activeChild()}<IconMoon size="14" />{/snippet}
  </SwitchComponent>

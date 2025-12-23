<script lang="ts">
  import { Switch } from '@skeletonlabs/skeleton-svelte';
  import { modal } from '$lib/config/appkit';
  import { browser } from '$app/environment';

  let checked = $state(false);

  // Initialize from localStorage on mount
  $effect(() => {
    if (!browser) return;
    
    const mode = localStorage.getItem('mode') || 'dark';
    checked = mode === 'dark';
  });

  const onCheckedChange = (event: { checked: boolean }) => {
    if (!browser) return;
    
    const mode = event.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('mode', mode);
    checked = event.checked;
    
    // Sync with AppKit modal if available
    if (modal) {
      modal.setThemeMode(mode);
    }
  };
</script>

<svelte:head>
  <script>
    if (typeof window !== 'undefined') {
      const mode = localStorage.getItem('mode') || 'dark';
      document.documentElement.setAttribute('data-mode', mode);
    }
  </script>
</svelte:head>

<Switch 
  name="mode"  
  {checked} 
  onCheckedChange={onCheckedChange}
>
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.HiddenInput />
</Switch>

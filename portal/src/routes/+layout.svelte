<script lang="ts">
  import { dev } from '$app/environment';
  import { authStore } from '$lib/stores';

  /**
   * Pre-load authentication state
   */
  $authStore;

  if (dev) console.log($authStore);
</script>

<div
  class="w-full h-screen min-h-screen
          text-white bg-background">
  <slot />
</div>

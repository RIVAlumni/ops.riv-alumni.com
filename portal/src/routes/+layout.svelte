<script lang="ts">
  import { authStore } from '$lib/stores';

  /**
   * Pre-load authentication state
   */
  $authStore;
</script>

<div
  class="w-full h-screen min-h-screen
          text-white bg-background">
  <slot />
</div>

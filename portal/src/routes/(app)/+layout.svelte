<script lang="ts">
  import { Navbar } from '$lib/components/navbar';
</script>

<div
  class="w-full min-h-screen
          flex flex-col bg-background">
  <Navbar />

  <main class="flex flex-col">
    <slot />
  </main>
</div>

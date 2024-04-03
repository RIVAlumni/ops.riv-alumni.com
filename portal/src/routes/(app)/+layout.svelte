<script lang="ts">
  import { Navbar } from '$lib/components/navbar';
</script>

<div class="flex flex-col bg-background">
  <Navbar />

  <main>
    <slot />
  </main>
</div>

<script lang="ts">
  import { Navbar } from '$lib/components/navbar';
  import { Footer } from '$lib/components/footer';
</script>

<div
  class="w-full min-h-screen
          flex flex-col bg-background">
  <Navbar />

  <main class="flex flex-col">
    <slot />
  </main>

  <Footer />
</div>

<script lang="ts">
  import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
  <title>Sign in - RIVAlumni Portal</title>
</svelte:head>

<div class="h-full flex flex-col md:flex-row">
  <!-- RIVAlumni Branding -->
  <p class="z-20 absolute left-10 top-10 text-lg text-white font-medium">
    RIVAlumni <span class="font-bold">Portal</span>
  </p>

  <!-- Left side -->
  <div
    class="p-10 relative border-r
              hidden md:flex
              flex-col flex-1 justify-end">
    <!-- Cover image -->
    <div
      class="z-10 absolute inset-0
              bg-cover bg-center bg-img-signin">
    </div>

    <div class="z-20 relative">
      <blockquote class="space-y-2">
        <p class="text-lg text-white">
          Faces of RIVA; from left-to-right,
          <span class="font-bold"> Kathryn Ho </span>, and
          <span class="font-bold">Stella Tan</span>
        </p>
        <footer class="text-sm text-white">
          Partnership Appreciation Presentation (2023)
        </footer>
      </blockquote>
    </div>
  </div>

  <!-- Right side -->
  <div
    class="p-10 relative flex-1
            flex flex-col justify-center">
    <div
      class="mx-auto max-w-sm
              space-y-6 text-center">
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold tracking-tight">
          Continue with an identity
        </h1>
        <p class="text-sm text-muted-foreground">
          Use your school account for faster verification process
        </p>
      </div>

      <div class="space-y-2">
        <Button
          type="button"
          variant="outline"
          class="w-full">
          <i class="fa-brands fa-google mr-2"></i>
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          class="w-full">
          <i class="fa-brands fa-microsoft mr-2"></i>
          Microsoft
        </Button>
      </div>

      <p class="px-8 text-center text-sm text-muted-foreground">
        By continuing, you agree to our
        <a
          href="/terms"
          class="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>
        and
        <a
          href="/privacy"
          class="underline underline-offset-4 hover:text-primary">
          Privacy Policy.
        </a>
      </p>
    </div>
  </div>
</div>

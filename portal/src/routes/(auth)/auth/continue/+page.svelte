<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { signInGoogleProvider } from '$lib/firebase/auth';
</script>

<svelte:head>
  <title>Sign in - RIVAlumni Portal</title>
</svelte:head>

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
      class="w-full"
      on:click="{signInGoogleProvider}">
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

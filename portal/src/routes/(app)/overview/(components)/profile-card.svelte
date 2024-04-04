<script lang="ts">
  import Person from 'svelte-radix/Person.svelte';
  import ArrowRight from 'svelte-radix/ArrowRight.svelte';

  import * as Card from '$lib/components/ui/card';
  import * as Avatar from '$lib/components/ui/avatar';

  import { Button } from '$lib/components/ui/button';
</script>

<Card.Root
  class="sm:col-span-2
          bg-cover bg-no-repeat
          bg-right-top bg-img-profile-card">
  <Card.Header class="pb-4">
    <Avatar.Root class="w-28 h-28 my-5">
      <Avatar.Image
        src=""
        alt="Profile Picture" />

      <Avatar.Fallback class="flex flex-col justify-center">
        <Person class="w-10 h-10" />
      </Avatar.Fallback>
    </Avatar.Root>

    <Card.Title class="text-4xl">Sign in to your account</Card.Title>
    <Card.Description>
      Get the full experience of being an alumni by signing into your account
      now
    </Card.Description>
  </Card.Header>
  <Card.Footer>
    <Button href="/auth/continue">
      Continue
      <ArrowRight class="ml-1 w-5 h-5" />
    </Button>
  </Card.Footer>
</Card.Root>

<script lang="ts">
  import ArrowRightIcon from 'lucide-svelte/icons/arrow-right';

  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';

  export let step: number;
</script>

<div class="space-y-2">
  <span class="font-mono">08. Emergency Contacts</span>
  <h1 class="text-2xl font-semibold tracking-tight">
    What is the name of your next-of-kin?
  </h1>
</div>

<div class="space-y-2">
  <Input
    id="name_of_nok"
    type="text"
    placeholder="Enter your parent's name" />

  <p class="text-sm text-muted-foreground">
    Next-of-Kin (NOK) is a person who can be contacted in case of emergency; it
    can be your parents/guardian/sibling (must be older than 18 years old)
  </p>
</div>

<div class="flex flex-row justify-end">
  <Button
    type="submit"
    class="flex flex-row justify-center gap-1"
    on:click="{() => step++}">
    Next
    <ArrowRightIcon class="w-4 h-4" />
  </Button>
</div>

<script lang="ts">
  import ArrowRightIcon from 'lucide-svelte/icons/arrow-right';

  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';

  export let step: number;
</script>

<div class="space-y-2">
  <span class="font-mono">04. Personal Information</span>
  <h1 class="text-2xl font-semibold tracking-tight">
    What is your mobile number?
  </h1>
</div>

<div class="space-y-2">
  <Input
    id="mobile_number"
    type="text"
    placeholder="81234567" />

  <p class="text-sm text-muted-foreground">
    Enter your WhatsApp registered mobile number. Exclude country code. E.g.,
    81234567
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

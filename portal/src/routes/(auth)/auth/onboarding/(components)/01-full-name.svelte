<script lang="ts">
  import ArrowRightIcon from 'lucide-svelte/icons/arrow-right';

  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';

  export let step: number;
</script>

<div class="space-y-2">
  <span class="font-mono">01. Personal Information</span>
  <h1 class="text-2xl font-semibold tracking-tight">What is your name?</h1>
</div>

<div class="space-y-2">
  <Input
    id="full_name"
    type="text"
    placeholder="Batman Bin Suparman" />

  <p class="text-sm text-muted-foreground">
    Enter your full name as it appears on your EZ-Link / NRIC
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

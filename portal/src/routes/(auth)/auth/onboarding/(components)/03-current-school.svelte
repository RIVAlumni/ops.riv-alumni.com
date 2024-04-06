<script lang="ts">
  import ArrowRightIcon from 'lucide-svelte/icons/arrow-right';

  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';

  export let step: number;
</script>

<div class="space-y-2">
  <span class="font-mono">03. Personal Information</span>
  <h1 class="text-2xl font-semibold tracking-tight">
    What is your current school?
  </h1>
</div>

<div class="space-y-2">
  <Input
    id="current_school"
    type="text"
    placeholder="Raffles Institution" />

  <p class="text-sm text-muted-foreground">
    Enter your current Secondary / Junior College / Polytechnic / University
    school
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

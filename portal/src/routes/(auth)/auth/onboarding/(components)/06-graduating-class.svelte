<script lang="ts">
  import ArrowRightIcon from 'lucide-svelte/icons/arrow-right';

  import * as Select from '$lib/components/ui/select';
  import { Button } from '$lib/components/ui/button';

  const classes = [
    '6 Respect',
    '6 Responsibility',
    '6 Resilience',
    '6 Integrity',
    '6 Care',
    '6 Harmony',
    '6A',
    '6B',
    '6C',
    '6D',
    '6E',
    '6F',
    '6G',
    '6H',
    '6I',
    '6J',
  ];

  export let step: number;
</script>

<div class="space-y-2">
  <span class="font-mono">06. Personal Information</span>
  <h1 class="text-2xl font-semibold tracking-tight">
    Which class did you graduate from?
  </h1>
</div>

<div class="space-y-2">
  <Select.Root>
    <Select.Trigger id="graduating_class">
      <Select.Value placeholder="6 Respect" />
    </Select.Trigger>

    <Select.Content class="overflow-y-auto max-h-40">
      {#each classes as gClass}
        <Select.Item value="{gClass}">{gClass}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
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

<script lang="ts">
  import ArrowRightIcon from 'lucide-svelte/icons/arrow-right';

  import * as Select from '$lib/components/ui/select';
  import { Button } from '$lib/components/ui/button';

  const currentYear = new Date().getFullYear();
  const inaugurationYear = 1999;
  const yearsDifference = currentYear - inaugurationYear + 1;

  const years = [...Array(yearsDifference).keys()]
    .map((i) => i + inaugurationYear)
    .reverse();

  export let step: number;
</script>

<div class="space-y-2">
  <span class="font-mono">07. Personal Information</span>
  <h1 class="text-2xl font-semibold tracking-tight">
    Which year did you graduate in?
  </h1>
</div>

<div class="space-y-2">
  <Select.Root>
    <Select.Trigger id="graduating_year">
      <Select.Value placeholder="{currentYear.toString()}" />
    </Select.Trigger>

    <Select.Content class="overflow-y-auto max-h-40">
      {#each years as year}
        <Select.Item value="{year}">{year}</Select.Item>
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

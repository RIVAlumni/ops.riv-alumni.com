<script lang="ts">
  import ArrowRightIcon from 'lucide-svelte/icons/arrow-right';

  import * as Select from '$lib/components/ui/select';
  import { Button } from '$lib/components/ui/button';

  export let step: number;
</script>

<div class="space-y-2">
  <span class="font-mono">02. Personal Information</span>
  <h1 class="text-2xl font-semibold tracking-tight">What is your gender?</h1>
</div>

<div class="space-y-2">
  <Select.Root>
    <Select.Trigger id="gender">
      <Select.Value placeholder="Male" />
    </Select.Trigger>

    <Select.Content>
      <Select.Item value="male">Male</Select.Item>
      <Select.Item value="female">Female</Select.Item>
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

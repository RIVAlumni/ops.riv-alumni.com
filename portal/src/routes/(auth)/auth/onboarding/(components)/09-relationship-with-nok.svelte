<script lang="ts">
  import ArrowRightIcon from 'lucide-svelte/icons/arrow-right';

  import * as Select from '$lib/components/ui/select';
  import { Button } from '$lib/components/ui/button';

  const relationships = ['Father', 'Mother', 'Guardian', 'Sibling'];

  export let step: number;
</script>

<div class="space-y-2">
  <span class="font-mono">09. Emergency Contacts</span>
  <h1 class="text-2xl font-semibold tracking-tight">
    What is the relationship between you and your next-of-kin?
  </h1>
</div>

<div class="space-y-2">
  <Select.Root>
    <Select.Trigger id="relationship_with_nok">
      <Select.Value placeholder="Father" />
    </Select.Trigger>

    <Select.Content class="overflow-y-auto max-h-40">
      {#each relationships as relationship}
        <Select.Item value="{relationship}">{relationship}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>

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

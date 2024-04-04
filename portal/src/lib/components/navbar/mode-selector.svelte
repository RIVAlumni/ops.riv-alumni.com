<script lang="ts">
  import Check from 'svelte-radix/Check.svelte';
  import CaretSort from 'svelte-radix/CaretSort.svelte';

  import * as Command from '$lib/components/ui/command';
  import * as Popover from '$lib/components/ui/popover';

  import { Button } from '$lib/components/ui/button';

  const modeSelectGroups = [
    {
      label: 'Select a mode',
      modes: [
        { label: 'Normal mode', value: 'normal' },
        { label: 'Privileged mode', value: 'privileged' },
      ],
    },
  ];

  let isModeSelectOpen = false;
  let selectedMode = modeSelectGroups[0].modes[0];
</script>

<Popover.Root bind:open="{isModeSelectOpen}">
  <Popover.Trigger
    asChild
    let:builder>
    <Button
      role="combobox"
      variant="outline"
      builders="{[builder]}"
      aria-label="Select a mode"
      aria-expanded="{isModeSelectOpen}"
      class="w-44 text-foreground justify-between">
      {selectedMode.label}
      <CaretSort class="w-5 h-5 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="p-0 w-44">
    <Command.Root>
      <Command.List>
        <Command.Empty class="p-2">No mode applicable</Command.Empty>
        {#each modeSelectGroups as group}
          <Command.Group heading="{group.label}">
            {#each group.modes as mode}
              <Command.Item
                class="text-sm flex flex-row justify-between"
                value="{mode.value}"
                onSelect="{() => {
                  selectedMode = mode;
                  isModeSelectOpen = false;
                }}">
                {mode.label}
                <Check
                  class="w-5 h-5
                  {selectedMode.value !== mode.value && 'text-transparent'}" />
              </Command.Item>
            {/each}
          </Command.Group>
        {/each}
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>

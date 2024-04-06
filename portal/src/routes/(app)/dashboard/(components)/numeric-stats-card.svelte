<script lang="ts">
  import type { ComponentType } from 'svelte';

  import * as Card from '$lib/components/ui/card';

  export let icon: ComponentType;
  export let title: string;
  export let value: string;
  export let description: string;
</script>

<Card.Root>
  <Card.Header>
    <div class="flex flex-row items-center justify-between">
      <Card.Description>{title}</Card.Description>
      <svelte:component
        this="{icon}"
        class="w-4 h-4 text-muted-foreground" />
    </div>

    <Card.Title class="text-4xl">{value}</Card.Title>
  </Card.Header>

  <Card.Content>
    <p class="text-xs text-muted-foreground">{description}</p>
  </Card.Content>
</Card.Root>

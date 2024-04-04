<script lang="ts">
  import SewingPin from 'svelte-radix/SewingPinFilled.svelte';

  export let eventName: string = 'Unspecified';
  export let eventLocation: string = 'Undetermined';
  export let backgroundImage: string;
</script>

<div class="flex flex-col gap-4">
  <div
    class="w-full h-auto rounded-md
            bg-cover bg-center aspect-video
            transition-all hover:scale-105"
    style="background-image: url({backgroundImage});">
  </div>

  <div class="text-sm space-y-1">
    <h3 class="leading-none font-medium">{eventName}</h3>
    <p
      class="text-xs text-muted-foreground inline-flex flex-row justify-center gap-1">
      <SewingPin
        class="w-4 h-4 text-primary"
        ariaLabel="Event Location" />

      {eventLocation}
    </p>
  </div>
</div>

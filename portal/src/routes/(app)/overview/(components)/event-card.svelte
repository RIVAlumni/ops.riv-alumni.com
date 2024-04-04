<script lang="ts">
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
    <p class="text-xs text-muted-foreground">
      <i
        class="mr-1 text-primary
                fa-sharp fa-solid fa-location-dot"></i>
      {eventLocation}
    </p>
  </div>
</div>

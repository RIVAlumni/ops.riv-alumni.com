<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb';
  import { Separator } from '$lib/components/ui/separator';

  import EventCard from './(components)/event-card.svelte';
  import ProfileCard from './(components)/profile-card.svelte';

  $: year = new Date().getFullYear();
</script>

<svelte:head>
  <title>Overview - RIVAlumni Portal</title>
</svelte:head>

<div
  class="p-4 sm:p-6
          flex flex-col
          gap-4 md:gap-6">
  <nav>
    <Breadcrumb.Root class="flex flex-row">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <a
            href="/"
            class="transition-colors hover:text-foreground">
            Portal
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <a
            href="/overview"
            class="font-bold transition-colors text-foreground">
            Overview
          </a>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </nav>

  <!-- 3-column grid layout -->
  <div
    class="grid auto-rows-max
            items-start gap-8 lg:col-span-2">
    <!-- Content -->
    <div
      class="grid gap-4
              grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <ProfileCard />

      <Card.Root>
        <Card.Header class="pb-4">
          <Card.Description>Upcoming events</Card.Description>
          <Card.Title class="text-4xl">4</Card.Title>
        </Card.Header>
        <Card.Content>
          <p class="text-xs text-muted-foreground">
            for the year of {year}
          </p>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Header class="pb-4">
          <Card.Description>Upcoming volunteer hours</Card.Description>
          <Card.Title class="text-4xl">1,593</Card.Title>
        </Card.Header>
        <Card.Content>
          <p class="text-xs text-muted-foreground">
            to be claimed for the year of {year}
          </p>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="flex flex-col">
      <div class="space-y-1">
        <h2 class="text-2xl font-semibold tracking-tight">Upcoming Events</h2>
        <p class="text-sm text-muted-foreground">
          Next few events that are happening for the year
        </p>
      </div>

      <Separator class="my-4" />

      <div
        class="grid gap-8 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <EventCard
          eventName="RIVA Homecoming 2024"
          eventLocation="Rivervale Primary School"
          backgroundImage="/homecoming.webp" />

        <EventCard
          eventName="Teachers' Day 2024"
          eventLocation="Rivervale Primary School"
          backgroundImage="/teachers-day.webp" />
      </div>
    </div>

    <div class="flex flex-col">
      <div class="space-y-1">
        <h2 class="text-2xl font-semibold tracking-tight">Past Events</h2>
        <p class="text-sm text-muted-foreground">
          Past few events that have already happened
        </p>
      </div>

      <Separator class="my-4" />

      <div
        class="grid gap-8 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <EventCard
          eventName="RIVA Homecoming 2024"
          eventLocation="Rivervale Primary School"
          backgroundImage="/homecoming.webp" />

        <EventCard
          eventName="Teachers' Day 2024"
          eventLocation="Rivervale Primary School"
          backgroundImage="/teachers-day.webp" />
      </div>
    </div>
  </div>
</div>

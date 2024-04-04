<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import * as Avatar from '$lib/components/ui/avatar';

  import { Button } from '$lib/components/ui/button';
  import { SuperLayout } from '$lib/components/superlayout';
</script>

<svelte:head>
  <title>Dashboard - RIVAlumni Portal</title>
</svelte:head>

<SuperLayout>
  <svelte:fragment slot="content">
    <Card.Root class="sm:col-span-2">
      <Card.Header class="pb-4">
        <Card.Title>Sign in to your account</Card.Title>
        <Card.Description>
          Get the full experience of being an alumni by signing into your
          account now.
        </Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button
          href="/auth/continue"
          class="gap-1">
          Continue
          <i class="fa-sharp fa-solid fa-arrow-right"></i>
        </Button>
      </Card.Footer>
    </Card.Root>

    <Card.Root>
      <Card.Header class="pb-4">
        <Card.Description>Total Events</Card.Description>
        <Card.Title class="text-4xl">209</Card.Title>
      </Card.Header>
      <Card.Content>
        <p class="text-xs text-muted-foreground">since inauguration in 20XX</p>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Header class="pb-4">
        <Card.Description>Total Hours</Card.Description>
        <Card.Title class="text-4xl">2,099</Card.Title>
      </Card.Header>
      <Card.Content>
        <p class="text-xs text-muted-foreground">accumulated this year</p>
      </Card.Content>
    </Card.Root>

    <Card.Root class="col-span-4">
      <Card.Header class="pb-4">
        <Card.Title>More cards coming</Card.Title>
        <Card.Description>Layout is still scaffolding</Card.Description>
      </Card.Header>
      <Card.Footer>
        <p class="text-sm text-muted-foreground">Wait a bit longer eh</p>
      </Card.Footer>
    </Card.Root>
  </svelte:fragment>

  <svelte:fragment slot="aside">
    <Card.Root>
      <Card.Header class="flex flex-row items-start gap-2">
        <div class="w-full flex flex-row align-middle justify-between">
          <Card.Title
            class="text-lg
                    flex items-center gap-2">
            Recent Activity
          </Card.Title>

          <div class="flex flex-row items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              class="h-8 gap-1">
              <span class="sm:sr-only md:not-sr-only md:whitespace-nowrap">
                View All
              </span>
              <i class="fa-sharp fa-solid fa-arrow-right"></i>
            </Button>
          </div>
        </div>
      </Card.Header>

      <Card.Content class="p-6 pt-0 text-sm grid gap-8">
        <div class="flex flex-row items-center gap-4">
          <Avatar.Root
            class="w-9 h-9
                    hidden sm:block">
            <Avatar.Image
              src=""
              alt="Reiko Koo" />
            <Avatar.Fallback>RK</Avatar.Fallback>
          </Avatar.Root>

          <div class="flex flex-col gap-1">
            <p class="font-medium leading-none">Reiko Koo</p>
            <p class="text-muted-foreground">
              edited RIVPS Student Leadership Camp 2024 ∙ 5s ago
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            class="ml-auto">
            <i class="fa-sharp fa-solid fa-arrow-right"></i>
          </Button>
        </div>

        <div class="flex flex-row items-center gap-4">
          <Avatar.Root
            class="w-9 h-9
                    hidden sm:block">
            <Avatar.Image
              src=""
              alt="Aaron Teo" />
            <Avatar.Fallback>AT</Avatar.Fallback>
          </Avatar.Root>

          <div class="flex flex-col gap-1">
            <p class="font-medium leading-none">Aaron Teo</p>
            <p class="text-muted-foreground">
              set reiko.koo@riv-alumni.com to super user ∙ 30m ago
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            class="ml-auto">
            <i class="fa-sharp fa-solid fa-arrow-right"></i>
          </Button>
        </div>

        <div class="flex flex-row items-center gap-4">
          <Avatar.Root
            class="w-9 h-9
                    hidden sm:block">
            <Avatar.Image
              src=""
              alt="Brian Wee" />
            <Avatar.Fallback>BW</Avatar.Fallback>
          </Avatar.Root>

          <div class="flex flex-col gap-1">
            <p class="font-medium leading-none">Brian Wee</p>
            <p class="text-muted-foreground">
              completed onboarding process ∙ 23h ago
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            class="ml-auto">
            <i class="fa-sharp fa-solid fa-arrow-right"></i>
          </Button>
        </div>
      </Card.Content>
    </Card.Root>
  </svelte:fragment>
</SuperLayout>

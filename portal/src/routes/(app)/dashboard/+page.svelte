<script lang="ts">
  import User from 'lucide-svelte/icons/user';
  import Users from 'lucide-svelte/icons/users';
  import Ticket from 'lucide-svelte/icons/ticket';
  import CalendarDays from 'lucide-svelte/icons/calendar-days';

  import * as Card from '$lib/components/ui/card';
  import * as Tabs from '$lib/components/ui/tabs';
  import * as Table from '$lib/components/ui/table';
  import * as Avatar from '$lib/components/ui/avatar';

  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';

  import Layout from './(components)/layout.svelte';
  import NumericStatsCard from './(components)/numeric-stats-card.svelte';
</script>

<svelte:head>
  <title>Dashboard - RIVAlumni Portal</title>
</svelte:head>

<Layout>
  <svelte:fragment slot="content">
    <div
      class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <NumericStatsCard
        icon="{User}"
        title="Users"
        value="72"
        description="+10% increase from last month" />

      <NumericStatsCard
        icon="{Users}"
        title="Members"
        value="42"
        description="+10% increase from last month" />

      <NumericStatsCard
        icon="{CalendarDays}"
        title="Events"
        value="12"
        description="+10% increase from last month" />

      <NumericStatsCard
        icon="{Ticket}"
        title="Participations"
        value="40"
        description="+10% increase from last month" />
    </div>

    <Tabs.Root
      value="users"
      class="overflow-hidden">
      <div class="overflow-x-scroll flex flex-row items-center">
        <Tabs.List>
          <Tabs.Trigger value="users">Users</Tabs.Trigger>
          <Tabs.Trigger value="members">Members</Tabs.Trigger>
          <Tabs.Trigger value="events">Events</Tabs.Trigger>
          <Tabs.Trigger value="participations">Participations</Tabs.Trigger>
        </Tabs.List>
      </div>

      <Tabs.Content value="users">
        <Card.Root>
          <Card.Header class="px-7">
            <Card.Title>Users</Card.Title>
          </Card.Header>
          <Card.Content>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Head class="w-32">Display Name</Table.Head>
                  <Table.Head class="hidden sm:table-cell">Email</Table.Head>
                  <Table.Head class="hidden sm:table-cell">Linked</Table.Head>
                  <Table.Head class="hidden sm:table-cell">
                    Suspended
                  </Table.Head>
                  <Table.Head class="text-right">Action</Table.Head>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <p class="font-medium">Aaron Teo</p>
                  </Table.Cell>

                  <Table.Cell class="hidden sm:table-cell">
                    <p class="text-sm text-muted-foreground text-ellipsis">
                      aaron.teo@riv-alumni.com
                    </p>
                  </Table.Cell>

                  <Table.Cell class="hidden sm:table-cell">
                    <Badge
                      class="text-xs"
                      variant="green">
                      Yes
                    </Badge>
                  </Table.Cell>

                  <Table.Cell class="hidden sm:table-cell">
                    <Badge
                      class="text-xs bg-green-600"
                      variant="green">
                      No
                    </Badge>
                  </Table.Cell>

                  <Table.Cell class="text-right">
                    <Button
                      variant="outline"
                      size="sm">
                      Go
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Card.Content>
        </Card.Root>
      </Tabs.Content>
    </Tabs.Root>
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
</Layout>

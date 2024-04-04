<script lang="ts">
  import { page } from '$app/stores';

  import * as Sheet from '$lib/components/ui/sheet';
  import * as Avatar from '$lib/components/ui/avatar';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

  import { Button } from '$lib/components/ui/button';

  const links = [
    { name: 'Overview', href: '/overview' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Events', href: '/events' },
    { name: 'Standing', href: '/standing' },
    { name: 'Reimbursements', href: '/reimbursements' },
  ];
</script>

<header
  class="z-50 top-0 sticky
          px-6 sm:px-8
          h-16 border-b
          bg-opacity-10 backdrop-filter backdrop-blur-lg
          flex flex-row items-center gap-4">
  <nav
    class="hidden md:flex
            gap-6 flex-row items-center
            text-lg font-medium md:text-sm">
    <a
      href="/"
      class="w-8 h-8 aspect-square
              text-lg font-medium md:text-base
              flex flex-row items-center gap-2">
      <img
        src="/favicon.png"
        alt="RIVAlumni Logo"
        class="w-full h-full aspect-square" />
      <span class="sr-only">RIVAlumni Logo</span>
    </a>

    {#each links as { href, name }}
      <a
        {href}
        class:text-foreground="{$page.url.pathname.includes(href)}"
        class:text-muted-foreground="{!$page.url.pathname.includes(href)}"
        class="transition-colors hover:text-foreground">
        {name}
      </a>
    {/each}
  </nav>

  <Sheet.Root>
    <Sheet.Trigger
      asChild
      let:builder>
      <Button
        size="icon"
        variant="outline"
        builders="{[builder]}"
        class="shrink-0 md:hidden">
        <i class="fa-solid fa-bars"></i>
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </Sheet.Trigger>
    <Sheet.Content side="left">
      <nav class="grid gap-6 text-lg font-medium">
        <a href="/">
          <p class="text-white">
            RIVAlumni <span class="font-bold">Portal</span>
          </p>
        </a>

        {#each links as { href, name }}
          <a
            {href}
            class:text-foreground="{$page.url.pathname.includes(href)}"
            class:text-muted-foreground="{!$page.url.pathname.includes(href)}"
            class="transition-colors hover:text-foreground">
            {name}
          </a>
        {/each}
      </nav>
    </Sheet.Content>
  </Sheet.Root>

  <div class="w-full flex flex-row items-center justify-end gap-4">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        asChild
        let:builder>
        <Button
          size="icon"
          builders="{[builder]}"
          variant="ghost"
          class="rounded-full">
          <Avatar.Root class="w-full h-full">
            <Avatar.Image
              src=""
              alt="Profile Picture" />
            <Avatar.Fallback>
              <i class="fa-regular fa-user"></i>
              <span class="sr-only">Toggle user menu</span>
            </Avatar.Fallback>
          </Avatar.Root>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end">
        <DropdownMenu.Label>My account</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Profile</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <a
            href="/auth/signout"
            class="text-red-600 font-bold">
            Sign Out
          </a>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
</header>

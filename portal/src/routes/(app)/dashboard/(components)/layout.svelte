<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb';
</script>

<div
  class="p-6 sm:p-8
          flex flex-col
          gap-8 md:gap-10">
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
            href="/dashboard"
            class="font-bold transition-colors text-foreground">
            Dashboard
          </a>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </nav>

  <main
    class="grid gap-4 md:gap-8
            grid-cols-1 lg:grid-cols-3">
    <div
      class="grid auto-rows-max
            items-start gap-4 md:gap-8 lg:col-span-2">
      <slot name="content" />
    </div>

    <aside>
      <slot name="aside" />
    </aside>
  </main>
</div>

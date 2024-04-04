<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb';
</script>

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
            href="/dashboard"
            class="font-bold transition-colors text-foreground">
            Dashboard
          </a>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </nav>

  <!-- 3-column grid layout -->
  <div
    class="grid grid-cols-1 lg:grid-cols-3
            flex-1 items-start gap-4 md:gap-8">
    <!-- 3-column sub-grid layout -->
    <div
      class="grid auto-rows-max
              items-start gap-4 md:gap-8 lg:col-span-2">
      <!-- Main content -->
      <div
        class="grid gap-4
                sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <slot name="content" />
      </div>
    </div>

    <!-- Side content -->
    <aside>
      <slot name="aside" />
    </aside>
  </div>
</div>

<script lang="ts"></script>

<div class="h-full flex flex-col md:flex-row">
  <!-- RIVAlumni Branding -->
  <p class="z-20 absolute left-10 top-10 text-lg text-white font-medium">
    RIVAlumni <span class="font-bold">Portal</span>
  </p>

  <!-- Left side -->
  <div
    class="p-10 relative border-r
              hidden md:flex
              flex-col flex-1 justify-end">
    <!-- Cover image -->
    <div
      class="z-10 absolute inset-0
              bg-cover bg-center bg-img-signin">
    </div>

    <div class="z-20 relative">
      <blockquote class="space-y-2">
        <p class="text-lg text-white">
          Faces of RIVA; from left-to-right,
          <span class="font-bold"> Kathryn Ho </span>, and
          <span class="font-bold">Stella Tan</span>
        </p>

        <footer class="text-sm text-white">
          Partnership Appreciation Presentation (2023)
        </footer>
      </blockquote>
    </div>
  </div>

  <!-- Right side -->
  <div
    class="p-10 relative flex-1
            flex flex-col justify-center">
    <slot />
  </div>
</div>

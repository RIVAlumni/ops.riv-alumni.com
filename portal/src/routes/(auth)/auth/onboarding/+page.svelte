<script lang="ts">
  import FullNameStep from './(components)/01-full-name.svelte';
  import GenderStep from './(components)/02-gender.svelte';
  import CurrentSchoolStep from './(components)/03-current-school.svelte';
  import MobileNumberStep from './(components)/04-mobile-number.svelte';
  import HomeNumberStep from './(components)/05-home-number.svelte';
  import GraduatingClass from './(components)/06-graduating-class.svelte';
  import GraduatingYear from './(components)/07-graduating-year.svelte';
  import NameOfNok from './(components)/08-name-of-nok.svelte';
  import RelationshipWithNok from './(components)/09-relationship-with-nok.svelte';
  import MobileOfNok from './(components)/10-mobile-of-nok.svelte';

  let step = 0;
  const componentSteps = [
    FullNameStep,
    GenderStep,
    CurrentSchoolStep,
    MobileNumberStep,
    HomeNumberStep,
    GraduatingClass,
    GraduatingYear,
    NameOfNok,
    RelationshipWithNok,
    MobileOfNok,
  ];
</script>

<svelte:head>
  <title>Onboarding - RIVAlumni Portal</title>
</svelte:head>

<div
  class="mx-auto w-full max-w-sm
          text-center space-y-6">
  <svelte:component
    this="{componentSteps[step]}"
    bind:step />
</div>

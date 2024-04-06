<script lang="ts">
  import CheckIcon from 'lucide-svelte/icons/check';

  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';

  export let step: number;
</script>

<div class="space-y-2">
  <span class="font-mono">10. Emergency Contacts</span>
  <h1 class="text-2xl font-semibold tracking-tight">
    What is your next-of-kin's phone number?
  </h1>
</div>

<div class="space-y-2">
  <Input
    id="mobile_of_nok"
    type="text"
    placeholder="81234567" />

  <p class="text-sm text-muted-foreground">
    Enter your parent's WhatsApp registered mobile number. Exclude country code.
    E.g., 81234567
  </p>
</div>

{step}

<div class="flex flex-row justify-end">
  <Button
    type="submit"
    class="flex flex-row justify-center gap-1">
    Complete
    <CheckIcon class="w-4 h-4" />
  </Button>
</div>

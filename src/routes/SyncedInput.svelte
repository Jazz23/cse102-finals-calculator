<!--
  SyncedInput.svelte

  This component represents an input field that synchronizes its value with the URL query parameters.
-->

<script lang="ts">
  import {page} from '$app/stores';
  import {goto} from "$app/navigation";
  
  let { description, type = "number", min = 0, max = 1, step = 0.01, value = $bindable<number | string | null>(null)} = $props();

  // Load potential value from query params. If the type of input box is number, parse the value as a number.
  value = $page.url.searchParams.get(description);
  if (type === "number") {
    value ??= Number(value);
  }
  
  // Updates the url box with the new value, if any
  function updateQueryParams() {
    if (value == null) {
      $page.url.searchParams.delete(description);
    } else {
      $page.url.searchParams.set(description, value.toString());
    }

    // Update the URL box
    goto(`?${$page.url.searchParams.toString()}`);
  }
</script>

<p>{description}</p><input {type} bind:value={value} onfocusout={updateQueryParams} {min} {max} {step}/>
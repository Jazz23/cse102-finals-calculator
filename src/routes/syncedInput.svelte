<!--
  SyncedInput.svelte

  This component represents an input field that synchronizes its value with the URL query parameters.
-->

<script lang="ts">
  import {page} from '$app/stores';
  import {goto} from "$app/navigation";

  export let description: string;
  export let type: string = "number";
  export let min: number = 0;
  export let max: number = 100;
  export let step: number = 0.01;

  // Value of the input box that you can bind to read/write.
  export let value: any | null = null;

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

<p>{description}</p><input {type} bind:value={value} on:focusout={updateQueryParams} {min} {max} {step}/>
<!--This page will have 4 boxes: Midterm1 score, Midterm2 score, Finals score, and desired grade. 

When 3 boxes are completed, the fourth box is calculated.

When all 4 boxes are completed:

1. If the final score box is modified, resultingGrade will be recalculated accordingly.
2. If any other box is is modified, final score box will be recalculated accordingly.
-->

<script lang="ts">
  import { page } from '$app/stores';
  import {GradePart} from "$lib/GradePart";
  import {goto} from "$app/navigation";
  import {onMount} from "svelte";
  
  function loadQueryParam(name: string): number | null {
    const param = $page.url.searchParams.get(name);
    return param ? parseFloat(param) : null;
  }
  
  // Load potential previous cursor position and element id
  const cursorPosition: number | null = loadQueryParam('cursorPosition');
  const currentElementId: string | null = $page.url.searchParams.get('currentElementId');
  
  // Load potential values from query params
  let midterm1 = new GradePart("Midterm 1", 0.3, loadQueryParam('midterm1'));
  let midterm2 = new GradePart("Midterm 2", 0.3, loadQueryParam('midterm2'));
  let final = new GradePart("Final", 0.4, loadQueryParam('final'));
  let desiredGrade = loadQueryParam('desiredGrade');
  
  // Updates the url box with set values, if any
  $: updateQueryParams(midterm1.scorePercent, midterm2.scorePercent, final.scorePercent, desiredGrade);
  function updateQueryParams(midterm1ScorePercent, midterm2ScorePercent, finalScorePercent, desiredGrade) {
    // If they're null, then remove them from the url. Otherwise, set them.
    function updateParam(name: string, value: any | null) {
      if (value === null) {
        $page.url.searchParams.delete(name);
      } else {
        $page.url.searchParams.set(name, value.toString());
      }
    }
    
    // Update set values from input boxes
    updateParam('midterm1', midterm1ScorePercent);
    updateParam('midterm2', midterm2ScorePercent);
    updateParam('final', finalScorePercent);
    updateParam('desiredGrade', desiredGrade);
    updateParam('cursorPosition', cursorPosition);
    updateParam('currentElementId', currentElementId);

    // Update the URL box
    goto(`?${$page.url.searchParams.toString()}`);
  }
  
  onMount(() => {
    // When the page is mounted, set the cursor position to the desired element, if any
    if (!cursorPosition || !currentElementId) return;
    
    const element = document.getElementById(currentElementId)! as HTMLInputElement;
    element.focus();
    element.setSelectionRange(cursorPosition, cursorPosition);
  })
</script>

<p>Midterm1 (30%)</p>
<p>Midterm2 (30%)</p>
<p>Final (40%)</p>
<p>If your midterm 2 score is higher than midterm 1, it replaces your midterm 1 score. If midterm 2 score is less than your midterm 1, then it follows the normal grading scheme above.</p>
<!--Input boxes with bindings for all 4 values-->

<p>Midterm 1 Percent Score: </p><input id="midterm1" type="number" bind:value={midterm1.scorePercent} min="0" max="100" step="0.01" />
<p>Midterm 2 Percent Score: </p><input id="midterm2" type="number" bind:value={midterm2.scorePercent} min="0" max="100" step="0.01" />
<p>Final Percent Score: </p><input id="final" type="number" bind:value={final.scorePercent} min="0" max="100" step="0.01" />
<p>Desired Grade: </p><input id="desiredGrade" type="number" bind:value={desiredGrade} min="0" max="100" step="0.01" />
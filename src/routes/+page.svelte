<!--This page will have 4 boxes: Midterm1 score, Midterm2 score, Finals score, and desired grade. 

When 3 boxes are completed, the fourth box is calculated.

When all 4 boxes are completed:

1. If the final score box is modified, resultingGrade will be recalculated accordingly.
2. If any other box is is modified, final score box will be recalculated accordingly.
-->

<script lang="ts">
  import {GradePart} from "$lib/GradePart";
  import SyncedInput from "./SyncedInput.svelte";

  const midterm1 = $state(new GradePart("Midterm 1", 0.3));
  const midterm2 = $state(new GradePart("Midterm 2", 0.3));
  const final = $state(new GradePart("Final", 0.4));
  let desiredGrade = $state<number | null>(null);

  // $: midterm1.scorePercent, midterm2.scorePercent, desiredGrade, recalculateFinalsScore();

  $effect(() => {
    if (!midterm1?.scorePercent || !midterm2?.scorePercent || !desiredGrade) return;

    let adjustedMidterm1 = Math.max(midterm1.scorePercent, midterm2.scorePercent);
    let midterm1Copy = new GradePart(midterm1.name, midterm1.weight, adjustedMidterm1);

    final.recalculateScore(desiredGrade, midterm1Copy, midterm2);
  });
</script>

<p>Midterm1 (30%)</p>
<p>Midterm2 (30%)</p>
<p>Final (40%)</p>
<p>If your midterm 2 score is higher than midterm 1, it replaces your midterm 1 score. If midterm 2 score is less than
    your midterm 1, then it follows the normal grading scheme above.</p>
<!--Input boxes with bindings for all 4 values-->

<SyncedInput description="Midterm 1 Percent Score:" bind:value={midterm1.scorePercent}/>
<SyncedInput description="Midterm 2 Percent Score:" bind:value={midterm2.scorePercent}/>
<SyncedInput description="Final Percent Score:" bind:value={final.scorePercent}/>
<SyncedInput description="Desired Grade:" bind:value={desiredGrade}/>
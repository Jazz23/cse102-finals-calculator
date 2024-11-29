// Represents one part of your total grade. E.g. Midterm1.
export class GradePart {
  // Weight of your total grade that this part makes up. E.g. 30 (can also 0.3 as long as you're consistent :)
  public weight: number;
  public name: string;
  // Current percentage score. E.g. 83%.
  public scorePercent: number | null;

  constructor(name: string, weight: number, scorePercent: number | null = null) {
    this.name = name;
    this.weight = weight;
    this.scorePercent = scorePercent;
  }

  // Given a desired class grade and current scores (can also include this one), set our score to achieve the desired grade
  // and return the new score.
  public recalculateScore(desiredClassGrade: number, ...parts: GradePart[]): number | null {
    const otherParts = parts.filter(part => part !== this);
    
    if (otherParts.find(part => part.scorePercent === null)) {
      throw new Error("Other parts must have a score to calculate the score needed.");
    }
    
    // Current grade. E.g. if midterm1.scorePercent = 0.83, midterm1.weight = 30, then the midterm1 contribution is 0.83 * 30 = 24.9.
    // Do this for all parts, and sum them up.
    const gradeSoFar = otherParts.reduce((acc, part) => acc + (part.scorePercent!) * part.weight, 0);

    // Calculate the score we need to achieve the desired grade.
    const scorePercentNeeded = (desiredClassGrade - gradeSoFar) / this.weight;
    // Round it to the nearest thousand.
    const rounded = Math.round(scorePercentNeeded * 1000) / 1000;
    this.scorePercent = rounded;
    return rounded;
  }
}
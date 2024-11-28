import {GradePart} from "$lib/GradePart";
import {describe, expect, beforeEach, it} from "vitest";

interface cse102 {
  midterm1: GradePart
  midterm2: GradePart
  final: GradePart
  allParts: GradePart[]
  desiredGrade: number
}

beforeEach<cse102>((ctx) => {
  ctx.midterm1 = new GradePart("Midterm 1", 0.3, 1);
  ctx.midterm2 = new GradePart("Midterm 2", 0.3, 1);
  ctx.final = new GradePart("Final", 0.4, 1);
  ctx.allParts = [ctx.midterm1, ctx.midterm2, ctx.final];
  ctx.desiredGrade = 1;
});

it<cse102>("should exist", (ctx) => {
  expect(ctx).toBeDefined();
  expect(ctx.midterm2).toBeDefined();
  expect(ctx.final).toBeDefined();
});

it<cse102>("should calculate a needed score of 100", (ctx) => {
  expect(ctx.midterm1.recalculateScore(ctx.desiredGrade, ctx.midterm2, ctx.final)).toBe(1);
})

it<cse102>("should calculate a needed score of 80", (ctx) => {
  ctx.midterm1.scorePercent = 0.8;
  ctx.midterm2.scorePercent = 0.8;
  ctx.desiredGrade = 0.8;
  expect(ctx.final.recalculateScore(ctx.desiredGrade, ...ctx.allParts)).toBe(0.8);
})

it<cse102>("should ignore the final grade", (ctx) => {
  ctx.midterm1.scorePercent = 0.8;
  ctx.midterm2.scorePercent = 0.8;
  ctx.final.scorePercent = 12345;
  ctx.desiredGrade = 0.8;
  expect(ctx.final.recalculateScore(ctx.desiredGrade, ...ctx.allParts)).toBe(0.8);
})

it<cse102>("online finals calculator example", (ctx) => {
  ctx.midterm1.scorePercent = 0.7;
  ctx.midterm2.scorePercent = 0.8;
  ctx.desiredGrade = 0.8;
  expect(ctx.final.recalculateScore(ctx.desiredGrade, ...ctx.allParts)).toBe(0.875);
})

it<cse102>("inverse of above test", (ctx) => {
  ctx.midterm1.scorePercent = 0.7;
  ctx.final.scorePercent = 0.875;
  ctx.desiredGrade = 0.8;
  expect(ctx.midterm2.recalculateScore(ctx.desiredGrade, ...ctx.allParts)).toBe(0.8);
})

it("dummy test to fix jetbrains bug", (ctx) => {
  expect(true).toBe(true);
})
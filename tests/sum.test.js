import { describe, expect, test } from "@jest/globals";
import { sum } from "../src/sum.js";

describe("Função sum", () => {
  test("soma dois números positivos", () => {
    expect(sum(2, 3)).toBe(5);
  });

  test("soma números negativos", () => {
    expect(sum(-2, -3)).toBe(-5);
  });

  test("soma com zero", () => {
    expect(sum(10, 0)).toBe(10);
  });
});

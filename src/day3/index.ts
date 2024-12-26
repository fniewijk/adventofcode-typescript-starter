import { Day } from "../day";

class Day3 extends Day {
  constructor() {
    super(3);
  }

  solveForPartOne(input: string): string {
    const listOfMul = input.match(/mul\(\d+,\d+\)/g);

    const output = listOfMul
      ?.map((mul) => {
        const [first, second] = mul.match(/\d+/g)!.map(Number);
        return first * second;
      })
      .reduce((acc, curr) => acc + curr, 0)
      .toString();

    return output || "";
  }

  solveForPartTwo(input: string): string {
    const inputMatches = input.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);

    let enabled = true;
    const output = inputMatches
      ?.map((match) => {
        const isMul = match.includes("mul");
        if (isMul && enabled) {
          const [first, second] = match.match(/\d+/g)!.map(Number);
          return first * second;
        }

        const isDo = match === "do()";
        if (isDo) enabled = true;
        const isDont = match === "don't()";
        if (isDont) enabled = false;

        return 0;
      })
      .reduce((acc, curr) => acc + curr, 0)
      .toString();

    return output || "";
  }
}

export default new Day3();

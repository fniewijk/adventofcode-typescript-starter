import { Day } from "../day";

class Day4 extends Day {
  constructor() {
    super(4);
  }

  solveForPartOne(input: string): string {
    const lines: string[] = input.split("\n");

    // columns are grouped letters

    const columnLength = lines[0].length;
    const columns = [];

    for (let i = 0; i < columnLength; i++) {
      const column = lines.map((line) => line[i]).join("");
      columns.push(column);
    }

    let output = 0;

    const xmasRegex = new RegExp(
      `(XMAS
        |SAMX)`,
      "i"
    );
    output += lines
      .map((line) => line.match(xmasRegex)?.length || 0)
      .reduce((acc, curr) => acc + curr, 0);

    output += columns
      .map((column) => column.match(xmasRegex)?.length || 0)
      .reduce((acc, curr) => acc + curr, 0);

    return output.toString();
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day4();

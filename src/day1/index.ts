import { Day } from "../day";

class Day1 extends Day {
  constructor() {
    super(1);
  }

  solveForPartOne(input: string): string {
    const lines = input.split("\n");
    console.log(input);
    const columnNumbers = lines.map((line) => line.split("   ").map(Number));
    const firstColumn: number[] = [];
    const secondColumn: number[] = [];
    columnNumbers.forEach((column) => {
      console.log(column);
      firstColumn.push(column[0]);
      secondColumn.push(column[1]);
    });

    console.log(firstColumn);
    console.log(secondColumn);

    firstColumn.sort((a, b) => a - b);
    secondColumn.sort((a, b) => a - b);

    const output = firstColumn.reduce((acc, curr, index) => {
      return Math.abs(firstColumn[index] - secondColumn[index]) + acc;
    }, 0);

    return output.toString();
  }

  solveForPartTwo(input: string): string {
    const lines = input.split("\n");
    console.log(input);
    const columnNumbers = lines.map((line) => line.split("   ").map(Number));
    const firstColumn: number[] = [];
    const secondColumn: number[] = [];
    columnNumbers.forEach((column) => {
      console.log(column);
      firstColumn.push(column[0]);
      secondColumn.push(column[1]);
    });

    console.log(firstColumn);
    console.log(secondColumn);

    let total = 0;
    let lastNumber: number = -1;
    firstColumn.forEach((firstColumnNumber, index) => {
      //if (lastNumber !== firstColumnNumber) {
      const foundAmountLastColumn = secondColumn.filter(
        (secondColumnNumber) => secondColumnNumber === firstColumnNumber
      ).length;

      total += foundAmountLastColumn * firstColumnNumber;
      console.log(`Found ${foundAmountLastColumn} times ${firstColumnNumber}`);
      console.log(`Total is now ${total}`);
      lastNumber = firstColumnNumber;
      //}
    });
    return total.toString();
  }
}

export default new Day1();

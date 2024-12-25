import { Day } from "../day";

enum PrevState {
  Increasing = "Increasing",
  Decreasing = "Decreasing",
  Unset = "Unset",
}

type Prev = {
  state: PrevState;
  value: number;
};

const getState = (previous: number, current: number): PrevState => {
  if (previous < current) {
    return PrevState.Increasing;
  } else if (previous > current) {
    return PrevState.Decreasing;
  }
  return PrevState.Unset;
};

const unsafeCheck = (line: number[]): number => {
  const firstState = getState(line[0], line[1]);

  return line.findIndex((current, index) => {
    if (index === 0) {
      return false;
    }
    const previous = line[index - 1];
    const diff = current - previous;
    const wrongDiff = Math.abs(diff) > 3 || diff === 0;
    if (wrongDiff) {
      // console.log(`${line} Diff wrong: ${diff}`);
      return true;
    }

    const currentState = getState(line[index - 1], line[index]);
    return currentState !== firstState && currentState !== PrevState.Unset;
  });
};

class Day2 extends Day {
  constructor() {
    super(2);
  }

  solveForPartOne(input: string): string {
    const lines = input.split("\n");
    const linesAndData: number[][] = lines.map((line) =>
      line.split(" ").map(Number)
    );

    let safeAmount = 0;

    linesAndData.forEach((line) => {
      if (unsafeCheck(line) === -1) {
        safeAmount++;
      }
    });

    return safeAmount.toString();
  }

  solveForPartTwo(input: string): string {
    const lines = input.split("\n");
    const linesAndData: number[][] = lines.map((line) =>
      line.split(" ").map(Number)
    );

    let safeAmount = 0;
    linesAndData.forEach((line) => {
      const unsafeIndex = unsafeCheck(line);

      if (unsafeIndex === -1) {
        // console.log("safe first try", line);

        safeAmount++;
      } else {
        // console.log("unsafe first try", line);
        // take out the unsafe index
        const unsafeDampenedOne = unsafeCheck(
          line.slice(0, unsafeIndex).concat(line.slice(unsafeIndex + 1))
        );

        const unsafeDampenedTwo = unsafeCheck(
          line.slice(0, unsafeIndex - 1).concat(line.slice(unsafeIndex))
        );

        const unsafeDampenedThree = unsafeCheck(
          line.slice(0, unsafeIndex - 2).concat(line.slice(unsafeIndex - 1))
        );

        if (
          unsafeDampenedOne === -1 ||
          unsafeDampenedTwo === -1 ||
          unsafeDampenedThree === -1
        ) {
          // console.log("safe second try", line.join(","));

          safeAmount++;
        } else {
          console.log(
            "unsafe second try",
            line.join(","),
            unsafeIndex,
            "original"
          );

          console.log(
            "unsafe second try",
            line
              .slice(0, unsafeIndex)
              .concat(line.slice(unsafeIndex + 1))
              .join(","),
            unsafeDampenedOne,
            unsafeDampenedTwo
          );
        }
      }
    });

    return safeAmount.toString();
  }
}

export default new Day2();

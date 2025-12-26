import type { IProblem } from "./problem";

export interface IContest {
  title: string;
  standard_1: number;
  standard_2: number;
  problems: IProblem[];
}

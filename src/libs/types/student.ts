import type { IProblem } from "./problem";

export interface IStudent {
  id: string;
  team_id: string;
  name: string;
  school: string;
  college: string;
  class: string;
}

export interface StudentStanding {
  id: string;
  team_id: string;
  name: string;
  school: string;
  college: string;
  class: string;
  rank: number;
  score: number;
  problems_score: IProblem[];
  part1: { score: number; ratio: number };
  part2: { score: number; ratio: number };
  part3: { score: number; ratio: number };
}

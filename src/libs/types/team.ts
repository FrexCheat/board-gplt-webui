export interface ITeam {
  id: string;
  name: string;
  school: string;
  college: string;
  class: string;
}

export interface TeamStanding {
  id: string;
  name: string;
  school: string;
  college: string;
  class: string;
  rank: number;
  score: number;
  part1: { score: number; ratio: number; status: boolean };
  part2: { score: number; ratio: number; status: boolean };
  part3: { score: number; ratio: number; status: boolean };
}

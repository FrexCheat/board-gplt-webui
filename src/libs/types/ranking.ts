export interface IRanking {
  id: string;
  rank: number;
  score: number;
  problems_score: Record<string, number>;
}

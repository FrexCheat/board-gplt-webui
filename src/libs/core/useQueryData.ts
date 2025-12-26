import type { IContest, IRanking, IStudent, ITeam } from "@/libs/types";
import { useQuery } from "@tanstack/vue-query";

export interface QueryData {
  contest: IContest;
  students: IStudent[];
  teams: ITeam[];
  ranking: IRanking[];
}

async function fetch_data(): Promise<QueryData> {
  const res = [
    await fetch("/data/contest.json"),
    await fetch("/data/students.json"),
    await fetch("/data/teams.json"),
    await fetch("/data/ranking.json"),
  ];

  if (!res[0] || res[0].status >= 300 || res[0].status < 200) {
    const { status, statusText } = res[0] || { status: "-", statusText: "-" };
    throw new Error(`fetch data failed. [status=${status}] [statusText=${statusText}]`);
  }

  const p = Promise.all(res.map(r => r.json())).then((res) => {
    return {
      contest: res[0],
      students: res[1],
      teams: res[2],
      ranking: res[3],
    };
  });

  return p;
}

export function useQueryData(queryOnce = false) {
  const retry = 3;
  let refetchInterval: number | false = window.QUERY_INTERVAL;

  if (queryOnce) {
    refetchInterval = false;
  }

  return useQuery({
    queryKey: ["boardData"],
    queryFn: () => fetch_data(),
    retry,
    refetchInterval,
  });
}

import type {
  IContest,
  IProblem,
  IRanking,
  IStudent,
  ITeam,
  StudentStanding,
  TeamStanding,
} from "@/libs/types";
import {
  PART1_END_INDEX,
  PART2_END_INDEX,
  TEAM_PART1_MAX_SCORE,
  TEAM_PART2_MAX_SCORE,
  TEAM_PART3_MAX_SCORE,
} from "@/composables/constant";

export function buildStudentBoard(contest: IContest, students: IStudent[], ranking: IRanking[]): StudentStanding[] {
  const result: StudentStanding[] = [];
  const rankingMap = new Map(ranking.map(r => [r.id, r]));

  students.forEach((student) => {
    const _result: StudentStanding = {
      ...student,
      rank: 0,
      score: 0,
      problems_score: [],
      part1: { score: 0, ratio: 0 },
      part2: { score: 0, ratio: 0 },
      part3: { score: 0, ratio: 0 },
    };

    const _ranking = rankingMap.get(student.id);
    if (_ranking) {
      const _problems_score: IProblem[] = [];

      _result.rank = _ranking.rank;
      _result.score = _ranking.score;

      // get problems scores and parts scores
      contest.problems.forEach((problem, idx) => {
        const _score = _ranking.problems_score?.[problem.id] || 0;

        if (idx <= PART1_END_INDEX) {
          _result.part1.score += _score;
        } else if (idx <= PART2_END_INDEX) {
          _result.part2.score += _score;
        } else {
          _result.part3.score += _score;
        }

        _problems_score.push({
          id: problem.id,
          label: problem.label,
          score: _score,
        });
      });

      _result.problems_score = _problems_score;

      // calculate parts ratios
      _result.part1.ratio = _result.part1.score;
      _result.part2.ratio = _result.part2.score;
      _result.part3.ratio = (_result.part3.score / 90) * 100;
    } else {
      // if no ranking found, all problems' score set to zero
      contest.problems.forEach((problem) => {
        _result.problems_score.push({
          id: problem.id,
          label: problem.label,
          score: 0,
        });
      });
    }

    result.push(_result);
  });

  result.sort((a, b) => {
    if (a.rank === 0 && b.rank === 0) {
      return 0;
    }
    if (a.rank === 0) {
      return 1;
    }
    if (b.rank === 0) {
      return -1;
    }
    return a.rank - b.rank;
  });

  return result;
}

export function buildTeamBoard(contest: IContest, students: IStudent[], teams: ITeam[], ranking: IRanking[]): TeamStanding[] {
  const result: TeamStanding[] = [];
  const studentsByTeamId: Record<string, IStudent[]> = {};

  students.forEach((s) => {
    if (!studentsByTeamId[s.team_id]) {
      studentsByTeamId[s.team_id] = [];
    }
    studentsByTeamId[s.team_id]!.push(s);
  });

  teams.forEach((team) => {
    const _result: TeamStanding = {
      ...team,
      rank: 0,
      score: 0,
      part1: { score: 0, ratio: 0, status: false },
      part2: { score: 0, ratio: 0, status: false },
      part3: { score: 0, ratio: 0, status: false },
    };

    const teamStudents = studentsByTeamId[team.id] || [];

    // aggregate students' scores
    teamStudents.forEach((s) => {
      const _ranking = ranking.find(r => r.id === s.id);
      if (_ranking) {
        // aggregate parts scores
        contest.problems.forEach((problem, idx) => {
          const _score = _ranking.problems_score?.[problem.id] || 0;

          if (idx <= PART1_END_INDEX) {
            _result.part1.score += _score;
          } else if (idx <= PART2_END_INDEX) {
            _result.part2.score += _score;
          } else {
            _result.part3.score += _score;
          }
        });
      }
    });

    _result.score = _result.part1.score;

    // calculate parts ratios and status
    _result.part1.ratio = (_result.part1.score / TEAM_PART1_MAX_SCORE) * 100;
    _result.part1.status = _result.part1.score >= contest.standard_1;

    _result.part2.ratio = (_result.part2.score / TEAM_PART2_MAX_SCORE) * 100;
    _result.part2.status = _result.part2.score >= contest.standard_2;

    _result.part3.ratio = (_result.part3.score / TEAM_PART3_MAX_SCORE) * 100;

    // determine total score based on status
    if (_result.part1.status) {
      _result.score += _result.part2.score;
      if (_result.part2.status) {
        _result.score += _result.part3.score;
      }
    }

    result.push(_result);
  });

  let rankCounter = 1;
  result.sort((a, b) => b.score - a.score);
  result.forEach((t, idx) => {
    if (idx > 0 && t.score === result[idx - 1]?.score) {
      t.rank = result[idx - 1]!.rank;
    } else {
      t.rank = rankCounter;
    }
    rankCounter++;
  });

  return result;
}

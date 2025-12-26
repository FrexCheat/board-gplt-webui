<script setup lang="ts">
import type { TableProps } from "tdesign-vue-next";
import type {
  IContest,
  IRanking,
  IStudent,
  ITeam,
  StudentStanding,
  TeamStanding,
} from "@/libs/types";
import { buildStudentBoard, buildTeamBoard } from "@/libs/core/board";
import { exportStandings } from "@/libs/core/export";
import { useQueryData } from "@/libs/core/useQueryData";

const contestData = ref({} as IContest);
const studentsData = ref<IStudent[]>([]);
const teamsData = ref<ITeam[]>([]);
const rankingData = ref<IRanking[]>([]);

const studentsStandings = ref<StudentStanding[]>([]);
const teamsStandings = ref<TeamStanding[]>([]);

const { data, isError, error } = useQueryData();

const title = useTitle("ZZULI GPLT Board");

const firstLoaded = ref(false);
const currentTab = ref(0);

const isModalVisible = ref(false);
const tableData = ref<TableProps["data"]>([]);

const tableColumns = ref<TableProps["columns"]>([
  { title: "#", colKey: "rank", align: "center", width: 60, fixed: "left" },
  { title: "姓名", colKey: "name", align: "center", width: 90, fixed: "left" },
  { title: "1-1", colKey: "1-1", className: "table_lv1_col", align: "center", width: 60 },
  { title: "1-2", colKey: "1-2", className: "table_lv1_col", align: "center", width: 60 },
  { title: "1-3", colKey: "1-3", className: "table_lv1_col", align: "center", width: 60 },
  { title: "1-4", colKey: "1-4", className: "table_lv1_col", align: "center", width: 60 },
  { title: "1-5", colKey: "1-5", className: "table_lv1_col", align: "center", width: 60 },
  { title: "1-6", colKey: "1-6", className: "table_lv1_col", align: "center", width: 60 },
  { title: "1-7", colKey: "1-7", className: "table_lv1_col", align: "center", width: 60 },
  { title: "1-8", colKey: "1-8", className: "table_lv1_col", align: "center", width: 60 },
  { title: "2-1", colKey: "2-1", className: "table_lv2_col", align: "center", width: 60 },
  { title: "2-2", colKey: "2-2", className: "table_lv2_col", align: "center", width: 60 },
  { title: "2-3", colKey: "2-3", className: "table_lv2_col", align: "center", width: 60 },
  { title: "2-4", colKey: "2-4", className: "table_lv2_col", align: "center", width: 60 },
  { title: "3-1", colKey: "3-1", className: "table_lv3_col", align: "center", width: 60 },
  { title: "3-2", colKey: "3-2", className: "table_lv3_col", align: "center", width: 60 },
  { title: "3-3", colKey: "3-3", className: "table_lv3_col", align: "center", width: 60 },
  { title: "基础分", colKey: "part1", align: "center", width: 75 },
  { title: "进阶分", colKey: "part2", align: "center", width: 75 },
  { title: "登顶分", colKey: "part3", align: "center", width: 75 },
  { title: "总分", colKey: "score", align: "center", width: 70, fixed: "right" },
]);

function buildStudentTableData(data: StudentStanding[]): TableProps["data"] {
  const res: TableProps["data"] = [];
  data.forEach((student) => {
    let _result = {
      id: student.id,
      rank: student.rank,
      name: student.name,
      part1: student.part1.score,
      part2: student.part2.score,
      part3: student.part3.score,
      score: student.score,
    };
    student.problems_score.forEach((p) => {
      _result = {
        ..._result,
        [`${p.label}`]: p.score,
      };
    });
    res.push(_result);
  });
  return res;
}

function onTeamItemClick(id: string) {
  const t_s_standings = studentsStandings.value.filter(
    stu => stu.team_id === id,
  );
  tableData.value = buildStudentTableData(t_s_standings);
  isModalVisible.value = true;
}

function onStudentItemClick(standing: StudentStanding) {
  tableData.value = buildStudentTableData([standing]);
  isModalVisible.value = true;
}

watch(data, async () => {
  if (data.value === null || data.value === undefined) {
    return;
  }

  contestData.value = data.value.contest;
  studentsData.value = data.value.students;
  teamsData.value = data.value.teams;
  rankingData.value = data.value.ranking;

  studentsStandings.value = buildStudentBoard(contestData.value, studentsData.value, rankingData.value);
  teamsStandings.value = buildTeamBoard(contestData.value, studentsData.value, teamsData.value, rankingData.value);

  title.value = `${contestData.value.title} | ZZULI GPLT Board`;

  firstLoaded.value = true;
}, { immediate: true });
</script>

<template>
  <main>
    <div v-if="!firstLoaded">
      <Loading v-if="!isError" />
      <div v-else class="error_message">
        {{ error }}
      </div>
    </div>

    <div v-if="firstLoaded">
      <div class="title_section">
        <h1>{{ contestData.title }}</h1>
      </div>

      <div class="tabs_container">
        <div class="tabs_section">
          <div class="tabs_items_left">
            <t-button
              ghost
              :variant="currentTab === 0 ? 'outline' : 'dashed'"
              @click="currentTab = 0"
            >
              <template #icon>
                <usergroup-icon
                  fill-color="transparent"
                  stroke-color="currentColor"
                  :stroke-width="2"
                />
              </template>
              团队排名
            </t-button>
            <t-button
              ghost
              :variant="currentTab === 1 ? 'outline' : 'dashed'"
              @click="currentTab = 1"
            >
              <template #icon>
                <user-icon
                  fill-color="transparent"
                  stroke-color="currentColor"
                  :stroke-width="2"
                />
              </template>
              个人排名
            </t-button>
          </div>
          <div class="tabs_items_right">
            <t-button
              ghost
              variant="outline"
              @click="exportStandings(studentsStandings, teamsStandings, contestData.title)"
            >
              <template #icon>
                <cloud-download-icon
                  fill-color="transparent"
                  stroke-color="currentColor"
                  :stroke-width="2"
                />
              </template>
              导出榜单数据
            </t-button>
          </div>
        </div>
      </div>

      <div class="standing_wrapper">
        <div class="standing_container">
          <div v-if="currentTab === 0">
            <TeamItem
              v-for="(team, idx) in teamsStandings"
              :id="team.id"
              :key="team.id"
              :idx="idx"
              :standing-data="team"
              @click="onTeamItemClick(team.id)"
            />
          </div>
          <div v-if="currentTab === 1">
            <StudentItem
              v-for="(student, idx) in studentsStandings"
              :id="student.id"
              :key="student.id"
              :idx="idx"
              :standing-data="student"
              @click="onStudentItemClick(student)"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
  <t-dialog
    v-model:visible="isModalVisible"
    attach="body"
    destroy-on-close
    close-on-overlay-click
    :header="false"
    :footer="false"
    :close-btn="false"
    width="90%"
    placement="center"
  >
    <t-base-table
      row-key="id"
      :data="tableData"
      :columns="tableColumns"
      table-layout="fixed"
      bordered
    />
  </t-dialog>
</template>

<style scoped>
.standing_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
}

.standing_container {
  box-sizing: border-box;
  width: 1270px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(37, 149, 235);
  border-radius: 0.375rem;
  background-color: rgba(44, 44, 44, 0.418);
  box-shadow: 0 0 25px rgb(37, 149, 235);
}

.error_message {
  display: flex;
  justify-content: center;
  padding-top: 2.5rem;
  font-weight: 800;
  font-size: 1rem;
}

.title_section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
}

.title_section h1 {
  font-weight: 700;
  font-size: 1.875rem;
  /* 30px */
  line-height: 2.25rem;
  /* 36px */
}

.tabs_container {
  display: flex;
  justify-content: center;
  justify-self: center;
  align-items: center;
  width: 1270px;
}

.tabs_section {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 0.25rem;
  /* 4px */
  width: 100%;
}

.tabs_items_left {
  display: flex;
  vertical-align: top;
  gap: 1rem;
  /* 16px */
}

.tabs_items_right {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  /* 16px */
}
</style>

<script setup lang="ts">
import type { TeamStanding } from "@/libs/types";

const props = defineProps<{
  id: string;
  idx: number;
  standingData: TeamStanding;
}>();

const el = ref(null);
const isVisible = useElementVisibility(el);

function isRenderByVisible() {
  return isVisible.value || props.idx < 32;
}
</script>

<template>
  <div ref="el" class="standing_item_container">
    <div v-if="isRenderByVisible()">
      <div class="standing_item_title">
        <span>{{ props.standingData.name }} ——— {{ props.standingData.college }} ——— {{ props.standingData.class }}</span>
      </div>
      <div class="standing_item_row_container">
        <div class="standing_item_row_rank">
          <span>{{ props.standingData.rank }}</span>
        </div>
        <div class="p-head">
          <img src="../assets/images/logo-zzuli.webp" alt="logo">
        </div>
        <div class="p-pipe">
          <t-tooltip placement="bottom" :content="`${props.standingData.part1.score} / 1000`">
            <img
              src="../assets/images/progress/pipe-filled-lv-1.png"
              alt="l1"
              class="p-level"
              :style="`width:${props.standingData.part1.ratio}%`"
            >
            <img
              src="../assets/images/progress/node-lv-1.png"
              alt="l1-node"
              class="p-level-node"
            >
          </t-tooltip>
        </div>
        <div class="p-node" />
        <div class="p-pipe">
          <t-tooltip placement="bottom" :content="`${props.standingData.part2.score} / 1000`">
            <img
              v-if="props.standingData.part1.status"
              src="../assets/images/progress/pipe-filled-lv-2.png"
              alt="l2"
              class="p-level"
              :style="`width:${props.standingData.part2.ratio}%`"
            >
            <img
              v-else
              src="../assets/images/progress/pipe-filled-normal.png"
              alt="l2"
              class="p-level"
              :style="`width:${props.standingData.part2.ratio}%`"
            >
          </t-tooltip>
          <img
            v-if="props.standingData.part1.status"
            src="../assets/images/progress/node-lv-2.png"
            alt="l2-node"
            class="p-level-node"
          >
        </div>
        <div class="p-node" />
        <div class="p-pipe">
          <t-tooltip placement="bottom" :content="`${props.standingData.part3.score} / 900`">
            <img
              v-if="props.standingData.part2.status"
              src="../assets/images/progress/pipe-filled-lv-3.png"
              alt="l3"
              class="p-level"
              :style="`width:${props.standingData.part3.ratio}%`"
            >
            <img
              v-else
              src="../assets/images/progress/pipe-filled-normal.png"
              alt="l3"
              class="p-level"
              :style="`width:${props.standingData.part3.ratio}%`"
            >
          </t-tooltip>
          <img
            v-if="props.standingData.part2.status"
            src="../assets/images/progress/node-lv-3.png"
            alt="l3-node"
            class="p-level-node"
          >
        </div>
        <div class="p-end" />
        <div class="standing_item_row_rank">
          <span>{{ props.standingData.score }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.standing_item_container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* 8px */
  width: 1270px;
  height: 115px;
  padding: 1.25rem 0.625rem;
  /* 20px 10px */
}

.standing_item_container:nth-child(odd) {
  background-color: rgba(75, 85, 99, 0.3);
  /* gray-600 with 30% opacity */
}

.standing_item_title {
  padding-left: 210px;
}

.standing_item_row_container {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 1270px;
}

.standing_item_row_rank {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 160px;
}

.standing_item_row_rank span {
  color: #facc15;
  /* yellow-400 */
  font-weight: 800;
  font-style: italic;
  font-size: 1.875rem;
  /* 30px */
}

.p-head {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 45px;
  height: 50px;
  background-image: url("../assets/images/progress/head.png");
}

.p-head img {
  width: 40px;
  height: 40px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.p-end {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 45px;
  height: 50px;
  background-image: url("../assets/images/progress/end.png");
}

.p-pipe {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 260px;
  height: 28px;
  background-image: url("../assets/images/progress/pipe.png");
}

.p-node {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height: 40px;
  background-image: url("../assets/images/progress/node.png");
  background-repeat: no-repeat;
}

.p-level-node {
  position: absolute;
  display: inline-block;
  vertical-align: middle;
  z-index: 10;
  margin-top: -13px;
  margin-left: -5px;
}

.p-level {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  z-index: 1;
  top: 4px;
  height: 20px;
}
</style>

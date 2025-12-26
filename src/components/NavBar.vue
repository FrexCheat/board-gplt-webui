<script setup lang="ts">
import { GITHUB_ISSUES, GITHUB_PULLREQUESTS, GITHUB_REPO } from "@/composables/constant";
</script>

<template>
  <header class="navbar">
    <t-link hover="color" :href="GITHUB_REPO" target="_blank">
      <template #prefix-icon>
        <logo-github-filled-icon
          fill-color="currentColor"
          stroke-color="currentColor"
          :stroke-width="2.5"
          size="27"
        />
      </template>
    </t-link>
    <t-link hover="color" :href="GITHUB_ISSUES" target="_blank">
      <template #prefix-icon>
        <help-circle-filled-icon
          fill-color="currentColor"
          stroke-color="currentColor"
          :stroke-width="2.5"
          size="27"
        />
      </template>
    </t-link>
    <t-link hover="color" :href="GITHUB_PULLREQUESTS" target="_blank">
      <template #prefix-icon>
        <git-pull-request-filled-icon
          fill-color="currentColor"
          stroke-color="currentColor"
          :stroke-width="2.5"
          size="27"
        />
      </template>
    </t-link>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 1.25rem;
  padding-right: 1rem;
  width: 100%;
}
</style>

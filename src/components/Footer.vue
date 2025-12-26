<script setup lang="ts">
import { GITHUB_REPO } from "@/composables/constant";
import FooterLogo from "./icon/FooterLogo.vue";
</script>

<template>
  <footer class="footer_container">
    <div class="footer_main">
      <FooterLogo id="footer-logo" />
      <span>ZZULI GPLT Contest Board</span>
    </div>
    <div class="footer_info">
      <span>Online Board Service of GPLT</span>
    </div>
    <div class="footer_links">
      <t-link size="large" href="/">
        <template #suffix-icon>
          <arrow-right-up-icon
            fill-color="transparent"
            stroke-color="currentColor"
            :stroke-width="2"
          />
        </template>
        Home
      </t-link>
      <t-link size="large" :href="GITHUB_REPO" target="_blank">
        <template #suffix-icon>
          <logo-github-filled-icon
            fill-color="currentColor"
            stroke-color="currentColor"
            :stroke-width="2.5"
          />
        </template>
        Repo
      </t-link>
      <t-tooltip content="frexdeveloper@gmail.com" placement="right">
        <t-link size="large" href="mailto:frexdeveloper@gmail.com">
          <template #suffix-icon>
            <mail-icon
              fill-color="transparent"
              stroke-color="currentColor"
              :stroke-width="2"
            />
          </template>
          Mail
        </t-link>
      </t-tooltip>
    </div>
    <div class="footer_info">
      <span font-500>© 2023-2025 ZZULI GPLT Contest Board</span>
    </div>
  </footer>
</template>

<style scoped>
.footer_container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 5rem;
  margin-bottom: 3rem;
  align-items: center;
  justify-content: center;
}

.footer_main {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.footer_main #footer-logo {
  font-size: 1.5rem;
}

.footer_main span {
  font-size: 1.5rem;
  font-weight: 800;
}

.footer_info {
  display: flex;
  justify-content: center;
}

.footer_info span {
  font-weight: 500;
}

.footer_links {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
}
</style>

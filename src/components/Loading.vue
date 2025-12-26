<template>
  <div class="loading_container">
    <div class="loading">
      <t-loading loading size="meduim" />
      <span>Loading Standings ......</span>
    </div>
  </div>
</template>

<style scoped>
.loading_container {
  display: flex;
  justify-content: center;
  padding-top: 2.5rem;
}

.loading {
  display: flex;
  gap: 1.25rem;
  align-items: center;
}

.loading span {
  font-weight: 800;
  font-size: 1.5rem;
}
</style>

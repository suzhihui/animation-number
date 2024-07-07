<script setup lang="ts">
import animationNumber from 'animation-number'
import { ref } from 'vue'
defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <animation-number />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

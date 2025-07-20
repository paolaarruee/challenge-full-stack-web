<template>
  <v-text-field
    v-model="searchTerm"
    label="Buscar aluno por nome ou RA"
    variant="outlined"
    prepend-inner-icon="mdi-magnify"
    clearable
    @input="$emit('update:search', searchTerm)"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const searchTerm = ref('')
</script>

<style scoped>
.v-text-field {
  max-width: 400px;
  margin-bottom: 1rem;
}
</style>
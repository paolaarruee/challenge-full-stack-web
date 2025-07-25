<template>
  <v-dialog v-model="model" max-width="500">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <slot>
          {{ message }}
        </slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" variant="text" @click="cancel">Cancelar</v-btn>
        <v-btn :color="confirmColor" variant="elevated" @click="confirm">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: String,
  message: String,
  confirmColor: {
    type: String,
    default: 'primary'
  }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const cancel = () => {
  emit('update:modelValue', false)
}

const confirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}
</script>
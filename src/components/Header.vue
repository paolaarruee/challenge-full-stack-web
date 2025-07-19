<template>
    <v-card>
        <v-layout>
            <v-app-bar color='indigo' absolute flat>
                <v-app-bar-title>Grupo +A</v-app-bar-title>

                <template v-slot:extension>
                    <v-tabs v-model="tabs" align-tabs="title" slider-color="pink">
                        <v-tab text="Lista de Alunos" value="one" />
                        <v-tab text="Cadastro de Alunos" value="two" />
                        <v-tab text="Login" value="three" />
                    </v-tabs>
                </template>
            </v-app-bar>

            <v-main>
                <!-- conteúdo -->
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ref(null)
</script>

<style scoped>
.v-tabs .v-tab:hover {
    background-color: transparent !important;
    color: inherit !important;
    box-shadow: none !important;
    cursor: default !important;
}

.v-tabs .v-tab:focus {
    outline: none !important;
    background-color: transparent !important;
    box-shadow: none !important;
}
</style>
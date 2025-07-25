<template>
    <v-card>
        <v-layout>
            <v-app-bar color='indigo' absolute flat>
                <v-app-bar-title>Grupo +A</v-app-bar-title>

                <template v-slot:extension>
                    <v-tabs v-model="tabs" align-tabs="title" slider-color="pink">

                        <v-tab to="/" value="/" text="Lista de Alunos" />
                        <v-tab to="/cadastro" value="/cadastro" text="Cadastro de Alunos" />
                        <v-tab text="Login" />
                    </v-tabs>
                </template>
            </v-app-bar>

            <v-main>

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
    cursor: default  !important;
}

.v-tabs .v-tab:focus {
    outline: none !important;
    background-color: transparent !important;
    box-shadow: none !important;
}
</style>
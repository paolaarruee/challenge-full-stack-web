<template>
    <v-container>
        <h1 class="title">Lista Alunos</h1>
        <div class="toolbar d-flex justify-space-between align-center mb-4">
            <v-text-field v-model="search" class="search-input" label="Buscar aluno" prepend-inner-icon="mdi-magnify"
                clearable />
            <router-link to="/cadastro">
                <v-btn size="large" color="red">
                    Cadastrar Aluno
                </v-btn>
            </router-link>
        </div>
        <v-table>
            <thead>
                <tr>
                    <th>Registro Academico</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in paginatedStudents" :key="student.ra">
                    <td>{{ student.ra }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ student.cpf }}</td>
                    <td>
                        <v-icon small class="mr-2" color="blue" title="Editar">mdi-pencil</v-icon>
                        <v-icon small color="red" title="Excluir">mdi-delete</v-icon>
                    </td>
                </tr>
            </tbody>
        </v-table>

        <v-pagination v-model="currentPage" :length="Math.ceil(filteredStudents.length / itemsPerPage)" class="mt-4"
            color="indigo" />

    </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { Student } from '../types/Student'
import { getAllStudents } from '../services/api'



const students = ref<Student[]>([])
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

const fetchStudents = async () => {
    try {
        const response = await getAllStudents()
        students.value = response.data
    } catch (error) {
        console.error('Erro ao buscar alunos:', error)
    }
}

onMounted(() => {
    fetchStudents()
})

const filteredStudents = computed(() => {
    const query = search.value.toLowerCase()
    return students.value.filter((student) =>
        Object.values(student).some((val) =>
            String(val).toLowerCase().includes(query)
        )
    )
})

const paginatedStudents = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredStudents.value.slice(start, end)
})
</script>

<style scoped>
::v-deep(.v-table) {
    background-color: #F5F6FA;
    color: #1C4E9B;
    font-weight: 500;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

::v-deep(.v-table thead) {
    background-color: #2E74D2;
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

::v-deep(.v-table thead th) {
    font-weight: bold;
    font-size: 14px;
}

::v-deep(.v-table tbody tr:nth-child(even)) {
    background-color: #E8F0FB;
}

::v-deep(.v-table tbody td) {
    border-bottom: 1px solid #D0D7E2;
    padding: 12px 16px;
}

::v-deep(.v-pagination) {
    --v-theme-primary: #2E74D2;
}

.search-input {
    margin-bottom: 30px;
    max-width: 600px;
    height: 20px;
}

.title {
    display: flex;
    justify-content: center;
}
</style>
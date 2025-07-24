<template>
    <v-container>
        <h1 class="title">Lista Alunos</h1>
        <div class="toolbar d-flex justify-space-between align-center mb-4">
            <v-text-field v-model="search" class="search-input" label="Buscar aluno" prepend-inner-icon="mdi-magnify"
                clearable />
            <router-link to="/cadastro">
                <v-btn size="large" color="red">Cadastrar Aluno</v-btn>
            </router-link>
        </div>

        <v-table>
            <thead>
                <tr>
                    <th>Registro Acadêmico</th>
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
                        <v-icon color="blue" class="me-2" @click="openEditModal(student)">mdi-pencil</v-icon>
                        <v-icon color="red" @click="openDeleteModal(student)">mdi-delete</v-icon>
                    </td>
                </tr>
            </tbody>
        </v-table>

        <!-- Modal Edição com formulário -->
        <ConfirmDialog v-model="showEditModal" title="Editar Aluno" confirmColor="blue" @confirm="saveEdit">
            <v-form ref="editFormRef" v-model="valid">
                <v-text-field v-model="editForm.name" label="Nome" :rules="[v => !!v || 'Nome é obrigatório']"
                    required />
                <v-text-field v-model="editForm.email" label="Email" :rules="[
                    v => !!v || 'Email é obrigatório',
                    v => /.+@.+\..+/.test(v) || 'Email inválido',
                ]" required />
            </v-form>
        </ConfirmDialog>

        <!-- Modal Exclusão -->
        <ConfirmDialog v-model="showDeleteModal" title="Excluir Aluno"
            message="Tem certeza que deseja excluir este aluno?" confirmColor="red" @confirm="deleteStudent" />
    </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, ComponentPublicInstance } from 'vue'
import { Student } from '../types/Student'
import { getAllStudents, updateStudent, apiDeleteStudent } from '../services/api'
import ConfirmDialog from '../components/ConfirmDialog.vue'

const students = ref<Student[]>([])
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

const showDeleteModal = ref(false)
const showEditModal = ref(false)
const selectedStudent = ref<Student | null>(null)

// Form edit fields separados para reatividade correta
const editForm = ref({ name: '', email: '' })

// Referência para o v-form do Vuetify para validar antes de salvar
const editFormRef = ref<ComponentPublicInstance<{ validate: () => boolean }> | null>(null)
const valid = ref(false)

const fetchStudents = async () => {
    try {
        const response = await getAllStudents()
        students.value = response.data
    } catch (error) {
        console.error('Erro ao buscar alunos:', error)
    }
}

onMounted(fetchStudents)

const filteredStudents = computed(() => {
    const query = search.value.toLowerCase()
    return students.value.filter(student =>
        Object.values(student).some(val => String(val).toLowerCase().includes(query))
    )
})

const paginatedStudents = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredStudents.value.slice(start, start + itemsPerPage)
})

const openEditModal = (student: Student) => {
    selectedStudent.value = student
    editForm.value.name = student.name
    editForm.value.email = student.email
    showEditModal.value = true
}

const openDeleteModal = (student: Student) => {
    selectedStudent.value = student
    showDeleteModal.value = true
}

const saveEdit = async () => {
    console.log('saveEdit chamado', editForm.value)

    if (!(editFormRef.value?.validate?.())) {
        console.log('Formulário inválido')
        return
    }
    if (!selectedStudent.value) {
        console.log('Nenhum aluno selecionado')
        return
    }

    try {
        const response = await updateStudent(selectedStudent.value.id, {
            name: editForm.value.name,
            email: editForm.value.email,
        })
        console.log('Resposta updateStudent:', response)

        const index = students.value.findIndex(s => s.id === selectedStudent.value?.id)
        if (index !== -1) {
            students.value[index].name = editForm.value.name
            students.value[index].email = editForm.value.email
        }

        showEditModal.value = false
    } catch (error) {
        console.error('Erro ao editar aluno:', error)
    }
}

const deleteStudent = async () => {
    if (!selectedStudent.value) return

    try {
        await apiDeleteStudent(selectedStudent.value.id)
        students.value = students.value.filter(s => s.id !== selectedStudent.value?.id)
        showDeleteModal.value = false
    } catch (error) {
        console.error('Erro ao excluir aluno:', error)
    }
}
</script>

<style scoped>
.title {
    display: flex;
    justify-content: center;
}

.search-input {
    max-width: 600px;
}

::v-deep(.v-table) {
    background-color: #f5f6fa;
    color: #1c4e9b;
    font-weight: 500;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

::v-deep(.v-table thead) {
    background-color: #2e74d2;
    color: white;
}

::v-deep(.v-table tbody tr:nth-child(even)) {
    background-color: #e8f0fb;
}

::v-deep(.v-table tbody td) {
    border-bottom: 1px solid #d0d7e2;
    padding: 12px 16px;
}
</style>
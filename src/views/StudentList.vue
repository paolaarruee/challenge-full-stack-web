<template>
    <v-container>
        <h1 class="title">Lista Alunos</h1>
        <div class="toolbar d-flex justify-space-between align-center mb-4">
            <v-text-field v-model="search" class="search-input" label="Buscar aluno" prepend-inner-icon="mdi-magnify"
                clearable />
            <v-btn size="large" color="red">Cadastrar Aluno</v-btn>
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
import { ref, computed } from 'vue'
import { Student } from '../types/Student'



const students = ref<Student[]>([
    { id: 1, ra: '100002', name: 'Bruno Silva', cpf: '234.567.890-11', email: 'bruno.silva@example.com' },
    { id: 2, ra: '100003', name: 'Carla Souza', cpf: '345.678.901-22', email: 'carla.souza@example.com' },
    { id: 3, ra: '100004', name: 'Daniel Costa', cpf: '456.789.012-33', email: 'daniel.costa@example.com' },
    { id: 4, ra: '100005', name: 'Eduarda Lima', cpf: '567.890.123-44', email: 'eduarda.lima@example.com' },
    { id: 5, ra: '100006', name: 'Felipe Rocha', cpf: '678.901.234-55', email: 'felipe.rocha@example.com' },
    { id: 6, ra: '100007', name: 'Gabriela Teixeira', cpf: '789.012.345-66', email: 'gabriela.teixeira@example.com' },
    { id: 7, ra: '100008', name: 'Henrique Castro', cpf: '890.123.456-77', email: 'henrique.castro@example.com' },
    { id: 8, ra: '100009', name: 'Isabela Ribeiro', cpf: '901.234.567-88', email: 'isabela.ribeiro@example.com' },
    { id: 9, ra: '100010', name: 'João Vitor', cpf: '012.345.678-99', email: 'joao.vitor@example.com' },
    { id: 10, ra: '100011', name: 'Karen Melo', cpf: '111.222.333-44', email: 'karen.melo@example.com' },
    { id: 11, ra: '100012', name: 'Lucas Martins', cpf: '222.333.444-55', email: 'lucas.martins@example.com' },
    { id: 12, ra: '100013', name: 'Marina Gomes', cpf: '333.444.555-66', email: 'marina.gomes@example.com' },
    { id: 13, ra: '100014', name: 'Nicolas Almeida', cpf: '444.555.666-77', email: 'nicolas.almeida@example.com' },
    { id: 14, ra: '100015', name: 'Olívia Fernandes', cpf: '555.666.777-88', email: 'olivia.fernandes@example.com' },
    { id: 15, ra: '100016', name: 'Paulo Azevedo', cpf: '666.777.888-99', email: 'paulo.azevedo@example.com' },
    { id: 16, ra: '100017', name: 'Quésia Nunes', cpf: '777.888.999-00', email: 'quesia.nunes@example.com' },
    { id: 17, ra: '100018', name: 'Rafael Duarte', cpf: '888.999.000-11', email: 'rafael.duarte@example.com' },
    { id: 18, ra: '100019', name: 'Sabrina Leite', cpf: '999.000.111-22', email: 'sabrina.leite@example.com' },
    { id: 19, ra: '100020', name: 'Tiago Barros', cpf: '000.111.222-33', email: 'tiago.barros@example.com' },
    { id: 20, ra: '100021', name: 'Ursula Silva', cpf: '101.202.303-44', email: 'ursula.silva@example.com' },
    { id: 21, ra: '100022', name: 'Victor Sales', cpf: '202.303.404-55', email: 'victor.sales@example.com' },
    { id: 22, ra: '100023', name: 'Wesley Santos', cpf: '303.404.505-66', email: 'wesley.santos@example.com' },
    { id: 23, ra: '100024', name: 'Xuxa Meneghel', cpf: '404.505.606-77', email: 'xuxa.meneghel@example.com' },
    { id: 24, ra: '100025', name: 'Yasmin Souza', cpf: '505.606.707-88', email: 'yasmin.souza@example.com' },
    { id: 25, ra: '100026', name: 'Zeca Camargo', cpf: '606.707.808-99', email: 'zeca.camargo@example.com' },
    { id: 26, ra: '100027', name: 'Alan Turing', cpf: '707.808.909-00', email: 'alan.turing@example.com' },
    { id: 27, ra: '100028', name: 'Beatriz Mendes', cpf: '808.909.010-11', email: 'beatriz.mendes@example.com' },
    { id: 28, ra: '100029', name: 'Caio Oliveira', cpf: '909.010.121-22', email: 'caio.oliveira@example.com' },
    { id: 29, ra: '100030', name: 'Diana Borges', cpf: '010.121.232-33', email: 'diana.borges@example.com' },
    { id: 30, ra: '100031', name: 'Erick Ramos', cpf: '121.232.343-44', email: 'erick.ramos@example.com' },
    { id: 31, ra: '100032', name: 'Fernanda Lima', cpf: '232.343.454-55', email: 'fernanda.lima@example.com' },
    { id: 32, ra: '100033', name: 'Gustavo Silva', cpf: '343.454.565-66', email: 'gustavo.silva@example.com' },
    { id: 33, ra: '100034', name: 'Helena Prado', cpf: '454.565.676-77', email: 'helena.prado@example.com' },
    { id: 34, ra: '100035', name: 'Igor Nogueira', cpf: '565.676.787-88', email: 'igor.nogueira@example.com' },
    { id: 35, ra: '100036', name: 'Julia Castro', cpf: '676.787.898-99', email: 'julia.castro@example.com' },
    { id: 36, ra: '100037', name: 'Kaique Barbosa', cpf: '787.898.909-00', email: 'kaique.barbosa@example.com' },
    { id: 37, ra: '100038', name: 'Larissa Moura', cpf: '898.909.010-11', email: 'larissa.moura@example.com' },
    { id: 38, ra: '100039', name: 'Matheus Rocha', cpf: '909.010.121-22', email: 'matheus.rocha@example.com' },
    { id: 39, ra: '100040', name: 'Natália Pires', cpf: '010.121.232-33', email: 'natalia.pires@example.com' },
])

const search = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

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
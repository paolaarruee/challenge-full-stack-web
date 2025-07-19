<template>
    <v-container>
        <v-card>

            <h2>Lista de Alunos</h2>


            <v-table striped="even">
                <thead>
                    <tr>
                        <th class="text-left">Registro Acadêmico</th>
                        <th class="text-left">Nome</th>
                        <th class="text-left">CPF</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in paginatedStudents" :key="item.ra">
                        <td>{{ item.ra }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.cpf }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>

        <div class="text-center mt-4">
            <v-pagination v-model="page" :length="Math.ceil(students.length / itemsPerPage)" :total-visible="5"
                next-icon="mdi-menu-right" prev-icon="mdi-menu-left" />
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface Student {
    ra: string
    name: string
    cpf: string
}

const students = ref<Student[]>([
    { ra: '100001', name: 'Ana Paula', cpf: '123.456.789-00' },
    { ra: '100002', name: 'Bruno Silva', cpf: '234.567.890-11' },
    { ra: '100003', name: 'Carla Souza', cpf: '345.678.901-22' },
    { ra: '100004', name: 'Daniel Costa', cpf: '456.789.012-33' },
    { ra: '100005', name: 'Eduarda Lima', cpf: '567.890.123-44' },
    { ra: '100006', name: 'Felipe Rocha', cpf: '678.901.234-55' },
    { ra: '100007', name: 'Gabriela Teixeira', cpf: '789.012.345-66' },
    { ra: '100008', name: 'Henrique Castro', cpf: '890.123.456-77' },
    { ra: '100009', name: 'Isabela Ribeiro', cpf: '901.234.567-88' },
    { ra: '100010', name: 'João Vitor', cpf: '012.345.678-99' },
    { ra: '100011', name: 'Karen Melo', cpf: '111.222.333-44' },
    { ra: '100012', name: 'Lucas Martins', cpf: '222.333.444-55' },
    { ra: '100013', name: 'Marina Gomes', cpf: '333.444.555-66' },
    { ra: '100014', name: 'Nicolas Almeida', cpf: '444.555.666-77' },
    { ra: '100015', name: 'Olívia Fernandes', cpf: '555.666.777-88' },
    { ra: '100016', name: 'Paulo Azevedo', cpf: '666.777.888-99' },
    { ra: '100017', name: 'Quésia Nunes', cpf: '777.888.999-00' },
    { ra: '100018', name: 'Rafael Duarte', cpf: '888.999.000-11' },
    { ra: '100019', name: 'Sabrina Leite', cpf: '999.000.111-22' },
    { ra: '100020', name: 'Tiago Barros', cpf: '000.111.222-33' },
    { ra: '100021', name: 'Ursula Silva', cpf: '101.202.303-44' },
    { ra: '100022', name: 'Victor Sales', cpf: '202.303.404-55' },
    { ra: '100023', name: 'Wesley Santos', cpf: '303.404.505-66' },
    { ra: '100024', name: 'Xuxa Meneghel', cpf: '404.505.606-77' },
    { ra: '100025', name: 'Yasmin Souza', cpf: '505.606.707-88' },
    { ra: '100026', name: 'Zeca Camargo', cpf: '606.707.808-99' },
    { ra: '100027', name: 'Alan Turing', cpf: '707.808.909-00' },
    { ra: '100028', name: 'Beatriz Mendes', cpf: '808.909.010-11' },
    { ra: '100029', name: 'Caio Oliveira', cpf: '909.010.121-22' },
    { ra: '100030', name: 'Diana Borges', cpf: '010.121.232-33' },
    { ra: '100031', name: 'Erick Ramos', cpf: '121.232.343-44' },
    { ra: '100032', name: 'Fernanda Lima', cpf: '232.343.454-55' },
    { ra: '100033', name: 'Gustavo Silva', cpf: '343.454.565-66' },
    { ra: '100034', name: 'Helena Prado', cpf: '454.565.676-77' },
    { ra: '100035', name: 'Igor Nogueira', cpf: '565.676.787-88' },
    { ra: '100036', name: 'Julia Castro', cpf: '676.787.898-99' },
    { ra: '100037', name: 'Kaique Barbosa', cpf: '787.898.909-00' },
    { ra: '100038', name: 'Larissa Moura', cpf: '898.909.010-11' },
    { ra: '100039', name: 'Matheus Rocha', cpf: '909.010.121-22' },
    { ra: '100040', name: 'Natália Pires', cpf: '010.121.232-33' },
])

const page = ref(1)
const itemsPerPage = 10

const paginatedStudents = computed(() => {
    const start = (page.value - 1) * itemsPerPage
    return students.value.slice(start, start + itemsPerPage)
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
</style>
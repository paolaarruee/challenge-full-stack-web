<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed } from 'vue'
import { createStudent } from '../services/api'

const schema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    ra: yup
        .string()
        .required('Registro acadêmico é obrigatório')
        .matches(/^\d{1,10}$/, 'Máximo 10 dígitos numéricos'),
    cpf: yup
        .string()
        .required('CPF é obrigatório')
        .matches(/^\d{11}$/, 'CPF deve conter exatamente 11 dígitos numéricos'),
})

const { handleSubmit, meta } = useForm({
    validationSchema: schema,
    validateOnMount: false
})

const name = useField('name')
const email = useField('email')
const ra = useField('ra')
const cpf = useField('cpf')

const onSubmit = handleSubmit(async (values) => {
    try {
        await createStudent({
            name: values.name,
            cpf: values.cpf,
            ra: values.ra,
            email: values.email
        })
        console.log('Aluno cadastrado com sucesso!')
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error)
    }
})

const isFormValid = computed(() => meta.value.valid)

function onlyNumbers(event: Event) {
    const input = event.target as HTMLInputElement
    input.value = input.value.replace(/\D/g, '')
}
</script>

<template>
    <div class="body">
        <h2 class="title">
            Cadastro de Alunos
        </h2>
        <div class="form">
            <form @submit.prevent="onSubmit">
                <v-text-field v-model="name.value.value" :error-messages="name.errorMessage.value" label="Nome" />

                <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="Email" />

                <v-text-field v-model="ra.value.value" :error-messages="ra.errorMessage.value"
                    label="Registro Acadêmico" counter="10" @input="onlyNumbers" />

                <v-text-field v-model="cpf.value.value" :error-messages="cpf.errorMessage.value" label="CPF"
                    counter="11" @input="onlyNumbers" />

                <div class="d-flex justify-center mt-4">
                    <v-btn @click="onSubmit" :disabled="!isFormValid">
                        Enviar
                    </v-btn>
                </div>
            </form>
        </div>
    </div>


</template>

<style scoped>
::v-deep(.v-text-field) {
    max-width: 800px;
}

.body {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    padding-top: 30px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 900px;
    width: 100%;
    justify-content: center;
}
</style>
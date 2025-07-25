import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333', 
})

export const getAllStudents = () => api.get('/students')

export const getStudentById = (id: number) => api.get(`/students/${id}`)

export const createStudent  = (data: {
  name: string
  cpf: string
  ra: string
  email: string
}) => api.post('/student', data)

export const updateStudent = (id: number, data: { name: string; email: string }) =>
  api.put(`/student/${id}`, data)

export const apiDeleteStudent = (id: number) =>
  api.delete(`/student/${id}`)
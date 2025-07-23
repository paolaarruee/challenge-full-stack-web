export interface CreateStudentDTO  {
  name: string;
  email: string;
  ra: string;
  cpf: string;
}

export interface UpdateStudentDTO {
  name?: string;
  email?: string;
}
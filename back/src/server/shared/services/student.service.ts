import { CreateStudentDTO, UpdateStudentDTO } from "../../dtos/StudentDTO";
import { Student } from "../../models/Student";

export const StudentService = {
  async create(data: CreateStudentDTO) {
    const raExists = await Student.findOne({ where: { ra: data.ra } });
    if (raExists) throw new Error("RA já cadastrado");

    const cpfExists = await Student.findOne({ where: { cpf: data.cpf } });
    if (cpfExists) throw new Error("CPF já cadastrado");

    const normalizedData = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      ra: data.ra,
      cpf: data.cpf,
    };

    const student = await Student.create(normalizedData);
    return student;
  },

  async update(id: number, updateData: UpdateStudentDTO) {
    const student = await Student.findByPk(id);
    if (!student) throw new Error("Aluno não encontrado");

    if ("ra" in updateData || "cpf" in updateData) {
      throw new Error("RA e CPF não podem ser alterados");
    }

    if (updateData.name) {
      updateData.name = updateData.name.trim();
    }

    if (updateData.email) {
      updateData.email = updateData.email.toLowerCase().trim();
    }

    await student.update(updateData);
    return student;
  },

  async getAll() {
    return Student.findAll();
  },

  async getById(id: number) {
    const student = await Student.findByPk(id);
    if (!student) throw new Error("Aluno não encontrado");
    return student;
  },

  async delete(id: number) {
    const student = await Student.findByPk(id);
    if (!student) throw new Error("Aluno não encontrado");

    await student.destroy();
    return { message: "Aluno excluído com sucesso" };
  },
};

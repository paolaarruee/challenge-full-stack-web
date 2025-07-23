import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Student } from "../../models/Student"; // <- Modelo Sequelize
import { UpdateStudentDTO } from "../../dtos/StudentDTO"; // <- Apenas tipo

interface IParamProps {
  id?: number;
}

export const updateById = async (
  req: Request<IParamProps, {}, UpdateStudentDTO>,
  res: Response
) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const student = await Student.findByPk(id);

    if (!student) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Aluno não encontrado." });
    }

    if (name !== undefined) student.name = name.trim();
    if (email !== undefined) student.email = email.toLowerCase().trim();

    await student.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Aluno atualizado com sucesso.", student });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro ao atualizar aluno." });
  }
};

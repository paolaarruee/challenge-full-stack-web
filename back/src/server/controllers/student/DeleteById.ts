import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Student } from '../../models/Student';

interface IParamProps {
  id?: number;
}

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  const { id } = req.params;

  try {
    const student = await Student.findByPk(id);

    if (!student) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Aluno não encontrado." });
    }

    await student.destroy();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Aluno excluído com sucesso." });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro ao excluir aluno." });
  }
};
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/Validation';
import { Student } from '../../models/Student';


interface IParamProps {
  id?: number;
}

export const getById = async (req: Request<IParamProps>, res: Response) => {
  const id = req.params.id;

  if (!id || isNaN(Number(id))) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'ID inválido.' });
  }

  try {
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Aluno não encontrado.' });
    }

    return res.status(StatusCodes.OK).json(student);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao buscar aluno.' });
  }
};
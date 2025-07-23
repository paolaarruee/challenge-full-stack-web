import { raw, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateStudentDTO } from "../../dtos/StudentDTO";
import { StudentService } from "../../shared/services/student.service";

interface IBodyProps extends Omit<CreateStudentDTO, "id"> {}

export const create = async (
  req: Request<{}, {}, CreateStudentDTO>,
  res: Response
) => {
  try {
    const student = await StudentService.create(req.body);
    return res.status(StatusCodes.CREATED).json(student);
  } catch (error: any) {
    if (
      error.message === "RA já cadastrado" ||
      error.message === "CPF já cadastrado"
    ) {
      return res.status(StatusCodes.CONFLICT).json({ error: error.message });
    }

    console.error("Erro ao criar aluno:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro ao criar aluno" });
  }
};

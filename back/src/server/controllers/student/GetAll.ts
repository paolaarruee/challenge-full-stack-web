import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { Student } from "../../models";
import { Op } from "sequelize/lib/operators";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  try {
    const { page = 1, limit = 10, filter } = req.query;

    const where = filter
      ? {
          name: {
            [Op.iLike]: `%${filter}%`,
          },
        }
      : {};

    const offset = (page - 1) * limit;

    const students = await Student.findAll({
      where,
      limit,
      offset,
      order: [["name", "ASC"]],
    });

    return res.status(StatusCodes.OK).json(students);
  } catch (error) {
    console.error("Erro no getAll:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro ao listar alunos" });
  }
};

import { CreateStudentDTO } from "../../dtos/StudentDTO";
import { validation } from "./Validation";
import * as yup from "yup";

interface IFilter {
  filter?: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<CreateStudentDTO>(
    yup.object().shape({
      name: yup
        .string()
        .required("Nome é obrigatório")
        .min(3, "Nome deve ter pelo menos 3 caracteres"),

      email: yup
        .string()
        .required("Email é obrigatório")
        .email("Email inválido"),

      ra: yup
        .string()
        .required("RA é obrigatório")
        .matches(/^\d{6,10}$/, "RA deve conter entre 6 e 10 dígitos numéricos"),

      cpf: yup
        .string()
        .required("CPF é obrigatório")
        .matches(/^\d{11}$/, "CPF deve conter exatamente 11 dígitos"),
    })
  ),
  query: getSchema<IFilter>(
    yup.object().shape({
      filter: yup.string().required().min(3).optional(),
    })
  ),
}));

export const getAllValidation = validation((getSchema) => ({
  query: getSchema(
    yup.object().shape({
      filter: yup.string().min(3).optional(),
    })
  ),
}));

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema(
    yup.object().shape({
      id: yup.number().required().positive().integer(),
    })
  ),
}));

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema(
    yup.object().shape({
      id: yup.number().required().positive().integer(),
    })
  ),
  body: getSchema(
    yup
      .object()
      .shape({
        name: yup.string().min(3).optional(),
        email: yup.string().email().optional(),
      })
      .noUnknown(true, "Apenas os campos name e email são permitidos")
  ),
}));

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema(
    yup.object().shape({
      id: yup.number().required().positive().integer(),
    })
  ),
}));

import { Router } from "express";
import { StudentController } from "../controllers";
import {
  createValidation,
  getAllValidation,
  getByIdValidation,
  updateByIdValidation,
  deleteByIdValidation,
} from "../shared/middlewares/student.validation";

const router = Router();

router.post("/student", createValidation, StudentController.create);
router.get("/students", getAllValidation, StudentController.getAll);
router.get("/student/:id", getByIdValidation, StudentController.getById);
router.put("/student/:id", updateByIdValidation, StudentController.updateById);
router.delete(
  "/student/:id",
  deleteByIdValidation,
  StudentController.deleteById
);

export { router };

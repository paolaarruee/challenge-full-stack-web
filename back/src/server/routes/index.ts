import { Router } from "express";
import { StudentController } from "../controllers";
import {
  createValidation,
  getAllValidation,
  getByIdValidation,
  updateByIdValidation,
  deleteByIdValidation,
} from "../shared/middlewares/student.validation";
import { register, login, getAllUsers, deleteUser } from "../controllers/user/userController";
import { authenticate } from "../shared/middlewares/authMiddleware";

const router = Router();

router.get("/students", getAllValidation, StudentController.getAll);
router.get("/student/:id", getByIdValidation, StudentController.getById);
router.post('/student', authenticate, createValidation, StudentController.create);
router.put('/student/:id', authenticate, updateByIdValidation, StudentController.updateById);
router.delete('/student/:id', authenticate, deleteByIdValidation, StudentController.deleteById);


router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

export { router };

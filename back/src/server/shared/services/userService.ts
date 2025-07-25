import { User } from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export class UserService {
  static async register(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios");
    }

    if (password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres");
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      throw new Error("Email já está em uso");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    return { id: user.id, email: user.email };
  }

  static async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    console.log("Senha digitada:", password);
    console.log("Senha no banco:", user.password);
    const senhaConfere = await bcrypt.compare(password, user.password);
    console.log("Senha confere?", senhaConfere);

    if (!senhaConfere) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token };
  }

  static async getAll() {
    return User.findAll({ attributes: ["id", "email"] });
  }

  static async deleteById(id: number) {
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) {
      throw new Error("Usuário não encontrado");
    }
    return { message: "Usuário removido com sucesso" };
  }
}

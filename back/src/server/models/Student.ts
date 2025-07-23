import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/database";

interface StudentAttributes {
  id: number;
  name: string;
  email: string;
  ra: string; 
  cpf: string; 
}

interface StudentCreationAttributes extends Optional<StudentAttributes, "id"> {}

export class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public ra!: string;
  public cpf!: string;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    ra: {
      type: new DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: new DataTypes.STRING(14),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "students",
    sequelize,
  }
);

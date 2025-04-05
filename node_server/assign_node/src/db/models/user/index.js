import { DataTypes } from "sequelize";
import { sequelize } from "../../config.js";

const userModel = sequelize.define(
    "User",
   {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

      },
   },
   {
    timestamps: true,
  },
)

export default userModel
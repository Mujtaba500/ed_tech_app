import { DataTypes } from "sequelize";
import { sequelize } from "../../config.js";
import userModel from "../user/index.js";

const subjectModel = sequelize.define(
    "Subject",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        }


    },
    
    
)

userModel.hasMany(subjectModel)
subjectModel.belongsTo(userModel)

export default subjectModel
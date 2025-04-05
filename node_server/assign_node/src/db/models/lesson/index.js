import { DataTypes } from "sequelize";
import { sequelize } from "../../config.js";
import userModel from "../user/index.js";
import subjectModel from "../subject/index.js";

const lessonModal = sequelize.define(
    "Lesson",
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
        videoURL: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    }
)

userModel.hasMany(lessonModal)
lessonModal.belongsTo(userModel)

subjectModel.hasMany(lessonModal, {onDelete: 'cascade'})
lessonModal.belongsTo(subjectModel)

export default lessonModal
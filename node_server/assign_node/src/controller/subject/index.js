import { sequelize } from "../../db/config.js";
import subjectModel from "../../db/models/subject/index.js";
import statusCodes from "../../utils/statusCodes.js";
import { QueryTypes } from "sequelize";
import { unlink } from "node:fs";

const subjectController = {
  createSubject: async (req, res) => {
    const { subjectName } = req.body;
    const image = req.file.filename;
    const { id } = req.user;

    try {
      console.log(req.file);
      const path = req.file.path.replace("src/uploads/", "");

      await subjectModel.create({
        name: subjectName,
        image: path,
        UserId: id,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: "Subject created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  },
  getSubjects: async (req, res) => {
    const { id } = req.user;

    try {
      const subjects = await sequelize.query(
        `SELECT * FROM Subjects WHERE UserId="${id}" ORDER BY createdAt ASC `,
        { type: QueryTypes.SELECT }
      );

      res.json({
        success: true,
        data: subjects,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  },
  deleteSubject: async (req, res) => {
    const subjectToDelete = req.params.id;
    const { username } = req.user;

    try {
      const subject = await subjectModel.findByPk(subjectToDelete);

      if (!subject) {
        return res.status(statusCodes.NOT_FOUND).json({
          message: "Subject not found",
        });
      }

      await sequelize.query(
        `DELETE FROM Subjects WHERE id="${subjectToDelete}"`,
        {
          // model: subjectModel,
          // mapToModel: true,
        }
      );

      // await subjectModel.destroy({
      //     where: {
      //         id: subjectToDelete
      //     },
      // })

      unlink(`src/uploads/images/${username}/${subject.image}`, (err) => {
        if (err) {
          console.error(err);
        }
        console.log("Image was deleted");
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: "Subject deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  },
  updateSubject: async (req, res) => {
    const subjectToUpdate = req.params.id;
    const subjectName = req.body.subjectName;

    try {
      const subject = await subjectModel.findByPk(subjectToUpdate);

      if (!subject) {
        return res.status(statusCodes.NOT_FOUND).json({
          message: "Subject not found",
        });
      }

      await subject.update({
        name: subjectName,
      });

      res.status(statusCodes.OK).json({
        message: "Subject updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  },
};

export default subjectController;

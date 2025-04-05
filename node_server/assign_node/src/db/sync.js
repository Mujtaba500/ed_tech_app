import { sequelize } from "./config.js";
import lessonModal from "./models/lesson/index.js";
import subjectModel from "./models/subject/index.js";
import userModel from "./models/user/index.js";

const syncDb = async () => {
    const dbName = process.env.DB_NAME
    try {

        if(dbName.match(/_test$/)){
            // WIll only run when db name ends with _test, as drops are destructive
            await sequelize.sync({force: true, match: /_test$/}).then(() => {
                console.log("Test db dropped and synced")
            })
        }else{
            await sequelize.sync({alter: true, force: false}).then(() => {
                console.log("Database synced successfully")
              });
            // await userModel.sync({alter: true})
            // await subjectModel.sync({alter: true})
            // await lessonModal.sync({alter: true})
        }
        
    } catch (error) {
        console.error(error)
    }

};

// -> Both destructive
// alter: true -> checks the table and perform necessary changes(deleting the columns not in schema and adding new columns)
// force: true -> Creates the table dropping it first if it already existed

export default syncDb;
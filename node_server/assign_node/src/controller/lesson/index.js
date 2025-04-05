import lessonModal from "../../db/models/lesson/index.js";
import statusCodes from "../../utils/statusCodes.js";
import { unlink, statSync,  createReadStream } from 'node:fs';

const lessonController = {
    createLesson : async (req, res) => {
        console.log(req.user)


            const lessonName = req.body.lessonName
            const video = req.file.path
            const subjectId = req.params.subjectId
            const {id} = req.user

            
            try {
    
            const lesson = await lessonModal.create({
                name: lessonName,
               UserId: id,
               SubjectId: subjectId,
               videoURL: video
            })
    
            res.status(statusCodes.OK).json({
                succces: true,
                message: "Lesson created successfully",
                data: lesson
            })
    
                
            } catch (error) {
                console.error(error)
                res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
                    message: "Internal server error"
                })
            }
    },
    getLessons: async (req,res) => {
        const {id} = req.user
        const subjectId = req.params.subjectId

        try {
                // const subjects = await sequelize.query(`SELECT * FROM Subjects WHERE UserId="${id}" `, { type: QueryTypes.SELECT })
            

                const lessons = await lessonModal.findAll({
                    where: {
                        UserId: id,
                        SubjectId: subjectId
                    },
                    order: [
                        ['createdAt', 'ASC']
                    ]
                })

                res.json({
                    success: true,
                    data: lessons
                })
        } catch (error) {
            console.error(error)
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error"
            })
        }

    },  
    deleteLesson: async (req,res) => {
        const lessonToDelete = req.params.lessonId
        const userId = req.user.id

        try {
        
            const lesson = await lessonModal.findOne({
                where: {
                    id: lessonToDelete,
                    UserId: userId
                }
            })

            if(!lesson){
                return  res.status(statusCodes.NOT_FOUND).json({
                    message: "Lesson not found"
                })
            }

            const path = lesson.videoURL

            unlink(path, (error) => {
                if (error){
                    return console.error(error)
                }
                console.log('Video was deleted')
            })

            await lesson.destroy()

            res.status(statusCodes.OK).json({
                success: true,
                message: "Lesson deleted successfully"
            })



        } catch (error) {
            console.error(error)
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error"
            })
        }
    },
    streamVideo: async (req,res) => {
        try {
        
        const range = req.headers.range;
        const path = req.query.path

        console.log(range)
        if (!range) {
            res.status(statusCodes.BAD_REQUEST).json({
                message: "Requires range header"
            });
        }

        // const path = "src/uploads/videos/mujtaba/video-1740632594153.mp4"
        const videoSize = statSync(path).size;
        console.log(videoSize)

        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));

        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        const contentLength = end - start + 1;

    const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    // "Content-Length": contentLength,
    "Content-Type": "video/mp4",
};

res.writeHead(206, headers); // partial responsE

const videoStream = createReadStream(path, { start, end });

videoStream.pipe(res);

        } catch (error) {
            console.error(error)
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error"
            })
        }
    }
}

export default lessonController
import statusCodes from "../../utils/statusCodes.js"
import userModel from "../../db/models/user/index.js";
import createToken from "../../utils/auth.js";
import { compare, hash } from "bcrypt";
import jwt from 'jsonwebtoken'


const userController = {

    register: async (req, res) => {
        try {
            const {username, password} = req.body

            const userCheck = await userModel.findOne({
                where: {
                  username
                },
              });

              if (userCheck) {
                return res.status(statusCodes.BAD_REQUEST).json({
                  message: "User with this username already exists",
                });
              }

              const hpassword = await hash(password, 10);

              const newUser = await userModel.create({
                username,
                password: hpassword
              });

              res.status(statusCodes.OK).json({
                success: true,
                message: "User created successfully",
              });


            
        } catch (error) {
            console.log("Something went wrong while registering user", error.message);
            console.error(error)
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
                success: false
              });
        }
    },
    login: async (req,res) => {
        try {
            const {username, password} = req.body;
            const user = await userModel.findOne({
                where: {
                    username
                }
            })
      
            if (!user) {
              return res.status(statusCodes.NOT_AUTHENTICATED).json({
                message: "Invalid Credentials",
              });
            }
      
            // check password
            const isPassValid = await compare(
              password,
              user.password
            );
            if (!isPassValid) {
              return res.status(statusCodes.NOT_AUTHENTICATED).json({
                message: "Invalid Credentials",
              });
            }

            const token =  createToken(user)
            
      
            res.status(statusCodes.OK).json({
                success: true,
              message: "User logged in successfully",
              data: {
                user: {
                    id: user.id,
                    username: user.username
                },
                token
              }
            });
          } catch (error) {
            console.log("Something went wrong while logging in user", error.message);
            console.error(error)
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
                success:false,
              message: "Internal Server Error",
            });
          }
      
    },
    checkAuth: async (req,res) => {
      let token = req.headers.authorization

      if(!token){
          return res.status(statusCodes.NOT_AUTHENTICATED).json({ message: "UnAuthorized" });
      }
  
      token = token.replace("Bearer ", "");
  
      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          
        const user = await userModel.findByPk(decoded.id)

        if(!user){
          return res.status(statusCodes.NOT_AUTHENTICATED).json({ message: "UnAuthorized" });
        }

        res.status(statusCodes.OK).json({
          success: true,
          data: {
            id: user.id,
            username: user.username
        },
        })

        } catch (err) {
          console.log("Error while verifying token", err.message);
          return res.status(statusCodes.NOT_AUTHENTICATED).json({ message: "UnAuthorized" });
        }
  
    }

}

export default userController
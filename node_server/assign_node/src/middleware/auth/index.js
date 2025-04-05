import jwt from 'jsonwebtoken'
import statusCodes from '../../utils/statusCodes.js'


const protectRoute = async (req,res,next) => {

    let token = req.headers.authorization

    if(!token){
        return res.status(statusCodes.NOT_AUTHENTICATED).json({ message: "UnAuthorized" });
    }

    token = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        console.log("Error while verifying token", err.message);
        return res.status(statusCodes.NOT_AUTHENTICATED).json({ message: "UnAuthorized" });
      }


}

export default protectRoute
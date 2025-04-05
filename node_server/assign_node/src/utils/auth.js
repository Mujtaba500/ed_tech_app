import jwt from 'jsonwebtoken'

const createToken = (user) => {
    const dataToSign = {
      id: user.id,
      username: user.username,
    };
  
    const token = jwt.sign(dataToSign, process.env.JWT_SECRET, {
      expiresIn: "15m"
    });
  
    return token;
  };

  export default createToken
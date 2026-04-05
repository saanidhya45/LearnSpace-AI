import jwt from "jsonwebtoken"


export const jwtAuthenticator = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                msg: "invalid or expired token"
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = payload; 

        next(); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "internal server error"
        });
    }
};

export const jwtTokenGenerator = (userInfo)=> {
    return jwt.sign(userInfo,
         process.env.JWT_SECRET_KEY,
        {expiresIn : "1d"})
}
// import jwt from 'jsonwebtoken';
// const requireAuth = async (req, res, next) => {
//     const { authorization } = req.headers;
//     if (!authorization) {
//         return res.status(401).json({message:'Unauthorized'});
//     }
//     const token = authorization.split(' ')[1]+"";
//     try {
//         const decoded =  jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         req.token = token;
//         next();
//     } catch (error) {
//         return res.status(500).json({message:error.message});
//     }
// }
// export default requireAuth;


import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        console.log('Authorization header missing');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authorization.split(' ')[1];
    try {
        console.log("auth success")
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.token = token;
        next();
    } catch (error) {
        console.log("auth not sucess");
        return res.status(500).json({ message: error.message });
    }
};

export default requireAuth;

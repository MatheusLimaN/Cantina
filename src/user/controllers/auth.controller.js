import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    var token = req.cookies.token;
    if (!token) return false;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return true;
    }
    catch (ex) {
        return false;
    }
}

const IsAuthenticated = (req, res, next) => {
    if (verifyJWT(req, res, next)) {
        next();
    } else {
        res.redirect('/login');
    }
}

export default IsAuthenticated
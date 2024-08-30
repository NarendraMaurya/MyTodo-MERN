const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET;

const userMiddleware = asyncHandler(async (req, res, next) => {
    const jwt_string = req.headers['authorization'];
    const token = jwt_string.split(' ')[1];

    if (!token === null) {
        console.log("Token missing");
        res.status(401);
        throw new Error('Authorization token missing');
    }


    const verified = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(verified.id).select('-password');

    if (!user) {
        res.status(401);
        throw new Error("User not found!!");
    }

    req.user = user;
    next();
})

module.exports = userMiddleware;
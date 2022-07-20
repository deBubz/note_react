const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

/**
 * @desc register new user
 * @route  POST /api/users
 * @access public 
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    
    // check user 
    const userExist = await User.findOne({email});
    if(userExist) {
        res.status(400);
        throw new Error('User already exist');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // no secret??

    // create account
    const user = await User.create({ name, email, password: hashedPassword });

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
    res.json({msg: 'register user'})
});

/**
 * @desc    authenticate a user
 * @route  POST /api/users/login
 * @access public 
 */
const loginUser = asyncHandler(async (req, res) => {
    res.json({msg: 'login user'})
})

/**
 * @desc    get user data
 * @route  get /api/users/me
 * @access private 
 */
const getMe = asyncHandler(async(req, res) => {
    res.json({msg: 'get user data'})
})




module.exports = {
    registerUser,
    loginUser,
    getMe
}
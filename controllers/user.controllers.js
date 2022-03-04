const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const jsw = require("jsonwebtoken")
const { JsonWebTokenError } = require('jsonwebtoken')
const { find } = require('../models/user')

const newUser = async ({ name, userName, email, password }) => {

    email = email.toLowerCase()
    userName = userName.toLowerCase()

    // Validación de email
    const findEmail = await User.findOne({ email })
    if (findEmail) throw new Error('Email already registred');

    // Validación de username
    const findUserName = await User.findOne({ userName })
    if (findUserName) throw new Error('Username already registred');

    // Generando encriptación de password 
    const salt = await bcryptjs.genSaltSync(10)
    password = await bcryptjs.hash(password, salt);

    // Saving data 
    const user = new User({ email, userName, name, password })
    user.save()

    return null;
}

const createToken = (user, SECRET_KEY, expiresIn) => {
    const { id, name, email, userName } = user
    const payload = { id, name, email, userName }
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

const authentication = async ({ email, password }) => {
    email = email.toLowerCase()
    const findUser = await User.findOne({ email })
    if (!findUser) throw new Error('Error: email or password are incorrect')

    const isCorrectPassword = await bcryptjs.compare(password, findUser.password)
    if (!isCorrectPassword) throw new Error('Error: email or password are incorrect')

    return {
        token: createToken(findUser, process.env.SECRET_KEY, '2h')
    }
}

module.exports = { newUser, authentication }
const mongoose = require("mongoose")
const schema = mongoose.schema

const userSchema = {
    name: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    avatar: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    }, 
    description: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}

module.exports = mongoose.model('User', userSchema)
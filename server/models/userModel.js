const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        minlength: [4, "Username required at least 4 characters"],
    },
    password: {
        type: String,
        select: false,
        required: [true, "Passsword is required"],
        minlength: [6, "Password required at least 6 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Invalid email"],
    },
    image: {
        type: Object,
        default: {
            public_id: "",
            url: "",
        },
    },
});

userModel.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

userModel.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

userModel.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWTSECRET, {
        expiresIn: process.env.JWTEXPIRE,
    });
};

const User = model("user", userModel);

module.exports = User;

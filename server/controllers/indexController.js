const User = require("../models/userModel");
const { sendToken } = require("../utils/auth");
const cloudinary = require("cloudinary");
const formidable = require("formidable");

cloudinary.config({
    cloud_name: "dhanesh-cloudinary",
    api_key: "176257529696164",
    api_secret: "FsvsmtHChA4V5HJXdYSuMzzRwSg",
    secure: true,
});

exports.homepage = (req, res, next) => {
    res.status(200).json({ message: "This is homepage", id: req.user });
};

exports.signup = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        const createduser = await newUser.save();
        // res.status(201).json(createduser);
        sendToken(res, 201, createduser, req);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.signin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log(req.files[0]);

        const user = await User.findOne({ username })
            .select("+password")
            .exec();

        if (!user) return res.status(404).json({ error: "User not found" });

        const matchPassword = await user.comparePassword(password);

        if (!matchPassword)
            return res.status(401).json({ error: "wrong inputs" });

        // res.status(201).json(user);

        sendToken(res, 200, user, req);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.logout = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message: "user logged out" });
};

exports.upload = async (req, res, next) => {
    try {
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) throw err;
            const user = await User.findById(req.params.id).exec();
            if (files) {
                const { public_id, secure_url } =
                    await cloudinary.v2.uploader.upload(files.image.filepath, {
                        folder: "r7",
                        width: 1920,
                        crop: "scale",
                    });
                user.image = { public_id, url: secure_url };
            }
            await User.findByIdAndUpdate(
                req.params.id,
                { $set: user },
                { new: true }
            ).exec();
            res.status(200).json({ message: "Image Uploaded" });
        });
    } catch (err) {
        res.send(err);
    }
};

exports.loaduser = async (req, res, next) => {
    try {
        const user = await User.findById(req.id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json(error);
    }
};

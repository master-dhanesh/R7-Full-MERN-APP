const mongoose = require("mongoose");

exports.dbconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("connection established!");
    } catch (err) {
        console.log(err.message);
    }
};

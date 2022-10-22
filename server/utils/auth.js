exports.sendToken = (res, statuscode, user, req) => {
    const token = user.getJWTToken();

    res.cookie("token", token, {
        expires: new Date(
            Date.now() + process.env.COOKIEEXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    });
    user.password = undefined;
    res.status(statuscode).json({
        success: true,
        user,
    });
};

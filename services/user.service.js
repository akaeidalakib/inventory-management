const User = require("../models/User");

exports.signupService = async (userInfo) => {
    const user = await User.create(userInfo);
    return user;
};

exports.getUsersService = async () => {
    const users = await User.find({});
    return users;
}
exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

exports.findUserByToken = async (token) => {
    return await User.findOne({ confirmationToken: token });
};

exports.updateUserService = async (email, data) => {
    const result = await User.updateOne({ email: email }, data, {
        runValidators: true
    });
    return result;
}
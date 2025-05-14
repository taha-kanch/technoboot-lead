const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt');

exports.register = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Email already in use');

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id);
    return { user: { id: user._id, name: user.name, email: user.email }, token };
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid email or password');

    const token = generateToken(user._id);
    return { user: { id: user._id, name: user.name, email: user.email }, token };
};

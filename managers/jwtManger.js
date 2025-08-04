const jwt = require('jsonwebtoken');

const jwtManger = (user) => {
    const token = jwt.sign(
        { _id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    return token; 
};

module.exports = jwtManger;

const jwt = require('jsonwebtoken')

function generateToken(user) {
    if (!user) {
        return null;
    }

    const u = {
        username: user.user_name,
        isAdmin: user.isAdmin
    };

    return jwt.sign(u, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
}

function getCleanUser(user) {
    if (!user) {
        return null;
    }

    return {
        username: user.user_name,
        isAdmin: user.isAdmin
    };
}

module.exports = {
    generateToken,
    getCleanUser
}
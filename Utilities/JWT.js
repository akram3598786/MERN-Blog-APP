
const jwt = require('jsonwebtoken')


function Sign(payload) {
    const SECRET = process.env.JWT_SECRET;
    return jwt.sign(payload, SECRET, {
        expiresIn: '1d',
    })
}

function Verify(token) {
    const SECRET = process.env.JWT_SECRET;
    try {
        return jwt.verify(token, SECRET)
    } catch (err) {
        throw new Error("error in verification of token !")
    }
}

function Decode(token) {
    return jwt.decode(token);
}

module.exports = {Sign,Verify,Decode};
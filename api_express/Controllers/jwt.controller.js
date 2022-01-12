const jwt = require('jsonwebtoken');
const SECRET = "wKYALB7JUGDiaUntkfuMqKkp4rCByGtkrp3qX787mTYfheMAI4tlz8GBHFri4gnz";

const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

exports.checkToken = async function(req, res, next) {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    // const token = req.headers.authorization && extractBearerToken(realToken)
    // Présence d'un token

    if (!token) {
        return res.status(401).json({ success: false, message: 'Error. Need a token' })
    }
    // Véracité du token
    jwt.verify(token, SECRET, (err) => {
        if (err) {
            res.status(401).json({ success: false, message: 'Error. Bad token' })
        } else {
            req.user = jwt.decode(token, {complete: false})
            return next()
        }
    })
}
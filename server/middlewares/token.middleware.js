import jwt from 'jsonwebtoken'

const authTokenMiddleware = (req, res, next) => {
    const { token } = req.cookies
    if (token == null) return res.sendStatus(403)

    return jwt.verify(token, String(process.env.TOKEN_SECRET), (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        return next()
    })
}

export default authTokenMiddleware

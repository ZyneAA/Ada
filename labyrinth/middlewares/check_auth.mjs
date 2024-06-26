const check_auth = (req, res, next) => {

    if(!req.session.passport.username ) res.status(403).json("Authentication Required")
    res.sendStatus(200)

    next()

}

export default check_auth
import { Router } from "express"
import passport from "passport"

const router = Router()

router.post(

    "/auth/local",
    passport.authenticate("local", {failureMessage: "Authentication Failed"}),
    async(req, res) => {

        req.session.login = true
        req.session.passport.username = req.body.username

        res.sendStatus(200)

    }

)

export default router

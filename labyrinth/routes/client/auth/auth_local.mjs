import { Router } from "express"
import passport from "passport"

const router = Router()

router.post(

    "/auth/local",
    passport.authenticate("local", {failureMessage: "Authentication Failed"}),
    async(req, res) => {

        req.session.visit = true
        console.log(req.session)
        res.sendStatus(200)

    }

)

export default router

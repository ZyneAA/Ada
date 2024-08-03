import { Router } from "express"
import passport from "passport"

const router = Router()

router.post(

    "/auth/local",
    passport.authenticate("local", {failureMessage: "Authentication Failed"}),
    async(req, res) => {

        res.sendStatus(200)

    }

)

export default router

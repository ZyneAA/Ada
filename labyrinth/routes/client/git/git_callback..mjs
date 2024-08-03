import { Router } from "express"
import passport from "passport"

const router = Router()

router.get(

    "/auth/github/callback",
    passport.authorize("github", { failureRedirect: "/"}),
    (req, res) => {

        // req.user.accounts.git = req.acconut.git
        req.session.passport.user.git_name = req.account.github.git_username
        req.session.passport.user.access_token = req.account.github.access_token
        console.log(req.account)
        console.log(req.session)
        res.redirect("http://localhost:8001/code")

    }

)

export default router
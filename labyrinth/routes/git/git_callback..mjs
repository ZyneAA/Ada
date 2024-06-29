import { Router } from "express"
import passport from "passport"

const router = Router()

router.get(

    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/", successRedirect: "http://localhost:8001/code"}),


)

export default router
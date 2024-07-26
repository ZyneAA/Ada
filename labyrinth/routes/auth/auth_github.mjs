import { Router } from "express"
import passport from "passport"

const router = Router()

router.get(

    "/auth/github",
    passport.authorize("github", {scope: ["user:email", "repo"]})

)

export default router
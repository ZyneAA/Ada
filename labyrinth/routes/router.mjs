import { Router } from "express"
import user from "./users/user.mjs"
import auth from "./auth/auth_local.mjs"
import session from "./session/session.mjs"
import register from "./lnr/register.mjs"
import test from "./test/test.mjs"

const router = Router()

router.use([user, auth, session, register, test])

export default router
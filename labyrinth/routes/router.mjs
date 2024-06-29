import { Router } from "express"
import user from "./users/user.mjs"
import auth_local from "./auth/auth_local.mjs"
import auth_github from "./auth/auth_github.mjs"
import github_callback from "./git/git_callback..mjs"
import session from "./session/session.mjs"
import register from "./lnr/register.mjs"
import test from "./test/test.mjs"

const router = Router()

router.use([user, auth_local, auth_github, github_callback, session, register, test])

export default router
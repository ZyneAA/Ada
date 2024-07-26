import { Router } from "express"
import user from "./users/user.mjs"
import auth_local from "./auth/auth_local.mjs"
import auth_github from "./auth/auth_github.mjs"
import github_callback from "./git/git_callback..mjs"
import session from "./session/session.mjs"
import register from "./lnr/register.mjs"
import test from "./test/test.mjs"
import repo from "./git/repo.mjs"
import youtube from "./youtube/youtube.mjs"
import text_2_text from "./AI/text_2_text.mjs"
import check from "./auth/check.mjs"
import profile from "./settings/profile.mjs"

const router = Router()

router.use([user, auth_local, auth_github, github_callback, 
            repo, session, register, test, youtube, text_2_text, 
            check, profile])

export default router
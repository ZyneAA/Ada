import { Router } from "express"

// Client
import user from "./client/users/user.mjs"
import auth_local from "./client/auth/auth_local.mjs"
import auth_github from "./client/auth/auth_github.mjs"
import github_callback from "./client/git/git_callback..mjs"
import session from "./client/session/session.mjs"
import register from "./client/lnr/register.mjs"
import test from "./client/test/test.mjs"
import repo from "./client/git/repo.mjs"
import youtube from "./client/youtube/youtube.mjs"
import text_2_text from "./client/AI/text_2_text.mjs"
import check from "./client/auth/check.mjs"
import profile from "./client/settings/profile.mjs"
import logout from "./client/lnr/logout.mjs"
import download from "./client/misc/download.mjs"

// Overwatch
import code_exe from "./overwatch/code_exe/code_exe.mjs"
import visitations from "./overwatch/visitations/visitations.mjs"
import admin_auth from "./overwatch/auth/admin_auth.mjs"

const router = Router()

router.use([user, auth_local, auth_github, github_callback,
            repo, session, register, test, youtube, text_2_text,
            check, profile, logout, code_exe, admin_auth, visitations,
            download])

export default router
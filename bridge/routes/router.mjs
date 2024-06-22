import { Router } from "express";
import misc from "./code_execution/misc.mjs"
import execute from "./code_execution/execute.mjs"
import sessions from "./sessions/sessions.mjs";
import user from "./user/user.mjs"

const router = Router()

router.use([misc, execute, sessions, user])

export default router
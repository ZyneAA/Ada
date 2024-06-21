import { Router } from "express";
import misc from "./code_execution/misc.mjs"
import execute from "./code_execution/execute.mjs"

const router = Router()
router.use([misc, execute])

export default router
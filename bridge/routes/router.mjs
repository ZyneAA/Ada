import { Router } from "express";
import misc from "./piston/misc.mjs"
import execute from "./piston/execute.mjs"

const router = Router()

router.use([misc, execute])

export default router
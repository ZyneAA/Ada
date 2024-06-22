import { Router } from "express"
import user from "./users/user.mjs"

const router = Router()

router.use([user])

export default router
import { Router } from "express"

const router = Router()

router.get(

    "/auth/check",
    async(req, res) => {

        res.status(200).json(req.session)

    }

)

export default router
import { Router } from "express"
import check_auth from "../../../middlewares/check_auth.mjs"

const router = Router()

router.get(

    "/test",
    check_auth,
    (req, res) => {

        res.status(200).json(req.session)

    }

)

export default router
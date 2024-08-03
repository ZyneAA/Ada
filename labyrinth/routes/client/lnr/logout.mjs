import { Router } from "express"

const router = Router()

router.delete(

    "/logout",
    async(req, res) => {

        req.session = null
        console.log(req.session)
        res.sendStatus(200)

    }

)

export default router
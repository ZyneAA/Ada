import { Router } from "express"

const router = Router()

router.get(

    "/auth/check",
    async(req, res) => {

        if(!req.session.hasOwnProperty("passport")){
            res.status(200).json(false)
        }
        else{
            res.status(200).json(true)
        }

    }

)

router.get(

    "/auth/get",
    async(req, res) => {

        res.status(200).json(req.session)

    }

)

export default router
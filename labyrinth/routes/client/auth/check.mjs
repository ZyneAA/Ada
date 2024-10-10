import { Router } from "express"

const router = Router()

router.get(

    "/auth/check",
    async(req, res) => {

        if(req.session.hasOwnProperty("passport")){
            console.log(req.session)
            res.status(200).json(true)
        }
        else{
            res.status(200).json(false)
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
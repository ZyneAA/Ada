import { Router } from "express"

const router = Router()

router.get(

    "/create_session",
    async(req, res) => {

        req.session.visited = true
        res.status(200).json([req.session, req.sessionID])

    }

)

router.get(

    "/get_session",
    async(req, res) => {

        console.log(req)
        res.status(200).json([req.session, req.sessionID])

    }

)

export default router
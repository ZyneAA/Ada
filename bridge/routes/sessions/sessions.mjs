import { Router } from "express"
import axios from "axios"

const router = Router()

router.get(

    "/birdge/v1/get_session",
    async(req, res) => {

        try{
            const respone = await axios.get(
                "http://labyrinth:8002/labyrinth"               
            ) 

            req.session.visited = true
            res.sendStatus(200)
        }
        catch(err) {
            res.status(400).json(err)
        }

    }

)

export default router
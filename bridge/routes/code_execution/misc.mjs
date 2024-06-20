import { Router } from "express";
import axios from "axios"

const router = Router()

router.get(

    "/birdge/v1/runtimes",
    async(req, res) => {

        try{
            const response = await axios.get(
                "http://piston_api:2000/api/v2/runtimes",
            )
            res.status(200).json(response.data)
        }
        catch(err){
            res.status(400).json(err)
        }

    }

)

export default router
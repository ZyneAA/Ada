import { Router } from "express";
import axios from "axios"

const router = Router()

router.post(

    "/birdge/v1/execute",
    async(req, res) => {

        const{
            body
        } = req

        const payload = body.payload

        try{
            const response = await axios.post(
                "http://piston_api:2000/api/v2/execute",
                payload
            )
            res.status(200).json(response.data)
        }
        catch(err){
            res.status(400).json(err)
        }

    }

)

export default router
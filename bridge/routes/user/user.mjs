import { Router } from "express"
import axios from "axios"

const router = Router()

router.post(

    "/birdge/v1/register_user",
    async(req, res) => {

        const{
            body
        } = req

        try{
            const respone = await axios.post(
                "http://labyrinth:8002/labyrinth/register_user",
                {
                    "username": body.username,
                    "email": body.email,
                    "password": body.password
                }
            )
            res.status(200).json(respone.data)
        }
        catch(err){
            res.status(400).json(err)
        }

    }

)

router.get(

    "/birdge/v1/check_user_exist_by_username",
    async(req, res) => {

        const username = req.query.username

        try{
            const respone = await axios.get(
                `http://labyrinth:8002/labyrinth/check_user_exist_by_username?username=${username}`
            )

            if(respone.data) {
                res.status(200).json(true)
            }
            else{
                res.status(404).json(false)
            }
        }
        catch(err){
            res.status(400).json(err)
        }

    }

)

export default router
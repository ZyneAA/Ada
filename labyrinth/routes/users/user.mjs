import { Router } from "express"
import axios from "axios"
import hash from "../../util/hash_password.mjs"

const router = Router()

router.post(

    "/labyrinth/register_user",
    async(req, res) => {

        const {
            body
        } = req

        const hashed_password = await hash.hash_password(body.password)

        try{
            const respone = await axios.post(
                "http://vault:8080/vault/add_user",
                {
                    "username": body.username,
                    "email": body.email,
                    "password": hashed_password
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

    "/labyrinth/check_user_exist_by_username",
    async(req, res) => {

        const username = req.query.username

        try{
            const respone = await axios.get(
                `http://vault:8080/vault/find_user_by_username?username=${username}`,
            )
            
            res.status(200).json(respone.data.username)
        }
        catch(err){
            res.status(400).json(err)
        }

    }

)

export default router

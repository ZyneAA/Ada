import { Router } from "express"
import axios from "axios"
import hash from "../../util/hash_password.mjs"
import user_db from "../../db/user_db.mjs"

const router = Router()

router.post(

    "/labyrinth/register_user",
    async(req, res) => {

        const {
            body
        } = req

        try{
            const respone = await user_db.add_user(body.username, body.email, body.password)
            res.status(201).json(respone)
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
            const respone = await user_db.find_user_by_username(username)
            res.status(200).json(respone)
        }
        catch(err){
            res.status(400).json(err)
        }

    }

)

router.get(

    "/labyrinth/check_user_exist_by_id",
    async(req, res) => {

        const id = req.query.id

        try{
            const respone = await user_db.find_user_by_id(id)
            res.status(200).json(respone)
        }
        catch(err){
            res.status(400).json(err)
        }

    }

)

export default router

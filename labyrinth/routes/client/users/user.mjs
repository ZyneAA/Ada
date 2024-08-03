import { Router } from "express"
import user_db from "../../../db/repository/user_db.mjs"
import axios from "axios"

const router = Router()

router.get(

    "/check_user_exist_by_username",
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

    "/check_user_exist_by_id",
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

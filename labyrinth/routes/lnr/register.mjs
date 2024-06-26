import { Router } from "express"
import user_db from "../../db/repository/user_db.mjs"

const router = Router()

router.post(

    "/register",
    async(req, res) => {

        const {
            body
        } = req

        try{
            const response = await user_db.add_user(body.username, body.email, body.password)
            res.status(201).json(response)
        }
        catch(err) {
            res.status(400).json(err)
        }

    }

)

export default router
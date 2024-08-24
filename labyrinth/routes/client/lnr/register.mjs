import { Router } from "express"
import user_db from "../../../db/repository/user_db.mjs"
import overwatch_db from "../../../db/repository/overwatch_db.mjs"

const router = Router()

router.post(

    "/register",
    async (req, res) => {

        const {
            fn, ln, username, email, password
        } = req.body

        try {

            const today = new Date()
            const month = today.getMonth() + 1
            const hours = today.getHours()
            const minutes = today.getMinutes()
            const seconds = today.getSeconds()

            const response = await user_db.add_user(username, email, password)

            const response1 = await user_db.find_user_by_username(username)

            const response2 = await user_db.update_user_profile(fn, ln, "", "", "", response1.user_id)

            const response3 = await overwatch_db.record_visitation(response1.user_id, today.getFullYear() + "-" + month + "-" + today.getDate() + " " + hours + ":" + minutes + ":" + seconds, today.getFullYear() + "-" + month + "-" + today.getDate() + " " + hours + ":" + minutes + ":" + seconds)

            res.status(201).json({ ...response, ...response2, ...response3 })
        }
        catch (err) {
            res.status(400).json(err)
        }

    }

)

export default router
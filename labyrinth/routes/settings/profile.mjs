import { Router } from "express"
import user_db from "../../db/repository/user_db.mjs"

const router = Router()

router.post(

    "/update_user_profile",
    async(req, res) => {

        const {
            fn,
            ln,
            status_1,
            status_2,
            bio
        } = req.body

        try{
            const respone = await user_db.update_user_profile(fn, ln, status_1, status_2, bio, req.session.passport.user.user_id)
            res.status(200).json(respone)
        }
        catch(err){
            res.status(400).json(err)
        }

    }

)

export default router
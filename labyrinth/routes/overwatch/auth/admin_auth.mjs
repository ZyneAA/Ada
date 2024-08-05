import { Router } from "express"
import passport from "passport"
import overwatch_db from "../../../db/repository/overwatch_db.mjs"

const router = Router()

router.post(

    "/auth/overwatch",
    // passport.authenticate("overwatch", {failureMessage: "Authentication Failed"}),
    async(req, res) => {

        const{
            body
        } = req
        
        const admin_name = body.admin_name
        const password = body.password

        try{
            const admin = await overwatch_db.get_admin_by_admin_name(admin_name)
            console.log(admin)

            if(admin.admin_name === null) throw new Error("Admin Not Found")

            if(password !== admin.password) throw new Error("Bad Credentials")

            res.status(200).json({"name": admin_name, "id": admin.admin_id})
        }
        catch(err){
            res.status(400).json("Can't Login")
        }
        
    }

)

export default router
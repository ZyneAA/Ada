import { Router } from "express"

const router = Router()

router.delete(

    "/logout",
    async(req, res) => {

        req.session.destroy((err) => {

            if (err) {
                console.log(err)
                return res.redirect('/')
            }
            
            res.clearCookie("connect.sid")
            res.redirect("/login")
        })

    }

)

export default router
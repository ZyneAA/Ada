import { Router } from "express" 
import axios from "axios"

const router = Router()

router.get(

    "/get_repos",
    async(req, res) => {

        try{
            const respone = await axios.get(
                "https://api.github.com/user/repos",
                {
                    headers: {
                        Authorization: `token ${req.session.passport.user.access_token}`,                 
                    }
                }
            )
            res.status(200).json(respone.data)
        }
        catch(err){
            console.log(err)
        }

    }

)

export default router
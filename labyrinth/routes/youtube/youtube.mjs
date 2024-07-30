import { Router } from "express"
import axios from "axios"
import get_secret from "../../util/get_secret.mjs"

const router = Router()

router.get(

    "/get_video_info",
    async(req, res) => {

        const info = req.query.name

        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search`,
                {
                    params: {
                        part: "snippet",
                        q: info,
                        key: get_secret(process.env.YOUTUBE_API_KEY),
                        type: "video",
                        maxResults: 10,
                    },
                }
            )

            if (response.data.items.length > 0) {
                console.log(response.data)
                res.status(200).json(response.data.items[0])
            }
            else {
                res.status(404).json("Video Not Found")
            }        
        }
        catch(err) {
            console.log(err)
        }

    }

)

export default router
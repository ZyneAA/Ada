import express from "express"
import axios from "axios"
import router from "./routes/router.mjs"

const app = express()
app.use(express.json())

app.get(

    "/labyrinth", 
    async(req, res) => {

        try{
            const respone = await axios.get(
                "http://vault:8080/vault"
            )

            const ok = {"response": respone.data}
            res.status(200).json(ok)
        }
        catch(err) {
            res.status(200).json(err)
        }
        
    }

)
app.use(router)

app.listen(

    process.env.LABYRINTH_PORT, () => {
        console.log(`Listening on port ${process.env.LABYRINTH_PORT}`)

    }

)
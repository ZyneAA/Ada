import express from "express"

import config from "./middlewares/config.mjs"

// Routes
import router from "./routes/router.mjs"

const app = express()

app.get(
    
    "/birdge/v1",
    async(req, res) => {
        res.status(200).json("bridge OK")
    }

)

app.use(express.json())

app.use(config)
app.use(router)

app.listen(

    process.env.BRIDGE_PORT, () => {
        console.log(`Listening on port ${process.env.BRIDGE_PORT}`)
    }

)
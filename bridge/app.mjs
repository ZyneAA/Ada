import express from "express"

import config from "./middlewares/config.mjs"

// Routes
import router from "./routes/router.mjs"

const app = express()

app.get(
    
    "/",
    async(req, res) => {
        res.status(200).json("OK")
    }

)

app.use(config)
app.use(router)

app.listen(

    process.env.EXPRESS_PORT, 
    process.env.EXPRESS_URL, () => {
        console.log(`Listening on ${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`)
    }

)
import express from "express"

const app = express()

app.get(
    
    "/",
    async(req, res) => {
        res.status(200).json("OK")
    }

)

app.listen(

    process.env.EXPRESS_PORT, 
    process.env.EXPRESS_URL, () => {
        console.log(`Listening on ${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`)
    }

)
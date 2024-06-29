import express from "express"
import cors from "cors"
import { createProxyMiddleware } from "http-proxy-middleware"

import config from "./middlewares/config.mjs"

// Routes
import router from "./routes/router.mjs"

const app = express()

app.use(cors({ 
    origin:[
        "http://172.0.0.1:8001",
        "http://172.18.0.2:8001",
        "http://localhost:8001",
        "http://client:8001"
    ],
    credentials: true
}))
// Proxy to labyrinth service
app.use(
    "/bridge/v1/labyrinth", createProxyMiddleware({
        target: "http://labyrinth:8002",
        changeOrigin: true,
        pathRewrite: {
            "^/labyrinth": "",
        },
    })
)
app.use(express.json())
app.use(config)
app.use(router)

app.get(
    
    "/birdge/v1",
    async(req, res) => {
        res.status(200).json("bridge OK")
    }

)

app.listen(

    process.env.BRIDGE_PORT, () => {
        console.log(`Listening on port ${process.env.BRIDGE_PORT}`)
    }

)
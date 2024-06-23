import express from "express"
import cors from "cors"
import session from "express-session"
import cookie_parser from "cookie-parser"
import MySQLStore from "express-mysql-session"

import config from "./middlewares/config.mjs"
import pool from "./db/pool.mjs"

// Routes
import router from "./routes/router.mjs"

const app = express()

const session_store = new (MySQLStore(session))({
        clearExpired: true,
        checkExpirationInterval: 3600000,
        expiration: 86400000 * 7, //  7 days
        createDatabaseTable: true,
    }, 
    pool
)

app.use(
    session(
        {
            secret: process.env.BRIDGE_SECRET,
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge: 86400000 * 7, // 7 day 
                httpOnly: false
            },
            store: session_store
        }
    )
)
app.use(cookie_parser(process.env.BRIDGE_COOKIE_PARSER))
app.use(express.json())
app.use(express.json())
app.use(cors({ 
    origin:[
        "http://172.0.0.1:8001",
        "http://172.18.0.2:8001",
        "http://localhost:8001",
        "http://client:8001"
    ],
    credentials: true
}))
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
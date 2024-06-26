import express from "express"
import axios from "axios"
import session from "express-session"
import cookie_parser from "cookie-parser"
import MySQLStore from "express-mysql-session"
import passport from "passport"

import router from "./routes/router.mjs"
import pool from "./db/pool.mjs"
import "./routes/strategy/local.mjs"

const app = express()
app.set("trust proxy", 1)

const session_store = new (MySQLStore(session))({
        clearExpired: true,
        checkExpirationInterval: 3600000,
        expiration: 86400000 * 7, //  7 days
        createDatabaseTable: false,
        schema: {
            tableName: 'sessions',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
    }, 
    pool
)

app.use(
    session(
        {
            secret: process.env.LABYRINTH_SECRET,
            saveUninitialized: false,
            resave: true,
            rolling: false,
            cookie: {
                sameSite: "none",
                maxAge: 86400000 * 7, // 7 day 
                httpOnly: true
            },
            store: session_store
        }
    )
)
app.use(cookie_parser(process.env.LABYRINTH_COOKIE_PARSER))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(router)

app.get(

    "/", 
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

app.listen(

    process.env.LABYRINTH_PORT, () => {
        console.log(`Listening on port ${process.env.LABYRINTH_PORT}`)

    }

)
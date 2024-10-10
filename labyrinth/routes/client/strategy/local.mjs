import passport from "passport"
import { Strategy } from "passport-local"
import hash from "../../../util/hash_password.mjs"
import user_db from "../../../db/repository/user_db.mjs"
import overwatch_db from "../../../db/repository/overwatch_db.mjs"

export default passport.use(

    new Strategy( 

        async(username, password, done) => {

            try{
                const user = await user_db.find_user_by_username(username)

                if(user.username === null) throw new Error("User Not Found")

                if(!await hash.compare_password(password, user.password)) throw new Error("Bad Credentials")

                const today = new Date()
                const month = today.getMonth() + 1
                const hours = today.getHours()
                const minutes = today.getMinutes()
                const seconds = today.getSeconds()

                const last_visit = today.getFullYear() + "-" + month + "-" + today.getDate() + " " + hours + ":" + minutes + ":" + seconds
                const last_login =  today.getFullYear() + "-" + month + "-" + today.getDate() + " " + hours + ":" + minutes + ":" + seconds
                const record = await overwatch_db.update_visitation(user.user_id, last_visit, last_login)

                console.log(record, user, "auth success")

                done(null, {"username": username, "user_id": user.user_id})
            }
            catch(err){
                done(err, null)
            }

        }

    )

)

passport.serializeUser(async(user, done) => {

    done(null, user)

})

passport.deserializeUser(async(user, done) => {

    try{
        const u = await user_db.find_user_by_id(user.user_id)

        if(u.username === null) return new Error("User Not Found")

        done(null, u)
    }
    catch(err){
        done(err, null)
    }

})

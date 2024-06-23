import passport from "passport"
import { Strategy } from "passport-local"
import hash from "../../util/hash_password.mjs"
import axios from "axios"
import user_db from "../../db/user_db.mjs"

export default passport.use(

    new Strategy( 
        async(username, password, done) => {

            try{
                const user = await user_db.find_user_by_username(username)

                if(user.username === null) throw new Error("User not found")

                if(!hash.compare_password(password, user.password)) throw new Error("Bad credentials")

                done(null, user)
            }
            catch(err){
                done(err, null)
            }

        }
    )

)

passport.serializeUser(async(user, done) => {
    done(null, user.user_id)
})

passport.deserializeUser(async(id, done) => {

    try{
        const user = await user_db.find_user_by_id(id)

        if(user.username === null) return new Error("User not found")

        done(null, user)
    }
    catch(err){
        done(err, null)
    }

})
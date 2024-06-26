import passport from "passport"
import { Strategy } from "passport-local"
import hash from "../../util/hash_password.mjs"
import user_db from "../../db/repository/user_db.mjs"

export default passport.use(

    new Strategy( 
        async(username, password, done) => {

            try{
                const user = await user_db.find_user_by_username(username)

                if(user.username === null) throw new Error("User Not Found")

                if(!hash.compare_password(password, user.password)) throw new Error("Bad Credentials")

                console.log("hererer")

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

passport.deserializeUser(async(user_id, done) => {

    try{
        const user = await user_db.find_user_by_id(user_id)

        if(user.username === null) return new Error("User Not Found")

        done(null, user)
    }
    catch(err){
        done(err, null)
    }

})
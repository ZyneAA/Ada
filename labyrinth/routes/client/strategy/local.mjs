import passport from "passport"
import { Strategy } from "passport-local"
import hash from "../../../util/hash_password.mjs"
import user_db from "../../../db/repository/user_db.mjs"

export default passport.use(

    new Strategy( 

        async(username, password, done) => {

            try{
                const user = await user_db.find_user_by_username(username)
                console.log(user)

                if(user.username === null) throw new Error("User Not Found")

                console.log(await hash.compare_password(password, user.password))

                if(!await hash.compare_password(password, user.password)) throw new Error("Bad Credentials")

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
import passport from "passport"
import { Strategy } from "passport-local"
import overwatch_db from "../../../db/repository/overwatch_db.mjs"

export default passport.use(

    "overwatch", new Strategy( 

        async(admin_name, password, done) => {

            console.log(admin_name, password)

            try{
                const admin = await overwatch_db.get_admin_by_admin_name(admin_name)
                console.log(admin)

                if(admin.admin_name === null) throw new Error("Admin Not Found")

                if(password !== admin.password) throw new Error("Bad Credentials")

                done(null, {"name": admin_name, "id": admin.admin_id})
            }
            catch(err){
                done(err, null)
            }

        }

    )

)

passport.serializeUser(async(admin, done) => {

    done(null, admin)

})

passport.deserializeUser(async(admin, done) => {

    try{
        const u = await overwatch_db.get_admin_by_admin_id(admin.admin_id)

        if(u.admin_name === null) return new Error("Admin Not Found")

        done(null, u)
    }
    catch(err){
        done(err, null)
    }

})
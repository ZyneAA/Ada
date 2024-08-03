import passport from "passport"
import { Strategy } from "passport-github2"
import get_secret from "../../../util/get_secret.mjs"

export default passport.use(

    new Strategy( 

        {         
            "clientID": get_secret(process.env.GIT_CLIENT_ID),
            "clientSecret": get_secret(process.env.GIT_CLIENT_SECRET),
            "callbackURL": "http://localhost:8000/bridge/v1/labyrinth/auth/github/callback", 
        },
        async(accessToken, refreshToken, profile, done) => {

            try{
                profile.accessToken = accessToken
                const github = {"git_username": profile.username, "id": profile.id, "access_token": profile.accessToken}
                done(null, {"github": github})
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

    done(null, user)

})
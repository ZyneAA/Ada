// import { Router } from "express"
// import axios from "axios"

// const router = Router()

// router.get(

//     "/auth/github", 
//     async(req, res) => {

//         const redirect_uri = `https://github.com/login/oauth/authorize?client_id=${process.env.GIT_CLIENT_ID}&scope=repo`
//         res.redirect(redirect_uri)

//     }

// )

// router.get(

//     "/auth/github/callback", 
//     async(req, res) => {
        
//         const { 
//             code
//         } = req.query
  
//         try {
//             const response = await axios.post(
//                 "https://github.com/login/oauth/access_token", 
//                 null, 
//                 {
//                     params: {
//                         client_id: process.env.GIT_CLIENT_ID,
//                         client_secret: process.env.GIT_ClIENT_SECERT,
//                         code
//                     },
//                     headers: {
//                         Accept: "application/json"
//                     }
//                 }
//             )
//             req.session.access_token = response.data.access_token
//             console.log(req.session)
//             res.sendStatus(200)
//         } 
//         catch(err) {
//             console.error("Error during GitHub OAuth callback: ", err)
//             res.status(500).send("Authentication failed")
//         }

//     }

// )

// export default router
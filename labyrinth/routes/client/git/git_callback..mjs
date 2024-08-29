import { Router } from "express"
import passport from "passport"
import axios from "axios"

const router = Router()

router.get(

    "/auth/github/callback",
    passport.authorize("github", { failureRedirect: "/" }),
    async (req, res) => {

        // req.user.accounts.git = req.acconut.git
        req.session.passport.user.git_name = req.account.github.git_username
        req.session.passport.user.access_token = req.account.github.access_token
        const repo_name = `${req.session.passport.user.git_name}-ada-folder`

        const exist = await repo_exists(req.session.passport.user.git_name, repo_name, req.session.passport.user.access_token)
        console.log(req.account)
        console.log(req.session)
        console.log("ok", exist)

        if(exist) {
            res.redirect("http://localhost:8001/code")
        }

        else{
            const create = await create_repo(repo_name, req.session.passport.user.access_token)
            console.log(create)
            res.redirect("http://localhost:8001/code")
        }

    }

)

const repo_exists = async (git_name, repo_name, access_token) => {

    try {
        const response = await axios.get(`https://api.github.com/repos/${git_name}/${repo_name}`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })
        return true
    }
    catch (error) {
        if (error.response && error.response.status === 404) {
            return false
        }
    }

}

const create_repo = async (repo_name, access_token) => {

    try {
        const response = await axios.post(
            'https://api.github.com/user/repos',
            {
                name: repo_name,
                description: "Repo for ADA",
                private: true,
            },
            {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            }
        )
        console.log("Repository created:", response.data.html_url)
    }
    catch (err) {
        console.error("Error creating repository:", err)
    }

}

export default router
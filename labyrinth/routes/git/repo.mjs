import { Router } from "express" 
import axios from "axios"

const router = Router()

router.get(

    "/get_repos",
    async(req, res) => {

        try{
            const respone = await axios.get(
                "https://api.github.com/user/repos",
                {
                    headers: {
                        Authorization: `token ${req.session.passport.user.access_token}`,                 
                    }
                }
            )
            res.status(200).json(respone.data)
        }
        catch(err){
            console.log(err)
        }

    }

)

router.post(

    "/create_file",
    async(req, res) => {

        const {
            folder, filename, content 
        } = req.body

        try{
            const file_path = `${folder}/${filename}`
            const content_encoded = Buffer.from(content).toString("base64")
            const repo_name = `${req.session.passport.user.git_username}-ada-folder`

            const response = await axios.put(
                `https://api.github.com/repos/${req.session.passport.user.git_username}/${repo_name}/contents/${file_path}`,
                {
                    message: `Create ${file_path}`,
                    content: content_encoded,
                },
                {
                    headers: {
                        Authorization: `token ${req.session.passport.user.access_token}`,      
                        Accept: "application/vnd.github.v3+json",           
                    },
                }
            )

            res.status(200).json(response.data)
        }
        catch(err){
            console.log(err)
        }

    }

)

router.get(

    "/get_repo_contents",
    async(req, res) => {

        try{
            const file_path = ''
            const repo_name = `${req.session.passport.user.git_username}-ada-folder`

            const response = await axios.get(
                `https://api.github.com/repos/${req.session.passport.user.git_username}/${repo_name}/contents/${file_path}`,
                {
                    headers: {
                        Authorization: `token ${req.session.passport.user.access_token}`,      
                        Accept: "application/vnd.github.v3+json",           
                    },
                }
            )

            res.status(200).json(response.data)
        }
        catch(err){
            console.log(err)
        }

    }

)

router.get(

    "/get_folders",
    async(req, res) => {

        try{
            const file_path = ''
            const repo_name = `${req.session.passport.user.git_username}-ada-folder`

            const response = await axios.get(
                `https://api.github.com/repos/${req.session.passport.user.git_username}/${repo_name}/contents/${file_path}`,
                {
                    headers: {
                        Authorization: `token ${req.session.passport.user.access_token}`,      
                        Accept: "application/vnd.github.v3+json",           
                    },
                }
            )

            const contents = response.data
            const folders = contents.filter(item => item.type === 'dir').map(item => item.name)

            res.status(200).json(folders)
        }
        catch(err){
            console.log(err)
        }

    }

)

router.get(

    "/get_file",
    async(req, res) => {

        try{
            const file_path = req.params.file_path
            const repo_name = `${req.session.passport.user.git_username}-ada-folder`

            const response = await axios.get(
                `https://api.github.com/repos/${req.session.passport.user.git_username}/${repo_name}/contents/${file_path}`,
                {
                    headers: {
                        Authorization: `token ${req.session.passport.user.access_token}`,      
                        Accept: "application/vnd.github.v3+json",           
                    },
                }
            )

            res.status(200).json(response.data)
        }
        catch(err){
            console.log(err)
        }

    }

)

export default router
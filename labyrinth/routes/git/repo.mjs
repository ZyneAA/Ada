import { Router } from "express" 
import axios from "axios"
import get_repo_content from "./helper/get_repo_content.mjs"
import get_all_files from "./helper/get_all_files.mjs"
import make_file from "./helper/make_file.mjs"

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
            let file_path = ""

            if(folder === "") {
                file_path = `${filename}`
            }
            else {
                file_path = `${folder}/${filename}`
            }

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
            const git_username  = req.session.passport.user.git_username
            const repo_name = `${git_username}-ada-folder`
            const token = req.session.passport.user.access_token

            const response = await get_repo_content(git_username, repo_name, file_path, token)

            res.status(200).json(response.data)
        }
        catch(err){
            console.log(err)
        }

    }

)

router.get(

    "/get_repo",
    async(req, res) => {

        try{
            const file_path = ''
            const git_username  = req.session.passport.user.git_username
            const repo_name = `${git_username}-ada-folder`
            const token = req.session.passport.user.access_token

            const response = await get_repo_content(git_username, repo_name, file_path, token)
            const folders = response.filter(item => item.type === "dir" || item.type === "file").map(item => item)

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
            const file_path = req.query.file_path
            const git_username  = req.session.passport.user.git_username
            const repo_name = `${git_username}-ada-folder`
            const token = req.session.passport.user.access_token

            const response = await get_repo_content(git_username, repo_name, file_path, token)

            res.status(200).json(response)
        }
        catch(err){
            console.log(err)
        }

    }

)

router.get(

    "/get_file_content",
    async(req, res) => {

        try{
            const file_path = req.query.file_path
            const git_username  = req.session.passport.user.git_username
            const repo_name = `${git_username}-ada-folder`
            const token = req.session.passport.user.access_token

            const response = await get_repo_content(git_username, repo_name, file_path, token)
            const content = Buffer.from(response.content, "base64").toString("utf8")

            res.status(200).json([response, content])
        }
        catch(err){
            console.log(err)
        }

    }

)

router.get(

    "/get_all_files",
    async(req, res) => {

        try{
            const file_path = req.query.file_path
            const git_username  = req.session.passport.user.git_username
            const repo_name = `${git_username}-ada-folder`
            const token = req.session.passport.user.access_token

            const response = await get_all_files(git_username, repo_name, file_path, token)
            // const respone1 = make_file(response)

            res.status(200).json(response)
        }
        catch(err){
            console.log(err)
        }

    }

)

router.get(

    "/get_repo_files",
    async(req, res) => {

        try{
            const git_username  = req.session.passport.user.git_username
            const repo_name = `${git_username}-ada-folder`
            const token = req.session.passport.user.access_token

            const ref_response = await axios.get(
                `https://api.github.com/repos/${git_username}/${repo_name}/git/refs/heads/main`,
                {
                    headers: {
                        Authorization: `token ${token}`,      
                        Accept: "application/vnd.github.v3+json",           
                    }
                }
            )

            const commit_sha = ref_response.data.object.sha

            const tree_response = await axios.get(
                `https://api.github.com/repos/${git_username}/${repo_name}/git/trees/${commit_sha}?recursive=1`,
                {
                    headers: {
                        Authorization: `token ${token}`,
                        Accept: 'application/vnd.github.v3+json'
                    }
                }
            )

            const file_paths = tree_response.data.tree.filter(item => item.type === "blob").map(item => item.path)

            res.status(200).json(file_paths)
        }
        catch(err){
            console.log(err)
        }

    }

)

router.post(

    "/put_file",
    async(req, res) => {

        const{
            content,
            sha
        } = req.body

        const file = Buffer.from(content).toString("base64")

        try{
            const file_path = req.query.file_path
            const git_username  = req.session.passport.user.git_username
            const repo_name = `${git_username}-ada-folder`
            const token = req.session.passport.user.access_token

            const response = await axios.put(
                `https://api.github.com/repos/${git_username}/${repo_name}/contents/${file_path}`, 
                {
                    message: "Update File",
                    content: file,
                    sha: sha
                }, 
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                }
            )
            console.log(response.data)
            res.status(200).json(response.data)
        }
        catch(err){
            return
        }

    }

)

export default router
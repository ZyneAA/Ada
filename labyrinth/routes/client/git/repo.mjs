import { Router } from "express"
import axios from "axios"
import get_repo_content from "./helper/get_repo_content.mjs"
import get_all_files from "./helper/get_all_files.mjs"

const router = Router()

router.get(

    "/get_repos",
    async (req, res) => {

        try {
            const respone = await axios.get(
                "https://api.github.com/user/repos",
                {
                    headers: {
                        Authorization: `token ${req.session.passport.user.access_token}`,
                    }
                }
            )
            console.log(respone.data)
            res.status(200).json(respone.data)
        }
        catch (err) {
            res.sendStatus(400)
        }

    }

)

router.post(

    "/create_file",
    async (req, res) => {

        const {
            folder, filename, content
        } = req.body

        try {
            let file_path = ""

            if (folder === "") {
                file_path = `${filename}`
            }
            else {
                file_path = `${folder}/${filename}`
            }

            const content_encoded = Buffer.from(content).toString("base64")
            const repo_name = `${req.session.passport.user.git_name}-ada-folder`

            const response = await axios.put(
                `https://api.github.com/repos/${req.session.passport.user.git_name}/${repo_name}/contents/${file_path}`,
                {
                    message: `Created ${file_path}`,
                    content: content_encoded,
                },
                {
                    headers: {
                        Authorization: `token ${req.session.passport.user.access_token}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                }
            )

            res.status(201).json(response.data)
        }
        catch (err) {
            res.sendStatus(400)
        }

    }

)

router.post(

    "/rename_file",
    async (req, res) => {

        const {
            folder, filename, content
        } = req.body

        try {
            let file_path = ""

            if (folder === "") {
                file_path = `${filename}`
            }
            else {
                file_path = `${folder}/${filename}`
            }

            const content_encoded = Buffer.from(content).toString("base64")
            const repo_name = `${req.session.passport.user.git_name}-ada-folder`

            const response = await axios.put(
                `https://api.github.com/repos/${req.session.passport.user.git_name}/${repo_name}/contents/${file_path}`,
                {
                    message: `Renamed ${file_path}`,
                    content: content_encoded,
                },
                {
                    headers: {
                        Authorization: `token ${req.session.passport.user.access_token}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                }
            )

            res.status(201).json(response.data)
        }
        catch (err) {
            res.sendStatus(400)
        }

    }

)

router.get(

    "/get_repo_contents",
    async (req, res) => {

        try {
            const file_path = ''
            const git_name = req.session.passport.user.git_name
            const repo_name = `${git_name}-ada-folder`
            const token = req.session.passport.user.access_token

            const response = await get_repo_content(git_name, repo_name, file_path, token)

            res.status(200).json(response.data)
        }
        catch (err) {
            res.sendStatus(400)
        }

    }

)

router.get(

    "/get_repo",
    async (req, res) => {

        try {
            const file_path = ''
            const git_name = req.session.passport.user.git_name
            const repo_name = `${git_name}-ada-folder`
            const token = req.session.passport.user.access_token

            const response = await get_repo_content(git_name, repo_name, file_path, token)
            const folders = response.filter(item => item.type === "dir" || item.type === "file").map(item => item)

            res.status(200).json(folders)
        }
        catch (err) {
            res.sendStatus(400)
        }

    }

)

router.get(

    "/get_file",
    async (req, res) => {

        try {
            const file_path = req.query.file_path
            const git_name = req.session.passport.user.git_name
            const repo_name = `${git_name}-ada-folder`
            const token = req.session.passport.user.access_token

            const response = await get_repo_content(git_name, repo_name, file_path, token)

            res.status(200).json(response)
        }
        catch (err) {
            res.sendStatus(400)
        }

    }

)

router.get(

    "/get_file_content",
    async (req, res) => {

        try {
            const file_path = req.query.file_path
            const git_name = req.session.passport.user.git_name
            const repo_name = `${git_name}-ada-folder`
            const token = req.session.passport.user.access_token

            const response = await get_repo_content(git_name, repo_name, file_path, token)
            const content = Buffer.from(response.content, "base64").toString("utf8")

            res.status(200).json([response, content])
        }
        catch (err) {
            res.sendStatus(400)
        }

    }

)

router.get(

    "/get_all_files",
    async (req, res) => {

        try {
            const file_path = req.query.file_path
            const git_name = req.session.passport.user.git_name
            const repo_name = `${git_name}-ada-folder`
            const token = req.session.passport.user.access_token

            const response = await get_all_files(git_name, repo_name, file_path, token)
            // const respone1 = make_file(response)

            res.status(200).json(response)
        }
        catch (err) {
            res.sendStatus(400)
        }

    }

)

router.get(

    "/get_repo_files",
    async (req, res) => {

        try {

            console.log(req.session.passport.user)

            const git_name = req.session.passport.user.git_name
            const repo_name = `${git_name}-ada-folder`
            const token = req.session.passport.user.access_token

            const ref_response = await axios.get(
                `https://api.github.com/repos/${git_name}/${repo_name}/git/refs/heads/main`,
                {
                    headers: {
                        Authorization: `token ${token}`,
                        Accept: "application/vnd.github.v3+json",
                    }
                }
            )

            const commit_sha = ref_response.data.object.sha

            const tree_response = await axios.get(
                `https://api.github.com/repos/${git_name}/${repo_name}/git/trees/${commit_sha}?recursive=1`,
                {
                    headers: {
                        Authorization: `token ${token}`,
                        Accept: "application/vnd.github.v3+json"
                    }
                }
            )

            const file_paths = tree_response.data.tree.filter(item => item.type === "blob").map(item => item.path)

            res.status(200).json(file_paths)
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }

    }

)

router.post(

    "/put_file",
    async (req, res) => {

        const {
            content,
            sha
        } = req.body

        const file = Buffer.from(content).toString("base64")

        try {
            const file_path = req.query.file_path
            const git_name = req.session.passport.user.git_name
            const repo_name = `${git_name}-ada-folder`
            const token = req.session.passport.user.access_token

            const response = await axios.put(
                `https://api.github.com/repos/${git_name}/${repo_name}/contents/${file_path}`,
                {
                    message: "Update File",
                    content: file,
                    sha: sha
                },
                {
                    headers: {
                        "Authorization": `token ${token}`
                    }
                }
            )
            console.log(response.data)
            res.status(200).json(response.data)
        }
        catch (err) {
            res.sendStatus(400)
        }

    }

)

router.delete(

    "/delete_file",
    async (req, res) => {

        try {
            const file_path = req.query.file_path
            const sha = req.query.sha
            const git_name = req.session.passport.user.git_name
            const repo_name = `${git_name}-ada-folder`
            const token = req.session.passport.user.access_token

            // Delete the file
            const response = await axios.delete(
                    `https://api.github.com/repos/${git_name}/${repo_name}/contents/${file_path}`, {
                    headers: {
                        Authorization: `token ${token}`,
                        "Content-Type": "application/json",
                    },
                    data: {
                        message: "Delete File",
                        sha,
                    },
                }
            );

            res.status(200).json(response.data)
        } 
        catch (error) {
            console.error('Error deleting file:', error)
            res.status(500).send("Failed to delete file")
        }
    }
)


export default router

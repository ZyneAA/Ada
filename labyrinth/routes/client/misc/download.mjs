import { Router } from "express"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const router = Router()

router.get(

    "/download",
    async (req, res) => {

        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)

        const content = req.query.content || "Empty Void"

        const file_name = "ada-file.txt"
        const file_path = path.join(__dirname, file_name)

        fs.writeFile(file_path, content, (err) => {

            if (err) {
                return res.status(500).send("Could not create file")
            }

            res.setHeader("Content-Disposition", `attachment; filename=${file_name}`)
            res.setHeader("Content-Type", "text/plain")
            
            res.sendFile(file_path, (err) => {
                if (err) {
                    res.status(500).send("Error while downloading the file")
                }

                fs.unlink(file_path, (err) => {
                    if (err) {
                        console.log("Error deleting the file: ", err)
                    }
                })

            })

        })

    }

)

export default router
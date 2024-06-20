import { Router } from "express";
import axios from "axios"

const router = Router()

router.post(

    "/birdge/v1/execute",
    async(req, res) => {

        const{
            body
        } = req

        const payload = {
            "language": body.language,
            "version": body.version,
            "files": [
                body.files
            ],
            "stdin": "",
            "args": body.args,
            "compile_timeout": body.compile_timeout,
            "run_timeout": body.run_timeout,
            "compile_memory_limit": body.compile_memory_limit,
            "run_memory_limit": body.run_memory_limit
        }

        try{
            const response = await axios.post(
                "http://localhost:2000/api/v2/execute",
                payload
            )
            res.status(200).json(response.data)
        }
        catch(err){
            res.status(400).json(err)
        }

    }

)
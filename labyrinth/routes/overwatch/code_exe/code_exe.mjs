import { Router } from "express"
import overwatch_db from "../../../db/repository/overwatch_db.mjs"

const router = Router()

router.get(

    "/get_code_exe_by_date",
    async(req, res) => {

        const date = req.query.date

        try{
            const response = await overwatch_db.get_code_exe_by_date(date)
            res.status(200).json(response)
        }
        catch(err) {
            res.status(400).json(err)
        }

    }

)

router.get(

    "/get_exe_data_by_date_range",
    async(req, res) => {

        const date_0 = req.query.date_0
        const date_1 = req.query.date_1

        try{
            const response = await overwatch_db.get_exe_data_by_date_range(date_0, date_1)
            res.status(200).json(response)
        }
        catch(err) {
            res.json(400).json(err)
        }

    }

)

router.get(

    "/get_exe_data_by_user_id",
    async(req, res) => {

        const user_id = req.query.user_id

        try{
            const response = await overwatch_db.get_exe_data_by_user_id(user_id)
            res.status(200).json(response)
        }
        catch(err) {
            res.json(400).json(err)
        }

    }

)

router.get(

    "/get_exe_data_by_language",
    async(req, res) => {

        const language = req.query.language

        try{
            const response = await overwatch_db.get_exe_data_by_language(language)
            res.status(200).json(response)
        }
        catch(err) {
            res.json(400).json(err)
        }

    }

)

router.get(

    "/get_exe_data_by_version",
    async(req, res) => {

        const version = req.query.version

        try{
            const response = await overwatch_db.get_exe_data_by_version(version)
            res.status(200).json(response)
        }
        catch(err) {
            res.json(400).json(err)
        }

    }

)

router.post(

    "/record_execute",
    async(req, res) => {

        const{
            body
        } = req

        console.log(req.session)

        try{
            const response = await overwatch_db.record_execute(body.date, body.language, body.version, req.session.passport.user.user_id)
            res.status(200).json(response)
        }
        catch(err) {
            res.json(400).json(err)
        }        

    }

)

export default router


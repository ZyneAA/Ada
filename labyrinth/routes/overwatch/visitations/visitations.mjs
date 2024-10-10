import { Router } from "express"
import overwatch_db from "../../../db/repository/overwatch_db.mjs"
import user_db from "../../../db/repository/user_db.mjs"

const router = Router()

router.get(
    "/get_visitations_by_user_id",
    async(req, res) => {

        const user_id = req.query.user_id

        try{
            const response = await overwatch_db.get_visitations_by_user_id(user_id)
            res.status(200).json(response)
        }
        catch(err) {
            res.status(400).json(err)
        }


    }
)

router.get(
    "/get_visitations_by_last_visit",
    async(req, res) => {

        const user_id = req.query.date

        try{
            const response = await overwatch_db.get_visitations_by_last_visit(date)
            res.status(200).json(response)
        }
        catch(err) {
            res.status(400).json(err)
        }


    }
)

router.get(
    "/get_visitations_by_last_visit_range",
    async(req, res) => {

        const date_0 = req.query.date_0
        const date_1 = req.query.date_1

        try{
            const response = await overwatch_db.get_visitations_by_last_visit_range(date_0, date_1)
            res.status(200).json(response)
        }
        catch(err) {
            res.status(400).json(err)
        }


    }
)

router.get(
    "/get_visitations_by_last_login",
    async(req, res) => {

        const date = req.query.date

        try{
            const response = await overwatch_db.get_visitations_by_last_login(date)
            res.status(200).json(response)
        }
        catch(err) {
            res.status(400).json(err)
        }


    }
)

router.get(
    "/get_visitations_by_last_login_range",
    async(req, res) => {

        const date_0 = req.query.date_0
        const date_1 = req.query.date_1

        try{
            const response = await overwatch_db.get_visitations_by_last_login_range(date_0, date_1)
            res.status(200).json(response)
        }
        catch(err) {
            res.status(400).json(err)
        }


    }
)

router.post(
    "/record_visitation",
    async(req, res) => {

        const{
            body
        } = req

        try{
            const response = await user_db.find_user_by_username(body.username)

            const response1 = await overwatch_db.record_visitation(response.user_id, body.last_visit, body.last_login)
            res.status(200).json(response1)
        }
        catch(err) {
            res.status(400).json(err)
        }


    }
)

router.post(
    "/update_visitation",
    async(req, res) => {

        const{
            body
        } = req

        try{
            const response = await overwatch_db.update_visitation(req.session.passport.user.user_id, body.last_visit, body.last_login)
            res.status(200).json(response)
        }
        catch(err) {
            res.status(400).json(err)
        }


    }
)


export default router

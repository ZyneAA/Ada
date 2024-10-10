import { OpenAI } from "openai"
import { Router } from "express"
import get_secret from "../../../util/get_secret.mjs"

const router = Router()

router.post(

    "/generate_text",
    async (req, res) => {

        const {
            prompt
        } = req.body

        try {
            const api = new OpenAI({
                apiKey: get_secret(process.env.AI_API_KEY),
                baseURL: "https://api.aimlapi.com/v1",
            })

            const main = async () => {
                const completion = await api.chat.completions.create({
                    model: "gpt-4-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "You are here to help people with coding",
                        },
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 256,
                })

                const response = completion.choices[0].message.content

                console.log("User:", prompt)
                console.log("AI:", response)
                
                res.status(200).json(response)
            }

            main()
        }
        catch (err) {
            console.log(err)
            res.status(400).json("Error generating response")
        }

    }

)

export default router

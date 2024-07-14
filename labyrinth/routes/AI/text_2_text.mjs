import { OpenAI } from "openai"
import { Router } from "express"
import get_secret from "../../util/get_secret.mjs"

const router = Router()

router.post(

    "/generate_text",
    async (req, res) => {

        const {
            prompt
        } = req.body

        try {

            const openai = new OpenAI(
                {
                    apiKey: get_secret(process.env.AI_API_KEY),
                    baseURL: "https://api.aimlapi.com",
                })
    
            const ok = async() => { 
                const chatCompletion = await openai.chat.completions.create({
                    model: "mistralai/Mistral-7B-Instruct-v0.2",
                    messages: [
                        {role: "system", content: "You are here to help people with coding"},
                        {role: "user", content: prompt}
                    ],
                    temperature: 0.7,
                    max_tokens: 128,
                })                

                console.log(chatCompletion.choices[0].message.content)   
                res.status(200).json(chatCompletion.choices[0].message.content)
            }
            
            ok()

        }
        catch(err) {
            res.status(400).json("Error generating response")
        }

    }

)

export default router

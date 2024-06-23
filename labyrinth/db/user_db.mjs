import axios from "axios"
import hash from "../util/hash_password.mjs"

const find_user_by_username = async(username) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/find_user_by_username?username=${username}`,
        )      
        return respone.data
    }
    catch(err){
        return err
    }

} 

const find_user_by_id = async(id) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/find_user_by_id?id=${id}`,
        )      
        return respone.data
    }
    catch(err){
        return err
    }

} 

const add_user = async(username, email, password) => {

    const hashed_password = await hash.hash_password(password)

        try{
            const respone = await axios.post(
                "http://vault:8080/vault/add_user",
                {
                    "username": username,
                    "email": email,
                    "password": hashed_password
                }
            )
            return respone.data
        }
        catch(err){
            return err
        }

}

export default {
    find_user_by_username,
    find_user_by_id,
    add_user
}
import bcrypt from "bcrypt"

const hash_password = async (password) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        return hashed_password
    } 
    catch (err) {
        return err
    }

}

const compare_password = async(raw_password, hashed_password) => {
    return bcrypt.compare(raw_password, hashed_password)
}

export default {
    hash_password,
    compare_password
}
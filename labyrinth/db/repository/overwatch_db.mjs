import axios from "axios"

const get_admin_by_admin_name = async(admin_name) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/get_admin_by_admin_name?admin_name=${admin_name}`,
        )      
        return respone.data
    }
    catch(err) {
        return err
    }

} 

const get_admin_by_admin_id = async(admin_id) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/get_admin_by_admin_id?admin_id=${admin_id}`,
        )      
        return respone.data
    }
    catch(err) {
        return err
    }

} 

const get_code_exe_by_date = async(date) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/get_code_exe_by_date?date=${date}`,
        )      
        return respone.data
    }
    catch(err) {
        return err
    }

} 

const get_exe_data_by_date_range = async(date_0, date_1) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/get_exe_data_by_date_range?date_0=${date_0}&date_1=${date_1}`,
        )      
        return respone.data
    }
    catch(err) {
        return err
    }
    
}

const get_exe_data_by_user_id = async(user_id) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/get_exe_data_by_user_id?user_id=${user_id}`,
        )      
        return respone.data
    }
    catch(err) {
        return err
    }

}

const get_exe_data_by_language = async(language) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/get_exe_data_by_language?language=${language}`,
        )      
        return respone.data
    }
    catch(err) {
        return err
    }

}

const get_exe_data_by_version = async(version) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/get_exe_data_by_version?version=${version}`,
        )      
        return respone.data
    }
    catch(err) {
        return err
    }

}

const record_execute = async(date, language, version, user_id) => {

    try{
        const respone = await axios.post(
            `http://vault:8080/vault/record_execute`,
            {
                date: date,
                language: language,
                version: version,
                user_id: user_id
            }
        )      
        return respone.data
    }
    catch(err) {
        return err
    }

}

const get_visitations_by_user_id = async(user_id) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/get_visitations_by_user_id?user_id=${user_id}`,
        )      
        return respone.data
    }
    catch(err) {
        return err
    }

}

const get_visitations_by_last_visit = async(date) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/get_visitations_by_last_visit?date=${date}`,
        )      
        return respone.data
    }
    catch(err) {
        return err
    }    

}

const get_visitations_by_last_visit_range = async(date_0, date_1) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/get_visitations_by_last_visit_range?date_0=${date_0}&date_1=${date_1}`,
        )      
        return respone.data
    }
    catch(err) {
        return err
    }

}

const get_visitations_by_last_login = async(date) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/get_visitations_by_last_login?date=${date}`,
        )      
        return respone.data
    }
    catch(err) {
        return err
    }

}

const get_visitations_by_last_login_range = async(date_0, date_1) => {

    try{
        const respone = await axios.get(
            `http://vault:8080/vault/get_visitations_by_last_login_range?date_0=${date_0}&date_1=${date_1}`,
        )      
        return respone.data
    }
    catch(err) {
        return err
    }

} 

const record_visitation = async(user_id, last_visit, last_login) => {

    try{
        const response = await axios.post(
            `http://vault:8080/vault/record_visitation`,
            {
                user_id: user_id,
                last_visit: last_visit,
                last_login, last_login
            }
        )
    }
    catch(err) {
        return err
    }

}

const update_visitation = async(user_id, last_visit, last_login) => {

    try{
        const response = await axios.post(
            `http://vault:8080/vault/update_visitation`,
            {
                user_id: user_id,
                last_visit: last_visit,
                last_login, last_login
            }
        )
    }
    catch(err) {
        return err
    }

}

export default {
    get_admin_by_admin_name,
    get_admin_by_admin_id,
    get_code_exe_by_date,
    get_exe_data_by_date_range,
    get_exe_data_by_user_id,
    get_exe_data_by_language,
    get_exe_data_by_version,
    record_execute,
    get_visitations_by_user_id,
    get_visitations_by_last_visit,
    get_visitations_by_last_visit_range,
    get_visitations_by_last_login,
    get_visitations_by_last_login_range,
    record_visitation,
    update_visitation
}

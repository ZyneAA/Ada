import axios from "axios"

const get_repo_content =  async(git_username, repo_name, file_path = '', token) => {

    try{
        const response = await axios.get(
            `https://api.github.com/repos/${git_username}/${repo_name}/contents/${file_path}`,
            {
                headers: {
                    Authorization: `token ${token}`,      
                    Accept: "application/vnd.github.v3+json",           
                },
            }
        )
        return response.data
    }
    catch(err) {
        return err
    }

}

export default get_repo_content
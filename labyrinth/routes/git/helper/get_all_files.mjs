import get_repo_content from "./get_repo_content.mjs"

const get_all_files =  async(git_username, repo_name, file_path = '', token) => {

    try{
        const contents = await get_repo_content(git_username, repo_name, file_path , token)
        let files = []

        for (const item of contents) {

            if(item.type === "file") {
              files.push(item.path)
            } 
            else if(item.type === "dir") {
              files = files.concat(await get_all_files(git_username, repo_name, item.path, token ))
            }

        }

        return files
    }
    catch(err) {
        return err
    }

}

export default get_all_files
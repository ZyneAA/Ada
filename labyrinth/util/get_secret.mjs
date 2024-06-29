import fs from "fs"

const get_secret = (path) => {
    
    try {
        return fs.readFileSync(path, "utf8").trim()
    } 
    catch (err) {

        console.error(`Error reading secret from ${path}`, err)
        return null

    }
}

export default get_secret
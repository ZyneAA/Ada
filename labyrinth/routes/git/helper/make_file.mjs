const make_file = (paths) => {

    const result = {}
    let count = 0

    paths.forEach((path) => {

        const parts = path.split('/')
        let current = result
    
        parts.forEach((part, index) => {

            if(index === parts.length - 1) {
                current[part] = paths[count]
                count++
            } 
            else {
                if(!current[part]) {
                    current[part] = {}
                }
                current = current[part]
            }

        })

    })

    return result

}

export default make_file

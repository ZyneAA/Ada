const config = (req, res, next) => {

    res.set('Access-Control-Allow-Credentials', true)
    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8001')
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()

}

export default config
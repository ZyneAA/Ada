import mysql from "mysql2"

const pool = mysql.createPool(
    {
        host: "mysql" || "127.0.0.1:3306",
        user: "user",
        password: "adapassword",
        database: "ada"
    }
).promise()

export default pool
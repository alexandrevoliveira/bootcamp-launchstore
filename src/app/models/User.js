const db = require('../../config/db')

module.exports = { 
    async findOne(filters){
        let query = "SELECT * FROM users"

        Object.keys(filters).map(key => {
            // WHERE | OR | AND == key
            query += ` ${key}`
            // 1 vez = SELECT * FROM users WHERE

            Object.keys(filters[key]).map(field => {
                // 1 vez = SELECT * FROM users WHERE \ email = email
                query += ` ${field} = '${filters[key][field]}'`
            })
            console.log(query)
        })

        const results = await db.query(query)

        return results.rows[0]
    }
}
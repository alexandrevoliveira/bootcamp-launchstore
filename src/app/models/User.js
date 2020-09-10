const db = require('../../config/db')
const { hash } = require('bcryptjs')

module.exports = { 
    async findOne(filters){
        let query = "SELECT * FROM users"

        Object.keys(filters).map(key => {
            // WHERE | OR | AND == key
            query += ` ${key}`
            // 1 vez = SELECT * FROM users WHERE

            Object.keys(filters[key]).map(field => {
                // 1 vez = SELECT * FROM users WHERE \ email = 'alexandre@gmail.com'
                query += ` ${field} = '${filters[key][field]}'`
            })
        })

        const results = await db.query(query)

        return results.rows[0]
    },
    async create(data) {
        try {
            const query = `
                INSERT INTO users (
                    name,
                    email,
                    password,
                    cpf_cnpj,
                    cep,
                    address                
                ) VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id
            `
            
            // hash of password
            const passwordHash = await hash(data.password, 8)

            const values = [
                data.name,
                data.email,
                passwordHash,
                data.cpf_cnpj.replace(/\D/g, ""),
                data.cep.replace(/\D/g, ""),
                data.address
            ]

            const results = await db.query(query, values)

            return results.rows[0].id
        } catch (err) {
            console.error(err)
        }
    },
    async update(id, fields){
        let query = "UPDATE users SET"

        Object.keys(fields).map((key, index, array) => {
            if((index + 1) < array.length) {
                query += ` ${key} = '${fields[key]}',`
            } else {
                query += ` ${key} = '${fields[key]}' WHERE id = ${id}`
            }
        })

        await db.query(query)
        return
    }
}
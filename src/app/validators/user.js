const User = require('../models/User')

module.exports = {
    async post(req, res, next) {

        // check if has all fields
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if (req.body[key] == "") return res.render('user/register', {
                user: req.body,
                error: 'Please, fill all fields!'
            })
        }

        // check if user exists [email, cpf_cnpj]
        let { email, cpf_cnpj, password, passwordRepeat } = req.body

        cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

        const user = await User.findOne({ 
            where: { email },
            or: { cpf_cnpj }
        })

        if (user) return res.render('user/register', {
            user: req.body,
            error: 'User already exists'
        })
        
        // check if password match passwordRepeat\    
        if(password != passwordRepeat)
            return res.render('user/register', {
                user: req.body,
                error: 'Password mismatch'
            })
        
        next()        
    }
}
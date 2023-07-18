const { User } = require("../Databases/MySQL_Model/user_datas_model")
const { Sequelize, Op } = require("sequelize")

const getUser = async (req, res, next) => {
    const data = await User.findOne({where: {user_id: req.params.search}, attributes: {exclude: "password"}})
    res.status(200).json(data)
}

const getUsers = async (req, res, next) => {
    const data = await User.findAll({order: [
                    ['total_donation', 'DESC']
                ]})
    res.status(200).json(data)
} 

const postUser = async (req, res, next) => {
    console.log(req.body)
    const { first_name, last_name, user_name, email_address, password } = req.body

    const existingAccounts = await User.findOne({where: {email_address: email_address}})

    if (existingAccounts) {
        res.status(400).json({created: false, message: "Account Already Exist"})

    } else {
        const result = await User.create({
            first_name: first_name,
            last_name: last_name,
            user_name: user_name,
            email_address: email_address,
            password: password,
            member_since: Sequelize.literal('CURRENT_DATE'),
            about_user: "Lorem Ipsum"
        })
        res.status(200).json({created: true, message: "Account Created"})
    }
}

const patchUser = (req, res, next) => {
    res.send("patch")
}

const deleteUser = (req, res, next) => {
    res.send("delete")
}

module.exports = { getUser, getUsers, postUser, patchUser, deleteUser}

// const getUsers = async (req, res, next) => {
//     const data = await User.findAll({
//         where: {
//             total_donation: {
//                 [Op.gt]: 500
//             }}, 

//         attributes: {
//             exclude: "password"
//         },
//         order: [
//             ['total_donation', 'DESC']
//         ]
//     })
//     res.json(data)
// } 
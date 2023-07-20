const { User } = require("../Databases/MySQL_Model/user_datas_model")
const { Sequelize, Op } = require("sequelize")
const bcrypt = require("bcrypt")

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

const logoutUser = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({message: err})
        } else {
            res.status(200).json({message: "Logout Successful"})
        }
    })
}

const sessionLogin = async (req, res, next) => {
    const email_address = req.session.email_address
    const password = req.session.password

    if (email_address && password) {
        const user = await User.findOne({where: {
            email_address: email_address
        }})
    
        if (!user) {
            res.json({login: false, message: "User Not Found"})
        } else {
    
            const passwordIsMatch = password === user.password
    
            if (passwordIsMatch) {
                res.json({login: true, message: "User Login", user_data: user})
            } else {
                res.json({login: false, message: "Incorrect Password"})
            }
        }
    } else {
        res.json({login: false, message: "Invalid User Session Information"})
    }
}

const postUser = async (req, res, next) => {
    console.log(req.body)
    const { first_name, last_name, user_name, email_address, password } = req.body

    const existingAccounts = await User.findOne({where: {email_address: email_address}})

    if (existingAccounts) {
        res.status(400).json({created: false, message: "Account Already Exist"})

    } else {

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await User.create({
            first_name: first_name,
            last_name: last_name,
            user_name: user_name,
            email_address: email_address,
            password: hashedPassword,
            member_since: Sequelize.literal('CURRENT_DATE'),
            about_user: "Lorem Ipsum"
        })

        res.status(200).json({created: true, message: "Account Created"})
    }
}

const loginUser = async (req, res, next) => {
    const { email_address, password } = req.body

    const user = await User.findOne({where: {
        email_address: email_address
    }})

    if (!user) {
        res.json({login: false, message: "User Not Found"})
    } else {
        const passwordIsMatch = await bcrypt.compare(password, user.password)

        if (passwordIsMatch) {
            req.session.user_id = user.user_id
            req.session.email_address = user.email_address
            req.session.password = user.password
            res.json({login: true, message: "User Login", user_data: user})
        } else {
            res.json({login: false, message: "Incorrect Password"} )
        }
    }
}

const patchUser = (req, res, next) => {
    res.send("patch")
}

const deleteUser = (req, res, next) => {
    res.send("delete")
}

module.exports = { getUser, getUsers, postUser, loginUser, patchUser, deleteUser, sessionLogin, logoutUser}

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
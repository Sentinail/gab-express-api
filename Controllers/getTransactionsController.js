const { Transaction } = require("../Databases/MySQL_Model/transactions_model")

const getTransactions = async (req, res, next) => {

    console.log("email_address: " + req.body.email_address)

    try {
        const user_transactions = await Transaction.findAll({where: {
            customer_email: req.body.email_address  
        }, order: [["createdAt", "DESC"]]})
    
    
        res.json({result: user_transactions, message: "Successful"})

    } catch (err) {
        console.log(err)
        res.json({result: err, message: "Failed"})
    }
}

module.exports = { getTransactions }
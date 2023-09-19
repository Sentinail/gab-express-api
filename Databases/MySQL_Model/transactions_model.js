const { DataTypes } = require("sequelize")

const sequelize = require("./connection")

const Transaction = sequelize.define('user_transactions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    item_name: {
        type: DataTypes.STRING,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.DECIMAL,
    },
    customer_email: {
        type: DataTypes.STRING,
    },
    donation_place: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Pending"
    }
}, {
    tableName: "user_transactions",
})

module.exports = { Transaction }
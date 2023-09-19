const { DataTypes } = require("sequelize")

const sequelize = require("./connection")

const Item = sequelize.define('food_item_datas', {
    item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    item_name: {
        type: DataTypes.STRING,
    },
    item_price: {
        type: DataTypes.STRING,
    },
    extension_name: {
        type: DataTypes.STRING,
    }
}, {
    tableName: "food_item_datas",
    timestamps: false
})

module.exports = { Item }
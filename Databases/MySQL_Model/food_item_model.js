const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize('items', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        paranoid: true
    }
})

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
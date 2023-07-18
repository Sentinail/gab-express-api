const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize('users', 'root', '', {
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

const User = sequelize.define('user_datas', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING
    },
    user_name: {
        type: DataTypes.STRING,
        unique: true
    },
    email_address: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    member_since: {
        type: DataTypes.DATE
    },
    total_donation: {
        type: DataTypes.DECIMAL
    },
    about_user: {
        type: DataTypes.STRING
    }
}, {
    tableName: "user_datas",
    timestamps: false
})

module.exports = { User }
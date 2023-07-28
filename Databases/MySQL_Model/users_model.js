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
        type: DataTypes.DECIMAL,
        defaultValue: 0
    },
    about_user: {
        type: DataTypes.STRING,
        defaultValue: "Lorem Ipsum"
    },
    user_profile_name: {
        type: DataTypes.STRING,
        defaultValue: "Default_profile_pict.png"
    },
    color_preference: {
        type: DataTypes.STRING,
        defaultValue: "[[47, 46, 46, 1], [75, 141, 193, 1], [242, 242, 242, 1]]"
    }
}, {
    tableName: "user_datas",
    timestamps: false
})

module.exports = { User }
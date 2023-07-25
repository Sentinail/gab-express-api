const { Item } = require("../Databases/MySQL_Model/food_item_model")

const getItems = async (req, res, next) => {
    try {
        const items = await Item.findAll()
        res.json(items)
    } catch (err) {
        res.json({err: err})
    }
}

module.exports = { getItems }
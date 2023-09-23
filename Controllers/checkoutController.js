const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const { Item } = require("../Databases/MySQL_Model/food_item_model")

const createCheckout = async (req, res, next) => {
  try {
    const items = await Item.findAll()

    const { id, quantity, place_to_deliver } = req.body.item;

    const item_data = items.find(item => {
      return item.item_id === id
    })

    const customer = await stripe.customers.create({
      email: req.user.email_address,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item_data.item_name,
            },
            unit_amount: item_data.item_price * 100,
          },
          quantity: quantity, 
        },
      ],
      success_url: `${process.env.CLIENT_SIDE_URL}/home`,
      cancel_url: `${process.env.CLIENT_SIDE_URL}/home`,
      customer: customer.id,
      payment_intent_data: {
        metadata: {
          item_name: item_data.item_name,
          quantity: quantity,
          price: item_data.item_price,
          place_to_deliver: place_to_deliver,
        }
      }
    });
    
    res.json({ url: session.url });
    
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
};

module.exports = { createCheckout }
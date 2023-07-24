const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map(
    [
      [1 , {priceInCents: 500, name: "Item 1"}],
      [2 , {priceInCents: 1000, name: "Item 2"}],
      [3 , {priceInCents: 200, name: "Item 3"}],
      [4 , {priceInCents: 700, name: "Item 4"}],
    ])
  

const createCheckout = async (req, res, next) => {
    try {
        const data = req.body.item
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: 
          [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: storeItems.get(data.id).name
                },
                unit_amount: storeItems.get(data.id).priceInCents
              },
              quantity: data.quantity
            }
          ],
          success_url: `${process.env.CLIENT_SIDE_URL}/home`,
          cancel_url: `${process.env.CLIENT_SIDE_URL}/home`,
  
        })
        res.json({ url: session.url });
      } catch (e) {
          console.log(e.message)
          res.status(500).json({error: e.message})
      }
}

module.exports = { createCheckout }
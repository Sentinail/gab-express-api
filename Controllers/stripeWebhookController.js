const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const endpointSecret = "whsec_d0c2180ff74ea5f0f4d0f1cbe726a785eb0d23425712a25f24440c1c931b6d9c";
const { User } = require("../Databases/MySQL_Model/users_model")
const { Transaction } = require("../Databases/MySQL_Model/transactions_model")

const webHook = async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded);

      const customer = await stripe.customers.retrieve(paymentIntentSucceeded.customer);
      console.log("Costumer:" + customer)

      const {item_name, quantity, price, place_to_deliver} = paymentIntentSucceeded.metadata;
      if (item_name && quantity && price && place_to_deliver) {
        const transaction_result = await Transaction.create({
          item_name: item_name,
          quantity: quantity,
          price: price,
          customer_email: customer.email,
          donation_place: place_to_deliver
        })

        console.log(transaction_result)
      }

      const user = await User.findOne({where: {email_address: customer.email}})
      console.log("User:" + user.email_address)

      const current_donation = parseFloat(user.total_donation) 

      const total_donation = current_donation + (paymentIntentSucceeded.amount/100)

      const result = await User.update({total_donation: total_donation}, {where: { email_address: customer.email }})

      break;
      
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send().end();
};

  module.exports = { webHook }
const mongoose = require('mongoose')
const valid = require('validator')


const orderSchema = mongoose.Schema({
    total_amount: Number,
    cart: { type: Array, "default": [] },
    currency: String,
    tran_id: String,
    orderNo: String,
    orderStatus: String,
    payment_method: String,
    val_id: String,
    success_url: String,
    fail_url: String,
    cancel_url: String,
    ipn_url: String,
    paymentStatus: String,
    shipping_method: String,
    product_name: String,
    product_category: String,
    product_profile: String,
    product_image: {
        type: String,
        validate: [valid.isURL, "wrong url"],
    },
    cus_name: String,
    cus_email: String,
    cus_add1: String,
    cus_add2: String,
    cus_city: String,
    cus_state: String,
    cus_postcode: Number,
    cus_country: String,
    cus_phone: String,
    cus_fax: String,
    ship_name: String,
    ship_add1: String,
    ship_add2: String,
    ship_city: String,
    ship_state: String,
    ship_postcode: Number,
    ship_country: String,
    multi_card_name: String,
    value_a: String,
    value_b: String,
    value_c: String,
    value_d: String
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order;
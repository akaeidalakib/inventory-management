const { createOrderService, getOrderService, getOrderByIdService, updateOrderService, updateOrderPayment, deletePaymentById, deleteOrderById } = require("../services/order.service")
const { v4: uuidv4 } = require('uuid');
var moment = require('moment');
const SSLCommerzPayment = require('sslcommerz')
require('dotenv').config()
const generateUniqueId = require('generate-unique-id');
console.log("generateUniqueId", generateUniqueId)

exports.createOrder = async (req, res, next) => {
    console.log("hitting")
    // console.log(req.body.cart)
    const orderNumber = generateUniqueId({
        length: 10,
        useLetters: false
    });
    const productInfo = {
        total_amount: req.body.total_amount,
        currency: 'BDT',
        orderNo: orderNumber,
        tran_id: uuidv4(), // use unique tran_id for each api call
        success_url: 'http://localhost:8080/api/v1/order/success',
        fail_url: 'http://localhost:8080/api/v1/order/fail',
        cancel_url: 'http://localhost:8080/api/v1/order/cancel',
        ipn_url: 'http://localhost:8080/api/v1/order/ipn',
        shipping_method: 'Courier',
        payment_method: 'Complated',
        orderStatus: "pending",
        paymentStatus: 'pending',
        product_name: req.body.product_name,
        product_profile: req.body.product_profile,
        product_image: req.body.product_image,
        cus_name: req.body.cus_name,
        cus_email: req.body.cus_email,
        cus_add1: req.body.cus_add1,
        cus_add2: 'Dhaka',
        cus_city: req.body.cus_city,
        cus_state: 'Dhaka',
        cus_postcode: req.body.cus_postcode,
        cus_country: req.body.cus_country,
        cus_phone: req.body.cus_phone,
        cus_fax: '01711111111',
        ship_name: req.body.cus_name,
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    let newObj = { ...productInfo, cart: req.body.cart };
    // const Productdata = productInfo.cart = req.body.cart;
    console.log(newObj)
    const result = await createOrderService(newObj);
    const sslcommer = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false) //true for live default false for sandbox
    sslcommer.init(productInfo).then(data => {
        console.log(data);
        const info = { ...productInfo, ...data }
        if (info.GatewayPageURL) {
            res.json(info.GatewayPageURL)
        } else {
            res.status(400).json({
                message: "payment session failed",
            })
        }

    })

}
exports.createOrderCashon = async (req, res, next) => {
    console.log("hitting")
    // console.log(req.body.cart)
    const orderNumber = generateUniqueId({
        length: 10,
        useLetters: false
    });
    const productInfo = {
        total_amount: req.body.total_amount,
        currency: 'BDT',
        orderNo: orderNumber,
        orderStatus: "pending",
        tran_id: uuidv4(), // use unique tran_id for each api call
        success_url: 'http://localhost:8080/api/v1/order/success',
        fail_url: 'http://localhost:8080/api/v1/order/fail',
        cancel_url: 'http://localhost:8080/api/v1/order/cancel',
        ipn_url: 'http://localhost:8080/api/v1/order/ipn',
        shipping_method: 'Courier',
        payment_method: 'Cash on Delivery',
        paymentStatus: 'pending',
        product_name: req.body.product_name,
        product_category: 'Electronic',
        product_profile: req.body.product_profile,
        product_image: req.body.product_image,
        cus_name: req.body.cus_name,
        cus_email: req.body.cus_email,
        cus_add1: req.body.cus_add1,
        cus_add2: 'Dhaka',
        cus_city: req.body.cus_city,
        cus_state: 'Dhaka',
        cus_postcode: req.body.cus_postcode,
        cus_country: req.body.cus_country,
        cus_phone: req.body.cus_phone,
        cus_fax: '01711111111',
        ship_name: req.body.cus_name,
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    let newObj = { ...productInfo, cart: req.body.cart };
    // const Productdata = productInfo.cart = req.body.cart;
    console.log(newObj)
    const result = await createOrderService(newObj);

    res.status(200).json({
        status: "success",
        message: "Successfully created on order"
    })
}
exports.getSuccess = async (req, res, next) => {
    console.log(req.body)
    const data = {
        val_id: req.body.val_id,
        paymentStatus: "success"
    }
    const result = await updateOrderPayment(req.body.tran_id, data);
    res.status(200).redirect("http://localhost:3000/success")


}
exports.getFail = async (req, res, next) => {
    console.log(req.body.status)
    const result = await deletePaymentById(req.body.tran_id);
    res.status(200).redirect("http://localhost:3000")
}
exports.getCancel = async (req, res, next) => {
    console.log(req.body)
    const result = await deletePaymentById(req.body.tran_id);

    res.status(200).redirect("http://localhost:3000")
}
exports.getIpn = async (req, res, next) => {
    console.log(req.body)
    res.send(req.body);

    res.status(200).redirect("http://localhost:3000")
}



// get all orders
exports.getOrders = async (req, res, next) => {
    try {



        //{price:{$ gt:50}
        //{ price: { gt: '50' } }
        // console.log(req.query)

        let filters = { ...req.query };

        //sort , page , limit -> exclude
        const excludeFields = ['sort', 'page', 'limit']
        excludeFields.forEach(field => delete filters[field])

        //gt ,lt ,gte .lte
        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        filters = JSON.parse(filtersString)



        const queries = {}

        if (req.query.sort) {
            // price,qunatity   -> 'price quantity'
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sortBy = sortBy
            console.log(sortBy);
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            queries.fields = fields
            console.log(fields);
        }

        if (req.query.page) {

            const { page = 1, limit = 10 } = req.query;
            const page1 = parseInt(page)
            console.log(page1)
            const skip = (page1 - 1) * parseInt(limit);
            queries.skip = parseInt(skip);
            queries.limit = parseInt(limit);
            console.log(req.query)
        }
        console.log(req.query)



        const orders = await getOrderService(filters, queries);

        res.status(200).json({
            status: "success",
            data: orders,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }
};
// get order by id
exports.getOrderById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const order = await getOrderByIdService(id);

        if (!order) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find a order with this id"
            })
        }

        res.status(200).json({
            status: "success",
            data: order,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the order",
        });
    }
};

//update by id
exports.updateOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateOrderService(id, req.body);

        res.status(200).json({
            stauts: "success",
            message: "Successfully updated the order"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the Order",
            error: error.message,
        });
    }
};
exports.deleteOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteOrderById(id);
        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete the order"
            })
        }
        res.status(200).json({
            stauts: "success",
            message: "Successfully deleted the order"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the Order",
            error: error.message,
        });
    }
};



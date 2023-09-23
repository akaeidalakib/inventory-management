const Order = require("../models/Order");
require('dotenv').config()
exports.createOrderService = async (data) => {
    const result = await Order.create(data);

    return result;
}


exports.getPaySuccess = async () => {
    const order = await Order.find({});
    return order;
}
exports.getOrderService = async (filters, queries) => {
    const orders = await Order.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)


    const totalOrders = await Order.countDocuments(filters)
    const page = Math.ceil(totalOrders / queries.limit)
    return { totalOrders, page, orders };
}


exports.getOrderByIdService = async (id) => {
    const order = await Order.findOne({ _id: id });
    return order;
}
exports.getOrderByEmailService = async (id) => {
    const order = await Order.findOne({ _id: id });
    return order;
}


exports.updateOrderPayment = async (id, data) => {
    const update = { val_id: data };
    const result = await Order.updateOne({ tran_id: id }, { $set: data }, {
        runValidators: true
    });
    return result;
}
exports.updateOrderService = async (id, data) => {
    const result = await Order.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}
exports.deletePaymentById = async (id) => {
    const result = await Order.deleteOne({ tran_id: id });
    return result;
};
exports.deleteOrderById = async (id) => {
    const result = await Order.deleteOne({ _id: id });
    return result;
};




//store
//category
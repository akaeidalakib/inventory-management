const Store = require("../models/Store");

exports.createStoreService = async (data) => {
    const result = await Store.create(data);
    return result;
}


exports.getStoreService = async () => {
    const store = await Store.find({});
    return store;
}


exports.getStoreByIdService = async (id) => {
    const store = await Store.findOne({ _id: id });
    return store;
}


exports.updateStoreService = async (id, data) => {
    const result = await Store.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}


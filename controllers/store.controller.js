const { createStoreService, getStoreService, getStoreByIdService, updateStoreService } = require("../services/store.service");


exports.createStore = async (req, res, next) => {
    try {
        const result = await createStoreService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully created the Store"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "fail",
            error: "Couldn't create the Store"
        })
    }
}


exports.getStores = async (req, res, next) => {
    try {
        const stores = await getStoreService(req.body);

        res.status(200).json({
            status: "success",
            data: stores
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the St",
        });
    }
};

exports.getStoreById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const brand = await getStoreByIdService(id);

        if (!brand) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find a Store with this id"
            })
        }

        res.status(200).json({
            status: "success",
            data: brand,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the Stores",
        });
    }
};

exports.updateStore = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await updateStoreService(id, req.body);

        console.log(result);

        if (!result.nModified) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the Store with this id",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Successfully updated the Store"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't update the Store",
        });
    }
};
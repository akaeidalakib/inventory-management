const { createCategoryService, updateCategoryService, getCategoryByIdService, getCategoryService } = require("../services/category.service");


exports.createCategory = async (req, res, next) => {
    try {
        const result = await createCategoryService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully created the category"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "fail",
            error: "Couldn't create the category"
        })
    }
}


exports.getCategory = async (req, res, next) => {
    try {
        const category = await getCategoryService(req.body);

        res.status(200).json({
            status: "success",
            data: category
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the category",
        });
    }
};

exports.getCategoryById = async (req, res, next) => {
    const { slug } = req.params;
    try {
        const category = await getCategoryByIdService(slug);

        if (!category) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find a category with this slug"
            })
        }

        res.status(200).json({
            status: "success",
            data: category,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the Category",
        });
    }
};

exports.updateCategory = async (req, res, next) => {
    const { slug } = req.params;
    try {
        const result = await updateCategoryService(slug, req.body);

        console.log(result);

        if (!result.nModified) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the category with this slug",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Successfully updated the Category"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't update the category",
        });
    }
};
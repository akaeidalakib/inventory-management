const Category = require("../models/Category");

exports.createCategoryService = async (data) => {
    const result = await Category.create(data);
    return result;
}


exports.getCategoryService = async () => {
    const category = await Category.find({});
    return category;
}


exports.getCategoryByIdService = async (slug) => {
    const category = await Category.findOne({ slug: slug });
    return category;
}


exports.updateCategoryService = async (slug, data) => {
    const result = await Category.updateOne({ slug: slug }, data, {
        runValidators: true
    });
    return result;
}





//store
//category
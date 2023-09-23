const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
}


exports.getBrandsService = async () => {
  // const brands = await Brand.find({}).populate('products')
  const brands = await Brand.find({});
  return brands;
}


exports.getBrandByIdService = async (slug) => {
  const brand = await Brand.findOne({ slug: slug });
  return brand;
}


exports.updateBrandService = async (slug, data) => {
  const result = await Brand.updateOne({ slug: slug }, data, {
    runValidators: true
  });
  return result;
}


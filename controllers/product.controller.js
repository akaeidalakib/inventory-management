const {
  getProductsService,
  createProductService,
  updateProductByIdService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
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



    const products = await getProductsService(filters, queries);

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // save or create

    const result = await createProductService(req.body);

    // result.logger();

    res.status(200).json({
      status: "success",
      messgae: "Data inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not inserted ",
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);

    res.status(200).json({
      stauts: "success",
      message: "Successfully updated the product"
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};


exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await bulkUpdateProductService(req.body);

    res.status(200).json({
      stauts: "success",
      message: "Successfully updated the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};


exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductByIdService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't delete the product"
      })
    }

    res.status(200).json({
      status: "success",
      message: "Successfully deleted the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await bulkDeleteProductService(req.body.ids);

    res.status(200).json({
      stauts: "success",
      message: "Successfully deleted the given products",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the given products",
      error: error.message,
    });
  }
};

exports.fileUpload = async (req, res) => {
  try {
    res.status(200).json(req.files)
  } catch (error) {

  }
}


// const { page, perPage } = req.query;
//       const options = {
//         page: parseInt(page, 10) || 1,
//         limit: parseInt(perPage, 10) || 10,
//       };
const mongoose = require('mongoose')
var validator = require('validator');
const { ObjectId } = mongoose.Schema.Types
// schema design


const stockSchema = mongoose.Schema({
  // productId: {
  //   type: ObjectId,
  //   required: true,
  //   ref: 'Product'
  // },
  name: {
    type: String,
    required: [true, "Please provide a name for this product."],
    trim: true,
    unique: [true, "Name must be unique"],
    lowercase: true,
    minLength: [3, "Name must be at least 3 characters."],
    maxLenght: [100, "Name is too large"],
  },
  slug: {
    type: String,
    required: [true, "Please provide a name for this product."],
    trim: true,
    unique: [true, "Name must be unique"],
    lowercase: true,
    minLength: [3, "Name must be at least 3 characters."],
    maxLenght: [100, "Name is too large"],
  },
  description: {
    type: String,
    required: true
  },
  image: {
    id: {
      type: Number,
    },
    thumbnail: {
      type: String,
      required: true,
      // validate: [validator.isURL, "wrong url"]
    },
    original: {
      type: String,
      required: true,
      // validate: [validator.isURL, "wrong url"]
    }
  },
  gallery: [{
    id: {
      type: Number,
    },
    thumbnail: {
      type: String,
      required: true,
      // validate: [validator.isURL, "wrong url"]
    },
    original: {
      type: String,
      required: true,
      // validate: [validator.isURL, "wrong url"]
    }
  }],
  quantity: {
    type: Number,
    required: true,
    min: [0, "Product quantity can't be negative"]
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Product price can't be negative"]
  },
  sold: {
    type: Number,
    default: 0
  },
  sale_price: {
    type: Number,
    min: [0, "Product sales price can't be negative"]
  },
  unit: {
    type: String,
    required: true,
    enum: {
      values: ["kg", "litre", "pcs", "bag"],
      message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag"
    }
  },

  tag: [{
    id: {
      type: Number,

    },
    name: {
      type: String,
    },
    slug: {
      type: String,
    }
  }],
  product_type: {
    type: String,
  },
  max_price: {
    type: Number,
  },
  min_price: {
    type: Number,
  },
  variations: [{
    id: {
      type: Number,
    },
    attribute_id: {
      type: Number,
    },
    value: {
      type: String,
    },
    attribute: {
      id: {
        type: Number,
      },
      name: {
        type: String,
      },
      slug: {
        type: String,
      },
      values: [{
        id: {
          type: Number,
        },
        attribute_id: {
          type: Number,
        },
        value: {
          type: String,
        },
      }],
    },
  }],
  variation_options: [{
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    price: {
      type: Number,
    },
    sale_price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    is_disable: {
      type: Number,
    },
    sku: {
      type: Number,
    },
    options: [{
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    }],
  }],


  category: {
    type: String,
    required: true,
  },

  brand: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: ObjectId,
      ref: "Brand",
      required: true,
    }
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["in-stock", "out-of-stock", "discontinued"],
      message: " status can't be {VALUE} "
    },
  },
  store: {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a store name"],
      lowercase: true,
      enum: {
        values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur", "mymensingh"],
        message: "{VALUE} is not a valid name"
      }
    },
    id: {
      type: ObjectId,
      required: true,
      ref: 'Store'
    }
  },
  suppliedBy: {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a supplier name"],
    },
    id: {
      type: ObjectId,
      ref: 'Supplier'
    }
  }

}, {
  timestamps: true,
})


stockSchema.pre('save', function (next) {

  //this -> 
  console.log(' Before saving data');
  if (this.quantity == 0) {
    this.status = 'out-of-stock'
  }

  next()
})


const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock;
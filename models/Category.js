const mongoose = require('mongoose')
const validator = require('validator')
const { ObjectId } = mongoose.Schema.Types


const categorySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide a category name"],
    lowercase: true,
    unique: true,
  },
  slug: {
    type: String,
    trim: true,
    required: [true, "Please provide a category slug"],
    lowercase: true,
    unique: true,
  },
  image: {
    id: {
      type: Number,
    },
    thumbnail: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"]
    },
    original: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"]
    }
  },
  icon: {
    type: String,
    validate: [validator.isURL, "Please provide a valid url"]
  },
  id: {
    type: Number,
  },

  description: {
    type: String,
    required: true,
  },
  children: [
    {
      id: {
        type: Number,
        name: {
          type: String,
          trim: true,
          required: [true, "Please provide a category name"],
          lowercase: true,
          unique: true,
        },
        slug: {
          type: String,
          trim: true,
          required: [true, "Please provide a category slug"],
          lowercase: true,
          unique: true,
        },
      },
    }
  ]
}, {
  timestamps: true
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category;
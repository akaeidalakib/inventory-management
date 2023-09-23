const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");


const app = require("./app");

// database connection
mongoose.connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
  console.log(`Database connection is successful 🛢`.red.bold);
})
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    console.log(`Database connection is successful 🛢`.red.bold);
  } catch (error) {
    console.log(`Database connection is unsuccessful 🛢`.red.bold);
    console.log(error.message);
  }
}


// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});



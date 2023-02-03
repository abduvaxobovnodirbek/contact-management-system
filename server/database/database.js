const mongoose = require("mongoose");
const { importData } = require("../seeder");

const connectToDatabase = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected`.cyan.underline.bold);
  return importData();
};

module.exports = connectToDatabase;

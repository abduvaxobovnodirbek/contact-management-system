const fs = require("fs");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./configs/config.env" });

// Load models
const User = require("./models/User");

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/user.json`, "utf-8")
);

// Import into DB
exports.importData = async () => {
  try {
    users.map(async (user) => {
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create(user);
        console.log("Data Imported...".green.inverse);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

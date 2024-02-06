const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
      },
});

const User = mongoose.model("Logindetails", userSchema);

module.exports = User;
